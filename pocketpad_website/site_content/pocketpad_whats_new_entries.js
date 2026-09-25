/**
 * PocketPad Companion (Windows) release notes — single source for `whats-new.html`
 * (rendered by pocketpad_whats_new_site.js and baked into static HTML by
 * tools/generate_guide_html.mjs).
 *
 * To add a release: put a new object at the TOP of the array, then run
 *   node pocketpad_website/tools/generate_guide_html.mjs
 * When an `upcoming: true` release ships, set `upcoming: false` and fill in `date`.
 *
 * Fields:
 *   version  "2.4.0"
 *   date     "YYYY-MM-DD" release date ("" while upcoming)
 *   upcoming true → shows a "Coming soon" badge instead of a date
 *   summary  optional one-line plain-text headline
 *   new / improved / fixed  arrays of plain-text bullets (end-user language)
 */
export const PocketPadWhatsNewEntries = [
  {
    version: "2.4.0",
    date: "",
    upcoming: true,
    summary: "Bigger game nights and far more reliable connections.",
    new: [
      "Connect up to 16 phones or controllers at once (up from 4). Games that use the older Xbox controller system only see the first 4, but most modern games and Steam can see them all.",
    ],
    improved: [
      "Companion starts listening for phones as soon as you open it — no need to press Start.",
      "Clearer warnings when the ViGEmBus controller driver is missing or another app is already using the port phones use to find your PC.",
      "Shows this PC’s IP address on the dashboard, so you can connect manually if your phone can’t find the PC automatically.",
      "PCs with several network adapters (for example Wi‑Fi plus Ethernet or a VPN) no longer show up twice in the phone’s list.",
      "More reliable connecting on busy Wi‑Fi: messages that get lost along the way are sent again automatically.",
      "Phones that reconnect keep their Gamepad number, so player 2 stays player 2.",
    ],
    fixed: [
      "Two or more phones on the same hotspot or sharing one network address could end up sharing a single controller, or fail to connect. Each phone now always gets its own controller.",
      "After a brief Wi‑Fi drop, a phone could still look “connected” while its buttons did nothing. It now recovers on its own (older versions of the phone app show “connection lost” instead, so you can simply reconnect).",
      "Changing or regenerating the pairing code no longer disconnects phones using gamepad layouts — only keyboard & mouse phones need the new code.",
    ],
  },
  {
    version: "2.3.1",
    date: "2026-09-15",
    summary: "Multiplayer fixes for several phones at once.",
    new: [],
    improved: [
      "Each phone’s controller appears in Windows as soon as the phone connects, before you press the first button.",
      "The Gamepad 1, 2, 3… list on the dashboard stays in a fixed order instead of jumping around whenever someone presses a button.",
    ],
    fixed: [
      "With several phones connected, controllers could get mixed up. Each phone now reliably drives its own separate controller.",
      "If one phone’s controller runs into a problem, only that phone is affected — everyone else keeps playing.",
    ],
  },
  {
    version: "2.3.0",
    date: "2026-09-13",
    summary: "Updated for PocketPad 5.1 for Android.",
    new: [],
    improved: ["Ready for the PocketPad 5.1 phone app, with general stability updates."],
    fixed: [],
  },
  {
    version: "2.2.1",
    date: "2026-09-13",
    summary: "Middle-click and better compatibility.",
    new: ["Middle mouse button support for keyboard & mouse (Universal) layouts."],
    improved: ["Companion now tells the phone app which version it is running."],
    fixed: ["Works correctly with the older PocketPad 5.0.0 and 5.0.1 phone apps."],
  },
  {
    version: "2.2.0",
    date: "2026-09-03",
    summary: "Smoother tilt-to-steer.",
    new: [],
    improved: [
      "Letting go of gas or brake takes effect immediately, so racing controls feel more responsive.",
    ],
    fixed: [
      "Held buttons and steering no longer flicker while using tilt-to-steer.",
      "The stick preview on the dashboard now re-centres straight away when you let go.",
    ],
  },
  {
    version: "2.1.3",
    date: "2026-09-02",
    new: ["The dashboard now shows which version of Companion you have installed."],
    improved: [],
    fixed: [],
  },
  {
    version: "2.1.2",
    date: "2026-08-02",
    new: [],
    improved: ["Behind-the-scenes updates to prepare for showing the Companion version in the app."],
    fixed: [],
  },
  {
    version: "2.1.1",
    date: "2026-07-31",
    new: [],
    improved: ["Updated components for better stability and compatibility."],
    fixed: [],
  },
  {
    version: "2.1.0",
    date: "2026-07-26",
    summary: "Tilt-to-steer over Wi‑Fi.",
    new: ["Tilt-to-steer now works over Wi‑Fi with Companion — steer racing games by tilting your phone."],
    improved: [
      "Lower, steadier input delay on Wi‑Fi, even when your phone is sending lots of input quickly.",
      "The dashboard stays responsive while phones are sending a lot of input.",
    ],
    fixed: [
      "Held buttons and sticks no longer briefly let go because of tiny touch glitches on the phone.",
      "Inputs are no longer dropped right after a phone reconnects.",
    ],
  },
  {
    version: "2.0.0",
    date: "2026-07-13",
    new: [],
    improved: ["New version line to match the refreshed PocketPad phone app."],
    fixed: [],
  },
  {
    version: "1.2.0",
    date: "2026-07-12",
    summary: "Optional pairing code.",
    new: [
      "Choose whether keyboard & mouse (Universal) layouts need a pairing code. Turn it off on a trusted home network so any of your phones can connect without one. Your choice is remembered.",
    ],
    improved: ["Clearer on-screen help explaining when a pairing code is needed — gamepad layouts never need one."],
    fixed: [],
  },
];

/** Section order + headings used by both the live page and the static HTML. */
export const PocketPadWhatsNewGroups = [
  { key: "new", label: "New" },
  { key: "improved", label: "Improved" },
  { key: "fixed", label: "Fixed" },
];

/** "2026-09-15" → "15 September 2026" (UTC, locale-independent). */
export function formatWhatsNewDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ""));
  if (!m) return "";
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${Number(m[3])} ${months[Number(m[2]) - 1]} ${m[1]}`;
}
