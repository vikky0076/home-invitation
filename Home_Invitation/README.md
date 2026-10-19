# 🪔 Sri Anandha Nilayam — Premium Cinematic Housewarming Invitation Website

A luxury, cinematic housewarming & Gruhapravesam digital invitation featuring a **realistic 3D ground-up house construction sequence (Three.js & WebGL)**, **procedural Web Audio soundscape**, **instant Tamil ⇄ English bilingual switching**, and an **elegant traditional-modern digital invitation card**.

---

## 🌟 Key Highlights & Features

### 1. 🎬 Realistic 3D Cinematic Construction Sequence (Three.js & WebGL)
- **Scene A (The Empty Plot)**: Atmospheric lighting, natural earthen soil terrain, blueprint grid overlay, and opening title *"A Dream Is Becoming a Home"*.
- **Scene B (Foundation Construction)**: Trench excavation, concrete footing plinth rising from the earth, and particle dust physics.
- **Scene C (Bricks & Pillars Assembly)**: Progressive staggered brick-by-brick wall laying with visible cement mortar joints, rising RCC columns, and door/window lintel frames.
- **Scene D (Architectural Form & Finishes)**: Terrace roof slab, modern cantilever pergola, glass railings, smooth ivory wall plastering, and landscaped front pavers with ornamental palms.
- **Scene E (Golden Hour Reveal & Entrance)**: Warm golden-hour sunset lighting, warm interior amber glow from windows, slow tracking camera approaching the teak double entrance doors, and doors swinging open into a celestial golden light burst.

### 2. 🎵 Synchronized Web Audio Cinematic Soundscape
- Microsecond synchronization without external audio file loading failures.
- Synthesized ambient outdoor breeze & wind gusts.
- Realistic soil excavation and heavy sub-earth rumbles.
- Brick placement acoustic clicks & mortar trowel scrapes.
- Heavy structural pillar impacts.
- Golden-hour reveal bass swell and celestial temple bell chime harmonics.
- Auspicious Indian celebration music (Tanpura drone + bamboo flute in Mohanam / Bhupali Raga).
- Interactive volume & mute controls with animated audio waveform equalizer bars.

### 3. 🌐 Full Instant Bilingual Support (English ⇄ தமிழ்)
- Instant toggle between **English** and **தமிழ் (Tamil)** with zero page reloads.
- Preserves accurate names, dates, muhurtham times, and auspicious mantras.
- Authentic Tamil typography powered by `Noto Sans Tamil`.

### 4. 💌 Luxury Digital Invitation Card
- Traditional ivory & champagne gold palette with sacred Toran mango leaves & marigold garlands.
- Sacred invocations: `|| Om Sri Ganeshaaya Namaha ||` / `|| ஓம் ஸ்ரீ விநாயகர் துணை ||`.
- Subha Muhurtham timings & Ritual timeline (Ganapathi Homam, Lakshmi Pooja, Gruhapravesam & Milk Boiling, Feast).
- Real-time countdown timer to the ceremony.
- One-touch interactive actions:
  - 📍 **Google Maps Navigation**: Instant route directions to the venue.
  - 📅 **Add to Google Calendar**: Direct event addition with alarms.
  - 💬 **WhatsApp RSVP**: Pre-formatted confirmation message with guest count.
  - 📞 **Direct Host Calling**.
  - 🔗 **Native Web Share / Copy Link**.
  - 🖼️ **Interactive Photo Gallery with Lightbox Viewer**.
  - 📱 **Print-Ready QR Code Canvas Generator** with one-click PNG download for printing on physical cards.

---

## 🚀 How to Run Locally

### Option 1: Direct Double-Click (Zero Setup)
Simply double-click `index.html` to open it in Google Chrome, Microsoft Edge, Safari, or Firefox on desktop or mobile.

### Option 2: Local Python Server (Recommended for Module Testing)
Open a terminal in this folder and run:
```bash
python -m http.server 8080
```
Then visit: `http://localhost:8080`

---

## ✏️ How to Update Invitation Details with Your Final Card

When you are ready to insert your final card details, open [js/invitationData.js](file:///c:/Users/MADHESH/Desktop/project/Home_Invitation/js/invitationData.js):

```javascript
// Edit dates, family names, address & venue here:
meta: {
  eventDateISO: "2026-11-24T06:00:00",
  contactPhone: "+919876543210",
  googleMapsUrl: "https://maps.google.com/?q=Your+Venue+Name",
},
en: {
  houseName: "YOUR HOUSE NAME",
  hosts: [
    { role: "Homeowner", name: "Mr. & Mrs. YOUR NAME" },
    ...
  ]
},
ta: {
  houseName: "உங்கள் இல்லத்தின் பெயர்",
  hosts: [
    { role: "இல்ல உரிமையாளர்கள்", name: "திரு & திருமதி உங்கள் பெயர்" },
    ...
  ]
}
```
*Or simply upload your card image here in the chat and I will extract and update every detail automatically!*

---

## 🌐 Free Instant Deployment for Your QR Code

To share the website with your guests and print the QR code on your physical invitation cards:

1. **Netlify (Easiest & Free)**:
   - Go to [netlify.com](https://www.netlify.com/) → Sign in.
   - Drag and drop this `Home_Invitation` folder into the Netlify dashboard.
   - Your site is live in 10 seconds with a free URL like: `https://your-house-invite.netlify.app`.
2. **GitHub Pages (Free Forever)**:
   - Push this repository to GitHub.
   - In GitHub Settings → Pages → Select branch `main` → Save.
3. **Print Your QR Code**:
   - Open your deployed URL on the website.
   - Scroll to the **"Scan & Share Invitation"** section.
   - Click **"Download Print-Ready QR Code"** to save a high-resolution 300 DPI PNG ready for printing on your physical card!
