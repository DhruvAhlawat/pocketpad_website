/**
 * PocketPad FAQ entries — single source for FAQ page rendering.
 * Plain `answer` is used for FAQPage JSON-LD in faq.html (keep in sync when editing).
 */
export const PocketPadFaqEntries = [
  {
    id: "phone-as-gamepad",
    question: "How can I use my phone as a gamepad or game controller?",
    answer_html:
      "Install <strong>PocketPad</strong> on your Android phone. Open a gamepad layout (Xbox-style or PlayStation-style), connect via <strong>Bluetooth HID</strong> (no app on your PC) or <strong>Wi‑Fi</strong> with PocketPad Companion on Windows, then play. Your phone sends real gamepad input — sticks, triggers, D-pad, and face buttons.",
    answer:
      "Install PocketPad on your Android phone. Open a gamepad layout, connect via Bluetooth HID (no app on your PC) or Wi-Fi with PocketPad Companion on Windows, then play.",
  },
  {
    id: "phone-keyboard-mouse",
    question: "How do I use my phone as a remote keyboard and mouse for my PC?",
    answer_html:
      "In PocketPad, select the <strong>Universal</strong> layout (touchpad + typing panel). Connect over Bluetooth HID or Wi‑Fi. You get pointer movement, scrolling, WASD clusters, full keyboard typing, and shortcuts like Ctrl+C and Alt+Tab.",
    answer:
      "Select the Universal layout in PocketPad. Connect via Bluetooth HID or Wi-Fi for touchpad, typing, WASD keys, and keyboard shortcuts.",
  },
  {
    id: "phone-tv-remote",
    question: "Can I use my phone as a TV remote control?",
    answer_html:
      "Yes. Use the <strong>Media Remote</strong> layout with volume, play/pause, skip, and D-pad keys. Pair your phone to a Smart TV, Android TV, Fire TV, or PC via Bluetooth HID and control Netflix, YouTube, Plex, VLC, Kodi, and other apps.",
    answer:
      "Yes. Use PocketPad's Media Remote layout and pair via Bluetooth HID to control volume, playback, and navigation on TVs and media apps.",
  },
  {
    id: "phone-slides",
    question: "How can I use my phone as a presentation or slide controller?",
    answer_html:
      "Open the <strong>Slide Controller</strong> layout. Swipe to advance or go back in PowerPoint, Google Slides, Keynote, or Canva. Buttons cover fullscreen, black screen, and white screen. Bluetooth HID works with no install on the presenter laptop.",
    answer:
      "Use PocketPad's Slide Controller layout: swipe to change slides and use buttons for fullscreen and black/white screen over Bluetooth HID.",
  },
  {
    id: "no-pc-install",
    question: "Does PocketPad work without installing anything on my PC?",
    answer_html:
      "Yes — <strong>Bluetooth HID</strong> mode needs zero software on the host. Pair from Windows, Mac, Linux, Android, or TV Bluetooth settings. For lowest latency and multiplayer on Windows, optionally install the free <strong>PocketPad Companion</strong> desktop app.",
    answer:
      "Yes. Bluetooth HID requires no host software. Optionally install PocketPad Companion on Windows for lower Wi-Fi latency and multiplayer.",
  },
  {
    id: "best-wireless-controller-app",
    question: "What is the best app to use my phone as a wireless game controller?",
    answer_html:
      "PocketPad is an all-in-one option: gamepad, keyboard & mouse, TV/media remote, and slide controller in one app. It supports Bluetooth HID (no server) and Wi‑Fi with Companion, custom layouts, tilt-to-steer, and multiple phones on one PC.",
    answer:
      "PocketPad combines gamepad, keyboard/mouse, TV remote, and slide control with Bluetooth HID and optional Wi-Fi Companion for low latency and multiplayer.",
  },
  {
    id: "multiplayer",
    question: "Can multiple phones connect as controllers at the same time?",
    answer_html:
      "Yes. Over <strong>Wi‑Fi</strong> with PocketPad Companion on Windows, several phones can connect to one PC. Each phone appears as a separate Xbox controller (Gamepad 1, 2, 3…) for couch co-op without buying extra physical pads.",
    answer:
      "Yes. Multiple phones connect over Wi-Fi with PocketPad Companion; each appears as a separate Xbox controller on Windows.",
  },
  {
    id: "bluetooth-vs-wifi",
    question: "Should I use Bluetooth or Wi‑Fi to connect PocketPad?",
    answer_html:
      "<strong>Bluetooth HID</strong> is fastest to set up — pair once, no PC install, works on Mac/Linux/TV. <strong>Wi‑Fi + Companion</strong> is best on Windows when you want auto-discovery, a pairing code for Universal layouts, the lowest jitter, and multiple phones at once.",
    answer:
      "Use Bluetooth for instant pairing with no host install. Use Wi-Fi with Companion on Windows for discovery, pairing codes, lowest jitter, and multiplayer.",
  },
  {
    id: "connect-bluetooth",
    question: "How do I connect PocketPad instantly via Bluetooth?",
    answer_html:
      "1) Install PocketPad on Android. 2) In the app, choose <strong>Bluetooth</strong> transport and tap <strong>Prepare for pairing</strong>. 3) On your PC/Mac/TV, open Bluetooth settings → Add device → select your phone. 4) In PocketPad, pick a layout and start controlling. See the <a href=\"./how-to.html\">How-to guide</a> for details.",
    answer:
      "In PocketPad choose Bluetooth, tap Prepare for pairing, add the phone from host Bluetooth settings, then pick a layout.",
  },
  {
    id: "connect-wifi",
    question: "How do I connect PocketPad over Wi‑Fi with Companion?",
    answer_html:
      "1) Install PocketPad Companion on Windows (installer EXE from the overview page). 2) Allow private network access in Windows Firewall. 3) Put phone and PC on the same Wi‑Fi. 4) Open Companion, then in PocketPad tap <strong>Connect</strong> and choose your PC. 5) For Universal keyboard/mouse, enter the 6-digit code from Companion Settings.",
    answer:
      "Install Companion on Windows, allow firewall, same Wi-Fi, connect from the app; enter the 6-digit code for Universal keyboard/mouse layouts.",
  },
  {
    id: "steam",
    question: "Does PocketPad work with Steam and PC games?",
    answer_html:
      "Yes. Over Bluetooth HID or Companion (virtual Xbox controller via ViGEm), games that support standard Xbox controllers should recognize PocketPad. Use a gamepad layout for controller-native games; use Universal WASD + mouse for titles that expect keyboard and mouse.",
    answer:
      "Yes. PocketPad emulates standard gamepad or keyboard/mouse input for Steam and PC games that support those devices.",
  },
  {
    id: "mac-linux",
    question: "Does PocketPad work on Mac and Linux?",
    answer_html:
      "Yes for <strong>Bluetooth HID</strong> — pair from macOS or Linux Bluetooth settings with no Companion install. The Windows Companion app is only for Wi‑Fi/virtual gamepad on Windows.",
    answer:
      "Bluetooth HID works on Mac and Linux with no extra software. PocketPad Companion is for Windows only.",
  },
  {
    id: "smart-tv",
    question: "Can I control a Smart TV or Android TV with PocketPad?",
    answer_html:
      "Yes, when the TV accepts Bluetooth HID keyboards or remotes. Use Media Remote or Universal layouts. Some TVs route Bluetooth audio oddly — disable phone media audio in Bluetooth settings if the TV mutes speakers.",
    answer:
      "Yes via Bluetooth HID with Media Remote or Universal layouts if the TV supports HID input.",
  },
  {
    id: "latency",
    question: "How low is PocketPad's latency?",
    answer_html:
      "Bluetooth HID is tuned for responsive gaming; Wi‑Fi through Companion is optimized for LAN with very low jitter. Keep devices on the same Wi‑Fi band and wake sleeping PCs — Bluetooth radios may pause until the host is active.",
    answer:
      "Bluetooth HID is responsive for gaming; Wi-Fi with Companion is optimized for low jitter on the same LAN.",
  },
  {
    id: "no-server-apps",
    question: "Can I use my phone as a gamepad without a server app on my computer?",
    answer_html:
      "Yes. PocketPad's <strong>Bluetooth HID</strong> mode registers your phone as a standard Bluetooth gamepad, keyboard, or mouse — unlike DroidJoy, Monect, or PC Remote which require a desktop server. No drivers or background apps on the host.",
    answer:
      "Yes. Bluetooth HID mode needs no server or companion on the host, unlike many Wi-Fi-only controller apps.",
  },
  {
    id: "account",
    question: "Do I need an account to use PocketPad?",
    answer_html:
      "No. PocketPad works without sign-in. Layouts and settings stay on your device. Optional anonymous analytics can be declined on first launch in regions that require consent.",
    answer:
      "No account is required. Settings and layouts are stored on your device.",
  },
  {
    id: "offline",
    question: "Does PocketPad work offline?",
    answer_html:
      "Yes. Bluetooth control and local Wi‑Fi to Companion do not require internet. Only optional analytics, ads (free tier), and Play Store purchases need connectivity.",
    answer:
      "Yes. Bluetooth and LAN Wi-Fi work without internet.",
  },
  {
    id: "free-pro",
    question: "Is PocketPad free? What is PocketPad Pro?",
    answer_html:
      "PocketPad is free to download with core controller features. <strong>PocketPad Pro</strong> (Google Play) removes ads and unlocks cosmetic skins. Purchases are handled by Google Play — PocketPad does not store payment details.",
    answer:
      "Core features are free. Pro removes ads and adds cosmetic skins via Google Play billing.",
  },
  {
    id: "vigem",
    question: "Why does Windows Companion mention ViGEmBus?",
    answer_html:
      "Windows games expect Xbox-style controllers. Companion uses the open-source <strong>ViGEm</strong> stack so your phone appears as a virtual Xbox pad. The installer adds ViGEmBus only if it is not already on your PC (e.g. from DS4Windows).",
    answer:
      "ViGEmBus lets Windows see virtual Xbox controllers. The installer adds it only when missing.",
  },
  {
    id: "firewall",
    question: "PocketPad won't connect over Wi‑Fi — firewall help?",
    answer_html:
      "Allow <strong>PocketPad Companion</strong> on <strong>private networks</strong> when Windows Firewall prompts. Phone and PC must be on the same subnet. Guest Wi‑Fi isolation blocks discovery — use the main LAN.",
    answer:
      "Allow Companion on private networks in Windows Firewall and ensure phone and PC share the same LAN (not guest-isolated Wi-Fi).",
  },
  {
    id: "bluetooth-not-found",
    question: "My PC doesn't show PocketPad in Bluetooth — what should I try?",
    answer_html:
      "In PocketPad, tap <strong>Prepare for pairing</strong> before scanning on the PC. Remove old pairings for your phone in both devices' Bluetooth lists. On Windows, use <strong>Add device</strong> → Bluetooth. Switching gamepad vs keyboard mode usually requires re-pairing.",
    answer:
      "Tap Prepare for pairing in the app, clear old pairings, and scan again from the host Bluetooth settings.",
  },
  {
    id: "game-not-recognizing",
    question: "My game doesn't recognize PocketPad as a controller",
    answer_html:
      "Confirm you are in a <strong>gamepad layout</strong> (not Universal keyboard mode). On Windows Wi‑Fi, ensure Companion is running and ViGEmBus is installed. Some games only support XInput — use Companion on Windows for virtual Xbox pads.",
    answer:
      "Use a gamepad layout; on Windows Wi-Fi ensure Companion and ViGEmBus are running. Some games only accept XInput controllers.",
  },
  {
    id: "re-pair-mode",
    question: "Why do I need to pair again after switching layouts or modes?",
    answer_html:
      "Bluetooth HID uses different device profiles for gamepad vs keyboard/mouse composite. Most operating systems require a fresh pairing when PocketPad switches HID registration. Follow <strong>Prepare for pairing</strong> each time you change transport or major layout class.",
    answer:
      "Gamepad and keyboard/mouse use different Bluetooth HID profiles; most OSes require re-pairing after switching.",
  },
  {
    id: "privacy",
    question: "Does PocketPad collect my controller inputs or layouts?",
    answer_html:
      "PocketPad does not send live controller inputs, layouts, or screen content to Datron servers. Optional anonymous Firebase Analytics and Crashlytics apply only if you opt in (or default-on outside the EU/UK/CH). See the <a href=\"./privacy.html\">Privacy Policy</a>.",
    answer:
      "Controller inputs and layouts are not sent to Datron servers. Optional anonymous analytics are described in the Privacy Policy.",
  },
  {
    id: "vs-github-pocketpad",
    question: "Is PocketPad the same as the Pocket-Pad app on GitHub?",
    answer_html:
      "No. <strong>PocketPad by Datron</strong> (<code>com.datron.pocketpad</code>) is a separate product with keyboard/mouse, TV remote, slide controller, custom layouts, Wi‑Fi Companion, and Pro on Google Play. Unrelated open-source projects may share a similar name but are not affiliated with Datron.",
    answer:
      "PocketPad by Datron is a separate full-featured app, not affiliated with similarly named GitHub projects.",
  },
  {
    id: "custom-layouts",
    question: "Can I customize button layouts and create my own presets?",
    answer_html:
      "Yes. PocketPad includes a drag-and-edit layout editor — resize and move sticks, buttons, triggers, and D-pad zones. Copy built-in presets, save profiles, and switch between them per game or task.",
    answer:
      "Yes. Use the layout editor to drag, resize controls, clone presets, and save profiles.",
  },
  {
    id: "tilt-steer",
    question: "Can I steer racing games with phone tilt?",
    answer_html:
      "Yes. PocketPad supports <strong>tilt-to-steer</strong> on gamepad layouts — map device orientation to steering input for racing titles that accept gamepad axes.",
    answer:
      "Yes. Tilt-to-steer maps phone orientation to steering on supported gamepad layouts.",
  },
];
