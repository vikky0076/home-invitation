/**
 * CINEMATIC WEB AUDIO SYNTHESIS & SOUNDSCAPE ENGINE
 * 
 * Generates realistic real-time procedural sound effects and celebratory
 * Indian raga orchestration without relying on external broken audio links.
 * Provides microsecond synchronization with 3D construction events.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.volume = 0.8;
    this.isInitialized = false;

    // Master nodes
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.ambientGain = null;

    // Active nodes
    this.ambientNoiseNode = null;
    this.droneOscillators = [];
    this.isMusicPlaying = false;
    this.musicInterval = null;
  }

  // Initialize Web Audio Context on first user gesture
  init() {
    if (this.isInitialized) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();

      // Master bus
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Sub-buses
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      this.isInitialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported or blocked", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.1);
    }
    return this.isMuted;
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (!this.isMuted && this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  // Helpers to create pink/brown noise for soil, wind, mortar
  createNoiseBuffer(type = 'brown') {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (type === 'brown') {
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Gain boost
      } else if (type === 'pink') {
        data[i] = (lastOut + (0.05 * white)) / 1.05;
        lastOut = data[i];
      } else {
        data[i] = white * 0.3;
      }
    }
    return buffer;
  }

  // 1. Ambient outdoor breeze with birds / gentle atmospheric wind
  startAmbientWind() {
    if (!this.ctx || this.ambientNoiseNode) return;
    const noiseBuffer = this.createNoiseBuffer('brown');
    const source = this.ctx.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    // Subtle LFO for wind gust breathing
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(150, this.ctx.currentTime);
    lfo.connect(filter.frequency);

    source.connect(filter);
    filter.connect(this.ambientGain);

    source.start(0);
    lfo.start(0);
    this.ambientNoiseNode = { source, lfo };
  }

  stopAmbientWind() {
    if (this.ambientNoiseNode) {
      try {
        this.ambientNoiseNode.source.stop();
        this.ambientNoiseNode.lfo.stop();
      } catch (e) {}
      this.ambientNoiseNode = null;
    }
  }

  // 2. Soil excavation / digging effect (deep low-frequency soil movement & rubble crunch)
  playDiggingSound() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Heavy earth thump
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.35);

    oscGain.gain.setValueAtTime(0.5, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.36);

    // Soil rubble friction noise
    const noiseBuf = this.createNoiseBuffer('brown');
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuf;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(260, now);
    filter.Q.setValueAtTime(2, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + 0.42);
  }

  // 3. Brick tap / placement (crisp clay & acoustic click)
  playBrickPlacement(pitch = 540) {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Crisp click
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sine';
    const randomizedPitch = pitch + (Math.random() * 80 - 40);
    osc.frequency.setValueAtTime(randomizedPitch, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.08);

    oscGain.gain.setValueAtTime(0.35, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.09);

    // Mortar wet tap
    const noiseBuf = this.createNoiseBuffer('pink');
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuf;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(4, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + 0.07);
  }

  // 4. Mortar trowel scrape
  playMortarScrape() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const noiseBuf = this.createNoiseBuffer('pink');
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuf;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.frequency.linearRampToValueAtTime(1600, now + 0.22);
    filter.Q.setValueAtTime(5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + 0.23);
  }

  // 5. Heavy pillar & structural impact (low sub boom & concrete thud)
  playPillarImpact() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.exponentialRampToValueAtTime(28, now + 0.45);

    oscGain.gain.setValueAtTime(0.65, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.46);
  }

  // 6. Cinematic transition whoosh
  playWhoosh() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const noiseBuf = this.createNoiseBuffer('pink');
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuf;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(2400, now + 0.4);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.8);
    filter.Q.setValueAtTime(3, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + 0.85);
  }

  // 7. Golden hour final house reveal: deep sub impact & divine shimmer
  playGrandReveal() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Sub-bass impact
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(80, now);
    subOsc.frequency.exponentialRampToValueAtTime(25, now + 1.2);

    subGain.gain.setValueAtTime(0.8, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);
    subOsc.start(now);
    subOsc.stop(now + 1.25);

    // Warm temple brass bell chord
    const chordFrequencies = [523.25, 659.25, 783.99, 1046.50]; // C Major celestial
    chordFrequencies.forEach((freq, idx) => {
      this.playHarmonicChime(freq, 2.5, idx * 0.08);
    });
  }

  // 8. Resonant harmonic chimes (temple bell / celebration bells)
  playHarmonicChime(freq = 880, duration = 2.0, delay = 0) {
    if (!this.ctx || this.isMuted) return;
    const startTime = this.ctx.currentTime + delay;

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Subtle pitch vibration
    const overtone = this.ctx.createOscillator();
    const overtoneGain = this.ctx.createGain();
    overtone.frequency.setValueAtTime(freq * 2.76, startTime);
    overtoneGain.gain.setValueAtTime(0.12, startTime);
    overtoneGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.4);

    oscGain.gain.setValueAtTime(0.28, startTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(oscGain);
    overtone.connect(overtoneGain);
    overtoneGain.connect(oscGain);
    oscGain.connect(this.sfxGain);

    osc.start(startTime);
    overtone.start(startTime);
    osc.stop(startTime + duration + 0.05);
    overtone.stop(startTime + duration + 0.05);
  }

  // 9. Teak door opening creak & glide
  playDoorOpen() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(180, now + 0.4);
    osc.frequency.linearRampToValueAtTime(130, now + 0.8);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, now);

    oscGain.gain.setValueAtTime(0.01, now);
    oscGain.gain.linearRampToValueAtTime(0.12, now + 0.3);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    osc.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.9);
  }

  // 10. Background Celebratory Indian Instrumental Music
  // Plays a rich Tanpura drone (Sa-Pa-Sa) combined with an uplifting Mohanam Raga progression
  startCelebrationMusic(mode = 'build') {
    if (!this.ctx || this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    // Start Indian Tanpura Drone (Sa, Pa, Sa octaves: C3, G3, C4)
    this.startTanpuraDrone();

    // Mohanam Raga scale frequencies (C, D, E, G, A) - Auspicious, Uplifting, Celebratory
    const scale = [
      261.63, // C4 (Sa)
      293.66, // D4 (Ri)
      329.63, // E4 (Ga)
      392.00, // G4 (Pa)
      440.00, // A4 (Dha)
      523.25, // C5 (Sa')
      587.33, // D5 (Ri')
      659.25  // E5 (Ga')
    ];

    // Melodic sequence for housewarming
    const melody = [
      0, 1, 2, 4, 3, 2, 1, 0,
      2, 3, 4, 5, 4, 3, 2, 0,
      4, 5, 6, 7, 6, 5, 4, 3,
      5, 4, 3, 2, 1, 2, 0, 0
    ];

    let noteIdx = 0;
    const noteSpeed = mode === 'soft' ? 1200 : 700;

    this.musicInterval = setInterval(() => {
      if (!this.isMusicPlaying || this.isMuted || !this.ctx) return;
      const note = scale[melody[noteIdx % melody.length]];
      this.playFluteNote(note, (noteSpeed / 1000) * 1.3);
      noteIdx++;
    }, noteSpeed);
  }

  startTanpuraDrone() {
    if (!this.ctx) return;
    const droneFreqs = [130.81, 196.00, 261.63]; // C3, G3, C4
    this.droneOscillators = droneFreqs.map((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Gentle tremolo
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.4 + (i * 0.15), this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      lfo.connect(gain.gain);

      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.start();
      lfo.start();
      return { osc, lfo, gain };
    });
  }

  playFluteNote(freq, duration = 1.0) {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle natural vibrato
    const vibrato = this.ctx.createOscillator();
    vibrato.frequency.setValueAtTime(5.2, now);
    const vibGain = this.ctx.createGain();
    vibGain.gain.setValueAtTime(2.5, now);
    vibrato.connect(osc.frequency);

    // Warm envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Lowpass filter for warm bamboo flute timbre
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(now);
    vibrato.start(now);
    osc.stop(now + duration + 0.05);
    vibrato.stop(now + duration + 0.05);
  }

  // Soften music volume when transitioning to invitation card
  softenMusicForInvitation() {
    if (!this.musicGain || !this.ctx) return;
    this.musicGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.musicGain.gain.linearRampToValueAtTime(0.28, this.ctx.currentTime + 1.5);
  }

  stopAllMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.droneOscillators.forEach(({ osc, lfo }) => {
      try {
        osc.stop();
        lfo.stop();
      } catch (e) {}
    });
    this.droneOscillators = [];
  }
}

export const soundEngine = new SoundEngine();
