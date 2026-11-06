# PocketPad Reddit kit

## Posting plan (new account, so pace it: 1 to 2 posts a day, reply to every comment)

Rules below came from a third-party rules index, so glance at each sidebar before posting. Every sub likely has hidden karma/age minimums; if a post silently vanishes, that's why.

| Day | Subreddit | Post | Notes |
|---|---|---|---|
| 1 | r/SideProject | A (gallery) | Story-first is what they like. Lowest barrier. |
| 1 | r/indiehackers | B (advice) | Use "Self Promotion" flair only if you include the link; you get 1 promo post ever there. |
| 2 | r/droidappshowcase | A or C | 1 app post per week. Use the sidebar template. |
| 2 | r/IMadeThis | A | |
| 3 | r/AppBusiness | B, without the Play link | App link only goes in the Friday feedback thread. |
| 3 | r/ShowMeYourApps | A | Small sub, easy. |
| 4 | r/GyroGaming | A, lead with tilt image | Tilt-steer angle. "No spam" is the only rule. |
| 4 | r/EmulationOnAndroid | C | Needs flair. Angle: "use it as a Bluetooth controller for emulators on a TV/PC". |
| 5 | r/EntrepreneurRideAlong | B | Text post, build-in-public tone. |
| later | r/AndroidGaming | C, title must start with `[DEV]` | Needs 1-month-old account + 50 karma *in that sub*. Comment there first. |
| later | r/Android | C as detailed text post | Needs 3-month-old account with history there. |
| later | r/simracing | Short tilt-steer post | Allowed "not excessively". |

**Avoid:** r/androidapps (zero promo, sends you to r/droidappshowcase), r/androiddev main feed (only the monthly "Interesting Android Apps" showcase thread, and they remove LLM-sounding text), r/AppIdeas, r/playmygame, r/AppHookup, r/pcgaming, r/pcmasterrace, r/software, r/TestMyApp. r/SteamDeck only after modmail approval.

## Name clash to know about

Another free app called **"Pocket Pad"** (github.com/jobrobse/Pocket-Pad, Android handheld as a Bluetooth gamepad) was posted and well received on r/SBCGaming in Jan and Mar 2026. Write it as "PocketPad" (one word) and always include your link so people don't mix them up. Skip r/SBCGaming for now.

## Threads to comment on (say you're the dev, answer the question first, link second)

1. r/SteamDeck, family phones as couch co-op gamepads: https://www.reddit.com/r/SteamDeck/comments/1ryy9do/androidios_phones_as_gamepad/
   Bluetooth HID needs no install, so it works in Gaming Mode. Check that's true on a Deck before saying it.
2. r/ItTakesTwo, phone as player 2 on PC: https://www.reddit.com/r/ItTakesTwo/comments/1pqiw8j/is_there_any_way_that_turn_a_phone_into_secondary/
3. r/AndroidGaming, phone as PC controller: https://www.reddit.com/r/AndroidGaming/comments/1qwilbj/is_there_any_way_to_use_my_phone_controller_as_pc/
   (Also builds the karma you need in that sub.)
4. r/assettocorsa, phone gyro steering guide: https://www.reddit.com/r/assettocorsa/comments/1tmp65k/guide_how_to_play_using_your_phone_as_a/
   They complain about throttle/brake layout; the big pedal layout answers that.
5. r/simracing, same topic: https://www.reddit.com/r/simracing/comments/1tmqxp1/how_to_play_assetto_corsa_with_phonegyro_steering/
6. r/archlinux, phone as a temporary mouse: https://www.reddit.com/r/archlinux/comments/1qi5oop/using_phone_as_a_temporary_mouse/
   Only if you've confirmed Bluetooth mouse mode works on Linux.
7. r/it, control PC from phone nearby: https://www.reddit.com/r/it/comments/1owoyee/how_to_control_my_pc_with_my_phone_when_im_close/

Some of these are months old and may be archived (no reply box). Skip those.

Example comment (edit into your own words):
> I ran into the same thing and ended up building a free app for it, PocketPad (I'm the dev). Over Bluetooth it shows up as a normal controller so nothing needs installing on the PC. [one line answering their specific situation]. https://pocketpad.datronapps.com

Images in this folder:
- 01_gamepad.png, 02_tilt_to_steer.png, 03_layout_editor.png, 04_bluetooth_or_wifi.png, 06_mouse_keyboard.png (showcase posts)
- 05_dashboard_stats.png (advice post; local IPs already cropped out)

Links:
- Site: https://pocketpad.datronapps.com
- Play Store: https://play.google.com/store/apps/details?id=com.datron.pocketpad

---

## POST A: Showcase (image gallery post)

**Title:** I always wanted to use my phone as a controller when I was a kid, so I built a free one: Bluetooth or Wi-Fi, tilt to steer, and a mouse/keyboard mode

**Images (in order):** 01_gamepad, 02_tilt_to_steer, 03_layout_editor, 04_bluetooth_or_wifi, 06_mouse_keyboard

**Body:**

Growing up I really wanted to play PC games with my phone as a controller, but every app I tried was paid, laggy, or needed something installed on the PC too. So I made PocketPad.

What it does:

- **Bluetooth, nothing to install:** pair once and your PC, Mac, TV or tablet sees it as a real controller
- **Wi-Fi mode (optional Windows companion):** lowest latency, and up to 16 phones for couch co-op
- **Tilt to steer** for racing games, with big gas/brake pedals
- **Fully editable layouts:** move, resize, add or remove any button
- **Mouse + keyboard mode:** touchpad, scroll, shortcuts and typing, handy for controlling the PC from the couch or between games

It's free, no account needed.

Site: https://pocketpad.datronapps.com
Play Store: https://play.google.com/store/apps/details?id=com.datron.pocketpad

I'd really like to hear what games you'd try it with, and what feels off if you do.

---

## POST B: Advice ask (dashboard image)

**Title:** My free Android app has ~1,550 installs but about half uninstall, mostly before they ever connect. How do you find the cause when you can't test on every phone?

**Image:** 05_dashboard_stats

**Body:**

I made PocketPad, a free app that turns your phone into a game controller / mouse for a PC over Bluetooth (or Wi-Fi with a Windows companion). Since launch on 4 Sep:

- 1,549 installs, 757 uninstalls
- 646 people actually connected and played
- Most uninstalls happen within minutes, on the Bluetooth pairing step
- Week over week it's improving (play starts +37%), but returning users are tiny

What I've learned so far: once people connect they use it (avg session ~38 min). The wall is pairing. Some phones (certain Realme/Android 16 builds, for example) block the Bluetooth HID profile entirely, and I only own one test phone.

What I'd love advice on:

1. **Cheap device testing:** Firebase Test Lab, BrowserStack, Samsung Remote Test Lab, asking testers? Has anything worked for Bluetooth-specific bugs?
2. **Analytics:** I use GA4 events. Is there a better way to see the exact last step before someone uninstalls?
3. **Onboarding:** for apps with a tricky first-time setup, what actually reduced drop-off for you?

Play Store link if anyone wants to see the setup flow: https://play.google.com/store/apps/details?id=com.datron.pocketpad

Thanks, any pointers help.

---

## POST C: Short text-only version (for subs that ban images or prefer text)

**Title:** [Dev] PocketPad: free app that turns your Android phone into a PC controller (Bluetooth, no PC install needed)

**Body:**

I built this because every phone-as-controller app I tried growing up was paid, laggy, or needed a PC install.

- Bluetooth HID: pair once, works with PC, Mac, TV, tablet
- Optional Wi-Fi companion on Windows for lowest latency and up to 16 phones
- Tilt to steer, editable layouts, floating sticks
- Mouse and keyboard mode for couch use

Free, no account. https://pocketpad.datronapps.com

Feedback very welcome, especially if pairing fails on your phone (tell me the model and I'll look into it).

---

## POST D: Churn advice (image post, 07_churn.png)

**Where:** r/AppBusiness (no link in the post), r/SideProject, r/indiehackers. Text + image. Don't add the Play link unless someone asks; drop it in a comment then.

**Title:** 61% of my installs uninstall, most within 10 minutes and before ever connecting. How do I make setup simpler?

**Body:**

I made a free Android app that turns your phone into a game controller / mouse for your PC. About 2,400 installs since early September, which I'm happy with, but the uninstall numbers are rough (screenshot from my analytics).

- 61% uninstall overall
- ~1,100 of the ~1,500 uninstalls happen the same day
- 917 of those people never connected even once, and their median time to uninstall is 10 min

So it's not that people try it and hate it, most of them never get it working.

Setup right now is either:
1. Bluetooth: pair the phone with the PC like you'd pair headphones, then it shows up as a controller
2. Wi-Fi: install a small companion app on Windows, then connect from the phone

I already have a short tour on first launch and a help screen, but clearly it's not enough.

For people who've built apps that need a second device or some pairing step, what actually helped? Would you push one method and hide the other? Video instead of a tour? Something else I'm not seeing?
