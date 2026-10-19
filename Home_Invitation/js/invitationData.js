/**
 * CENTRALIZED INVITATION DATA & BILINGUAL TRANSLATION DICTIONARY
 * 
 * Edit this file to update the invitation details when your final card image is provided.
 * All texts automatically update across the entire website in both English and தமிழ்!
 */

export const INVITATION_DATA = {
  // Event Meta Configuration
  meta: {
    eventDateISO: "2026-11-24T06:00:00",
    calendarStart: "20261124T060000",
    calendarEnd: "20261124T140000",
    contactPhone: "+919876543210",
    contactPhoneDisplay: "+91 98765 43210",
    whatsappMessage: "Vanakkam! We are happy to confirm our presence for the Gruhapravesam celebration.",
    googleMapsUrl: "https://maps.google.com/?q=Sri+Anandha+Nilayam,+Madurai",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.9897!2d78.1198!3d9.9252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTUnMzAuNyJOIDc4wrAwNycxMS4zIkU!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin",
    shareTitle: "Housewarming Invitation - Sri Anandha Nilayam",
    shareText: "Join us in celebrating our new home! Click to watch the cinematic story & find event details:"
  },

  // English Content
  en: {
    langLabel: "English",
    traditionalInvocation: "|| Om Sri Ganeshaaya Namaha ||",
    divineBlessing: "With the divine blessings of Almighty & our beloved ancestors",
    houseName: "SRI ANANDHA NILAYAM",
    ceremonyTitle: "Housewarming & Gruhapravesam Ceremony",
    familyHeadline: "Cordially invites you and your family to celebrate our new beginning",
    
    hosts: [
      { role: "Homeowner", name: "Mr. S. Madhesh & Mrs. M. Kavitha" },
      { role: "With Joyful Hearts", name: "Master M. Sanjay & Baby M. Harini" }
    ],

    welcomeNarrative: "A dream nurtured with love, devotion, and countless aspirations has taken the shape of our new home. We take immense pleasure in inviting you to shower your gracious blessings and grace the auspicious occasion of our Gruhapravesam.",

    eventDateDay: "Sunday, 24th November 2026",
    tamilCalendarNote: "Karthigai 9 • Subha Muhurtham Day",
    muhurthamTime: "6:00 AM – 7:30 AM (Vrichika Lagnam)",
    
    timeline: [
      { time: "04:30 AM", title: "Maha Ganapathi Homam", desc: "Auspicious invocation for prosperity and obstacle removal" },
      { time: "05:15 AM", title: "Lakshmi & Navagraha Pooja", desc: "Invoking divine blessings of wealth and peace" },
      { time: "06:00 AM", title: "Gruhapravesam & Milk Boiling", desc: "Subha Muhurtham entry into our new home" },
      { time: "07:30 AM", title: "Kuthuvilakku Pooja & Deeparadhana", desc: "Lighting of sacred brass lamps by auspicious hands" },
      { time: "11:30 AM Onwards", title: "Traditional Festive Feast", desc: "Join us for a sumptuous vegetarian banquet" }
    ],

    venueHeading: "Ceremony Venue",
    venueName: "Sri Anandha Nilayam",
    venueAddress: "Plot No. 27, Sri Sai Garden, 2nd Main Road, Near Annai Temple, Madurai – 625020, Tamil Nadu.",
    
    // Interactive actions
    actions: {
      mapBtn: "Open Google Maps",
      calendarBtn: "Add to Calendar",
      whatsappBtn: "WhatsApp RSVP",
      callBtn: "Call Host",
      shareBtn: "Share Invitation",
      qrTitle: "Scan & Share Invitation",
      qrDesc: "Share this link with family and friends"
    },

    // Gallery section
    gallery: {
      heading: "Our Journey to Home",
      subheading: "A glimpse of the spaces where cherished memories will blossom",
      items: [
        { title: "Grand Entrance", desc: "Traditional carved teak doorway adorned with divine toran" },
        { title: "The Courtyard & Hall", desc: "Filled with natural sunlight, ventilation, and warmth" },
        { title: "Sacred Pooja Mandir", desc: "A serene haven consecrated for eternal peace and prayer" },
        { title: "Terrace Garden & Balcony", desc: "Serene view overlooking lush green surroundings" }
      ]
    },

    // RSVP Section
    rsvp: {
      title: "Confirm Your Gracious Presence",
      subtitle: "Your blessings mean the world to us. Kindly let us know if you can join us.",
      nameLabel: "Your Name",
      countLabel: "Number of Guests Attending",
      messageLabel: "Blessings & Wishes for the Family",
      submitBtn: "Send Confirmation via WhatsApp",
      sentAlert: "Thank you! Redirecting to WhatsApp to send your confirmation..."
    },

    closingGratitude: "Your gracious presence and heartfelt blessings will make this day truly complete and unforgettable for our entire family.",
    signature: "Warm regards,\nMadhesh & Family",

    // Cinematic Intro Labels
    intro: {
      badge: "CINEMATIC INVITATION",
      title: "A Dream Is Becoming a Home",
      subtitle: "Tap below to begin our journey",
      startBtn: "Enter Our New Home",
      skipBtn: "Skip to Invitation ⏭",
      soundHint: "Turn sound ON for the full cinematic experience 🔊",
      soundOn: "Sound: ON",
      soundOff: "Sound: OFF",
      scenes: [
        { label: "Scene A: The Vision", caption: "Empty plot of land & architectural blueprint" },
        { label: "Scene B: Foundation", caption: "Deep excavation, soil physics & concrete footings" },
        { label: "Scene C: Structure", caption: "Laying bricks with mortar & rising reinforced pillars" },
        { label: "Scene D: Architectural Form", caption: "Roof slab, teak doorframes & glass window lintels" },
        { label: "Scene E: The Grand Reveal", caption: "Golden hour glow, lighting up & the doors swing open" }
      ]
    }
  },

  // Tamil Content (தமிழ்)
  ta: {
    langLabel: "தமிழ்",
    traditionalInvocation: "|| ஓம் ஸ்ரீ விநாயகர் துணை ||",
    divineBlessing: "எல்லாம் வல்ல இறைவனருளாலும், முன்னோர்களின் ஆசியுடனும்",
    houseName: "ஸ்ரீ ஆனந்தா நிலையம்",
    ceremonyTitle: "புதுமனை புகுவிழா & குத்துவிளக்கு பூஜை அழைப்பிதழ்",
    familyHeadline: "எங்கள் புது இல்லத்தின் நன்னாளில் தங்களை குடும்ப சமேதராக அன்புடன் அழைக்கின்றோம்",

    hosts: [
      { role: "இல்ல உரிமையாளர்கள்", name: "திரு. S. மாதேஷ் & திருமதி. M. கவிதா" },
      { role: "அன்புடன் அழைக்கும் குழந்தைகள்", name: "செல்வன் M. சஞ்சய் & செல்வி M. ஹரிணி" }
    ],

    welcomeNarrative: "அன்பாலும் அர்ப்பணிப்பாலும் நனவான எங்கள் கனவு இல்லமான 'ஸ்ரீ ஆனந்தா நிலையம்' புதுமனை புகுவிழா நன்னாளன்று, தாங்கள் தங்கள் குடும்பத்தினருடன் வருகை தந்து, எங்களை வாழ்த்தி அருளுமாறு பணிவன்புடன் வேண்டுகிறோம்.",

    eventDateDay: "2026 நவம்பர் 24, ஞாயிற்றுக்கிழமை",
    tamilCalendarNote: "கார்த்திகை 9 • சுபமுகூர்த்த நன்னாள்",
    muhurthamTime: "காலை 6:00 மணி முதல் 7:30 மணிக்குள் (விருச்சிக லக்னம்)",

    timeline: [
      { time: "அதிகாலை 04:30", title: "மகா கணபதி ஹோமம்", desc: "விக்னங்கள் நீங்கி நலம் பெருக இறையருள் வேண்டுதல்" },
      { time: "காலை 05:15", title: "லட்சுமி & நவக்கிரக பூஜை", desc: "சர்வ மங்களமும் செல்வமும் இல்லத்தில் நிலவ பூஜை" },
      { time: "காலை 06:00", title: "புதுமனை புகுவிழா & பால் காய்ச்சுதல்", desc: "சுபமுகூர்த்த வேளையில் புதிய இல்லத்தில் மங்களப் பிரவேசம்" },
      { time: "காலை 07:30", title: "குத்துவிளக்கு பூஜை & மகா தீபாராதனை", desc: "மங்கள விளக்கேற்றி இல்லத்தை ஜோதிமயமாக்குதல்" },
      { time: "காலை 11:30 முதல்", title: "அறுசுவை மதிய விருந்து", desc: "அனைவரும் குடும்பத்துடன் வருகை தந்து மதிய விருந்துண்ண வேண்டுகிறோம்" }
    ],

    venueHeading: "நிகழ்ச்சி நடைபெறும் இடம்",
    venueName: "ஸ்ரீ ஆனந்தா நிலையம்",
    venueAddress: "மனை எண். 27, ஸ்ரீ சாய் கார்டன், 2-வது பிரதான சாலை, அன்னை கோவில் அருகில், மதுரை – 625020, தமிழ்நாடு.",

    actions: {
      mapBtn: "கூகுள் மேப் வழிகாட்டி",
      calendarBtn: "நாட்காட்டியில் சேர்க்க",
      whatsappBtn: "வாட்ஸ்அப் வாழ்த்து",
      callBtn: "தொடர்பு கொள்ள",
      shareBtn: "அழைப்பிதழைப் பகிர்க",
      qrTitle: "அழைப்பிதழ் QR குறியீடு",
      qrDesc: "இணைப்பை குடும்பத்தினர் & நண்பர்களுக்கு பகிரவும்"
    },

    gallery: {
      heading: "எங்கள் இல்லக் காட்சிகள்",
      subheading: "மகிழ்ச்சியும் பாசமும் மலரும் புதிய இல்லத்தின் அழகிய தருணங்கள்",
      items: [
        { title: "மங்களகரமான தலைவாசல்", desc: "மர வேலைப்பாடுகள் நிறைந்த தெய்வீகத் தோரண தலைவாசல்" },
        { title: "விசாலமான நடுநிலைக் கூடம்", desc: "இயற்கை வெளிச்சமும் காற்றோட்டமும் நிறைந்த முகப்பு அரங்கம்" },
        { title: "தெய்வீக பூஜை அறை", desc: "அமைதியும் பக்தியும் தவழும் புனிதமான பூஜை மாடம்" },
        { title: "மாடி தோட்டம் & பால்கனி", desc: "பசுமையான தென்றல் தவழும் இயற்கை அழகு உலாவிடம்" }
      ]
    },

    rsvp: {
      title: "தங்கள் வருகையை உறுதி செய்க",
      subtitle: "தங்களின் வருகையும் ஆசியும் எங்களின் இந்த நன்னாளை மேலும் சிறப்பாக்கும்.",
      nameLabel: "தங்கள் பெயர்",
      countLabel: "வருகை தரும் விருந்தினர்கள் எண்ணிக்கை",
      messageLabel: "குடும்பத்தினருக்கு தங்களின் ஆசிகளும் வாழ்த்துகளும்",
      submitBtn: "வாட்ஸ்அப் மூலம் உறுதி செய்க",
      sentAlert: "நன்றி! தங்களின் வருகை விவரங்களை அனுப்ப வாட்ஸ்அப் திறக்கப்படுகிறது..."
    },

    closingGratitude: "தங்களின் வருகையே எங்கள் இல்லத்திற்கு ஒளி சேர்க்கும். தாங்கள் குடும்ப சமேதராக வருகை தந்து சிறப்பிக்குமாறு அன்போடு வேண்டுகிறோம்.",
    signature: "அன்புடன்,\nமாதேஷ் & குடும்பத்தினர்",

    intro: {
      badge: "திரைப்பட அனுபவம்",
      title: "ஒரு கனவு இன்று இல்லமாகிறது",
      subtitle: "எங்கள் பயணத்தைக் காண கீழே அழுத்தவும்",
      startBtn: "எங்கள் இல்லத்திற்குள் நுழைக",
      skipBtn: "நேரடி அழைப்பிதழ் ⏭",
      soundHint: "சிறந்த அனுபவத்திற்கு ஒலியை இயக்கவும் 🔊",
      soundOn: "ஒலி: ஆன்",
      soundOff: "ஒலி: ஆஃப்",
      scenes: [
        { label: "காட்சி 1: கனவு நிலம்", caption: "வெற்று நிலத்தில் உருவாகும் கட்டட வரைபடம்" },
        { label: "காட்சி 2: அஸ்திவாரம்", caption: "மண் அகழ்தல் மற்றும் பலமான கான்கிரீட் அஸ்திவாரம்" },
        { label: "காட்சி 3: தூண்களும் செங்கற்களும்", caption: "ஒவ்வொரு செங்கல்லாக உயரும் சுவர்கள் மற்றும் தாங்கு தூண்கள்" },
        { label: "காட்சி 4: கட்டட முழுமை", caption: "மேற்கூரை, தேக்கு மர கதவுகள் மற்றும் கண்ணாடிகள்" },
        { label: "காட்சி 5: இல்லப் பிரவேசம்", caption: "மாலை பொன்னிற ஒளியில் விளக்கேற்றி கதவுகள் திறக்கும் தருணம்" }
      ]
    }
  }
};
