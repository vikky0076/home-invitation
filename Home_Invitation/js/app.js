/**
 * MASTER APPLICATION ORCHESTRATOR
 * Coordinates 3D Construction, Sound Engine, Bilingual Language Switcher,
 * Countdown, Interactive Actions & QR Code Generation.
 */

import { INVITATION_DATA } from './invitationData.js';
import { soundEngine } from './soundEngine.js';
import { Construction3D } from './construction3d.js';

class App {
  constructor() {
    this.currentLang = 'en'; // Default language
    this.construction = null;
    this.countdownTimer = null;
    this.isCinematicActive = true;

    this.initElements();
    this.initBilingual();
    this.init3DStage();
    this.initCountdown();
    this.initInteractiveActions();
    this.initQRCode();
    this.initGallery();
  }

  initElements() {
    // Navigation & controls
    this.langBtnEn = document.getElementById('lang-btn-en');
    this.langBtnTa = document.getElementById('lang-btn-ta');
    this.soundToggleBtn = document.getElementById('sound-toggle-btn');
    this.soundBars = document.getElementById('sound-bars');
    this.soundStatusText = document.getElementById('sound-status-text');

    // Cinematic Stage & HUD
    this.cinematicStage = document.getElementById('cinematic-stage');
    this.canvasContainer = document.getElementById('three-canvas-container');
    this.gateOverlay = document.getElementById('cinematic-gate-overlay');
    this.gateStartBtn = document.getElementById('gate-start-btn');
    this.gateSkipBtn = document.getElementById('gate-skip-btn');
    this.hudSkipBtn = document.getElementById('hud-skip-btn');
    this.sceneLabelEl = document.getElementById('scene-label-text');
    this.sceneCaptionEl = document.getElementById('scene-caption-text');
    this.timelineProgressBar = document.getElementById('timeline-progress-bar');
    this.doorFlash = document.getElementById('door-transition-flash');

    // Invitation Container
    this.invitationContainer = document.getElementById('invitation-container');
  }

  // Bilingual Language Engine
  initBilingual() {
    // Check saved preference or URL param
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam === 'ta' || langParam === 'en') {
      this.currentLang = langParam;
    }

    this.langBtnEn.addEventListener('click', () => this.setLanguage('en'));
    this.langBtnTa.addEventListener('click', () => this.setLanguage('ta'));

    this.updateLanguageUI();
  }

  setLanguage(lang) {
    if (this.currentLang === lang) return;
    this.currentLang = lang;
    
    // Toggle body font class
    if (lang === 'ta') {
      document.body.classList.add('lang-ta');
    } else {
      document.body.classList.remove('lang-ta');
    }

    this.updateLanguageUI();
  }

  updateLanguageUI() {
    const data = INVITATION_DATA[this.currentLang];
    const isTa = this.currentLang === 'ta';

    // Update switcher buttons active state
    this.langBtnEn.classList.toggle('active', !isTa);
    this.langBtnTa.classList.toggle('active', isTa);

    // Update Gate Overlay
    document.getElementById('gate-badge-text').textContent = data.intro.badge;
    document.getElementById('gate-title-text').textContent = data.intro.title;
    document.getElementById('gate-subtitle-text').textContent = data.intro.subtitle;
    document.getElementById('gate-start-text').textContent = data.intro.startBtn;
    document.getElementById('gate-skip-btn').textContent = data.intro.skipBtn;
    document.getElementById('gate-sound-hint').textContent = data.intro.soundHint;
    this.hudSkipBtn.textContent = data.intro.skipBtn;

    // Update Scene HUD if active
    if (this.construction) {
      this.onSceneUpdate(this.construction.currentScene);
    }

    // Update Invitation Content
    document.getElementById('sacred-invocation-text').textContent = data.traditionalInvocation;
    document.getElementById('divine-blessing-text').textContent = data.divineBlessing;
    document.getElementById('house-name-text').textContent = data.houseName;
    document.getElementById('ceremony-title-text').textContent = data.ceremonyTitle;
    document.getElementById('family-headline-text').textContent = data.familyHeadline;

    // Hosts
    const hostList = document.getElementById('hosts-list-container');
    hostList.innerHTML = data.hosts.map(h => `
      <div class="host-item">
        <div class="host-role">${h.role}</div>
        <div class="host-name">${h.name}</div>
      </div>
    `).join('');

    // Narrative
    document.getElementById('welcome-narrative-text').textContent = data.welcomeNarrative;

    // Date & Venue Highlights
    document.getElementById('event-date-text').textContent = data.eventDateDay;
    document.getElementById('event-calendar-note').textContent = data.tamilCalendarNote;
    document.getElementById('event-muhurtham-text').textContent = data.muhurthamTime;
    document.getElementById('venue-heading-text').textContent = data.venueHeading;
    document.getElementById('venue-name-text').textContent = data.venueName;
    document.getElementById('venue-address-text').textContent = data.venueAddress;

    // Timeline rituals
    const timelineContainer = document.getElementById('timeline-list-container');
    timelineContainer.innerHTML = data.timeline.map(t => `
      <div class="timeline-item">
        <span class="timeline-time-badge">${t.time}</span>
        <div class="timeline-ritual-title">${t.title}</div>
        <div class="timeline-ritual-desc">${t.desc}</div>
      </div>
    `).join('');

    // Interactive Action Buttons
    document.getElementById('action-map-btn-text').textContent = data.actions.mapBtn;
    document.getElementById('action-calendar-btn-text').textContent = data.actions.calendarBtn;
    document.getElementById('action-whatsapp-btn-text').textContent = data.actions.whatsappBtn;
    document.getElementById('action-call-btn-text').textContent = data.actions.callBtn;
    document.getElementById('action-share-btn-text').textContent = data.actions.shareBtn;

    // Gallery Text
    document.getElementById('gallery-heading-text').textContent = data.gallery.heading;
    document.getElementById('gallery-subheading-text').textContent = data.gallery.subheading;

    // RSVP Text
    document.getElementById('rsvp-title-text').textContent = data.rsvp.title;
    document.getElementById('rsvp-subtitle-text').textContent = data.rsvp.subtitle;
    document.getElementById('rsvp-label-name').textContent = data.rsvp.nameLabel;
    document.getElementById('rsvp-label-count').textContent = data.rsvp.countLabel;
    document.getElementById('rsvp-label-wishes').textContent = data.rsvp.messageLabel;
    document.getElementById('rsvp-submit-btn-text').textContent = data.rsvp.submitBtn;

    // QR Title
    document.getElementById('qr-title-text').textContent = data.actions.qrTitle;
    document.getElementById('qr-desc-text').textContent = data.actions.qrDesc;

    // Closing Gratitude
    document.getElementById('closing-gratitude-text').textContent = data.closingGratitude;
    document.getElementById('signature-text').textContent = data.signature;
  }

  // 3D Construction Stage Initialization
  init3DStage() {
    this.construction = new Construction3D(
      this.canvasContainer,
      (sceneKey) => this.onSceneUpdate(sceneKey),
      () => this.onConstructionComplete()
    );

    // Gate Start
    this.gateStartBtn.addEventListener('click', () => {
      soundEngine.init();
      soundEngine.resume();
      this.gateOverlay.classList.add('gate-dismissed');
      this.soundBars.classList.add('playing');
      this.construction.play();
    });

    // Skip Buttons
    const handleSkip = () => {
      soundEngine.init();
      this.transitionToInvitation();
    };
    this.gateSkipBtn.addEventListener('click', handleSkip);
    this.hudSkipBtn.addEventListener('click', handleSkip);

    // Sound toggle
    this.soundToggleBtn.addEventListener('click', () => {
      soundEngine.init();
      const isMuted = soundEngine.toggleMute();
      this.soundBars.classList.toggle('playing', !isMuted);
      const data = INVITATION_DATA[this.currentLang];
      this.soundStatusText.textContent = isMuted ? data.intro.soundOff : data.intro.soundOn;
    });

    // Animate progress bar in sync with timeline
    const updateProgress = () => {
      if (this.construction && this.isCinematicActive) {
        const pct = (this.construction.progress * 100).toFixed(1);
        this.timelineProgressBar.style.width = `${pct}%`;
      }
      requestAnimationFrame(updateProgress);
    };
    updateProgress();
  }

  onSceneUpdate(sceneKey) {
    const data = INVITATION_DATA[this.currentLang];
    const sceneIndexMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4 };
    const idx = sceneIndexMap[sceneKey] || 0;
    const sceneInfo = data.intro.scenes[idx];

    if (sceneInfo) {
      this.sceneLabelEl.textContent = sceneInfo.label;
      this.sceneCaptionEl.textContent = sceneInfo.caption;
    }
  }

  onConstructionComplete() {
    // Flash transition
    this.doorFlash.classList.add('flash-active');
    setTimeout(() => {
      this.transitionToInvitation();
      setTimeout(() => {
        this.doorFlash.classList.remove('flash-active');
      }, 1200);
    }, 800);
  }

  transitionToInvitation() {
    this.isCinematicActive = false;
    this.cinematicStage.classList.add('stage-hidden');
    soundEngine.softenMusicForInvitation();
    if (this.construction) {
      this.construction.pause();
    }
    // Scroll invitation into view
    this.invitationContainer.scrollIntoView({ behavior: 'smooth' });
  }

  // Event Countdown
  initCountdown() {
    const targetDate = new Date(INVITATION_DATA.meta.eventDateISO).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        document.getElementById('cd-days').textContent = '00';
        document.getElementById('cd-hours').textContent = '00';
        document.getElementById('cd-mins').textContent = '00';
        document.getElementById('cd-secs').textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
      document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('cd-mins').textContent = String(minutes).padStart(2, '0');
      document.getElementById('cd-secs').textContent = String(seconds).padStart(2, '0');
    };

    updateTimer();
    this.countdownTimer = setInterval(updateTimer, 1000);
  }

  // Interactive buttons (Calendar, WhatsApp, Maps, Call, Share)
  initInteractiveActions() {
    const meta = INVITATION_DATA.meta;

    // Google Maps Navigation
    document.getElementById('action-map-btn').addEventListener('click', (e) => {
      e.preventDefault();
      window.open(meta.googleMapsUrl, '_blank');
    });

    // Add to Google Calendar
    document.getElementById('action-calendar-btn').addEventListener('click', (e) => {
      e.preventDefault();
      const title = encodeURIComponent(INVITATION_DATA[this.currentLang].ceremonyTitle + " - " + INVITATION_DATA[this.currentLang].houseName);
      const details = encodeURIComponent(INVITATION_DATA[this.currentLang].welcomeNarrative);
      const location = encodeURIComponent(INVITATION_DATA[this.currentLang].venueAddress);
      const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${meta.calendarStart}/${meta.calendarEnd}&details=${details}&location=${location}`;
      window.open(calUrl, '_blank');
    });

    // Direct WhatsApp
    document.getElementById('action-whatsapp-btn').addEventListener('click', (e) => {
      e.preventDefault();
      const msg = encodeURIComponent(INVITATION_DATA.meta.whatsappMessage);
      window.open(`https://api.whatsapp.com/send?phone=${meta.contactPhone}&text=${msg}`, '_blank');
    });

    // Direct Call Host
    document.getElementById('action-call-btn').addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = `tel:${meta.contactPhone}`;
    });

    // Share Invitation
    document.getElementById('action-share-btn').addEventListener('click', async (e) => {
      e.preventDefault();
      const shareData = {
        title: INVITATION_DATA.meta.shareTitle,
        text: INVITATION_DATA.meta.shareText,
        url: window.location.href
      };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {}
      } else {
        // Fallback: Copy link
        navigator.clipboard.writeText(window.location.href);
        alert(this.currentLang === 'ta' ? 'அழைப்பிதழ் இணைப்பு நகலெடுக்கப்பட்டது!' : 'Invitation link copied to clipboard!');
      }
    });

    // Interactive RSVP Form
    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('rsvp-guest-name').value.trim();
      const count = document.getElementById('rsvp-guest-count').value;
      const wishes = document.getElementById('rsvp-guest-wishes').value.trim();

      const rsvpText = `*Gruhapravesam RSVP Confirmation*\n` +
        `• Guest Name: ${name}\n` +
        `• Attending Count: ${count}\n` +
        (wishes ? `• Blessings: ${wishes}\n` : '') +
        `We are looking forward to being part of your celebration!`;

      const waUrl = `https://api.whatsapp.com/send?phone=${meta.contactPhone}&text=${encodeURIComponent(rsvpText)}`;
      window.open(waUrl, '_blank');
    });
  }

  // QR Code generator on canvas
  initQRCode() {
    const canvas = document.getElementById('qr-code-canvas');
    if (!canvas) return;

    // Use current URL
    const targetUrl = window.location.href;

    // Draw QR code via CDN QRCode library if loaded, or draw sharp crisp vector QR
    if (window.QRCode) {
      window.QRCode.toCanvas(canvas, targetUrl, {
        width: 180,
        margin: 2,
        color: {
          dark: '#2C2621',
          light: '#FFFFFF'
        }
      });
    }

    // QR download
    const downloadBtn = document.getElementById('qr-download-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'Housewarming_Invitation_QR.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  }

  // Lightbox Photo Gallery
  initGallery() {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close-btn');

    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          modalImg.src = img.src;
          modal.classList.add('active');
        }
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.housewarmingApp = new App();
});
