# Game Controller MVP Plan (Android-first, Windows XInput-first)
connect to a pc and emulate an Xbox gamepad (x-input) or (d-input)
have all buttons that normal controllers have
have customizable and saveable layouts of buttons and triggers
have veryyyy low latency as high latency is a huge issue when playing games.
have an option to download a supporting software on the pc that connects and emulates the signlas from the mobile app and converts to gamepad input with low latency.
have an optional no-download interface where there is no need to download or install anything on pc, it may have higher latency or not but that is ok. this is mostly for those who don't wish to download anything extra or dont trust software on pc. 
maybe it can run via just opening a website, or jsut connect through wifi/bluetooth and somehow emulate a gamepad sending signals over wifi/bluetooth. ideally latency shoudl be low here as well.
have a tilt to steer option, useful for racing games.
have adjustable options like steering sensitivity and range
have a very basic tutorial, or rather information on how to use it on every page. it should be minimal while also having all details needed so players can get into their games fast.
have a color theme option, and later on we can add more themes to customize the look of the buttons or have a background of a gamepad as image etc but that is for later.
It should also be able to connect to android devices or tablets, and google tv, android tv, and linux. but the major focus for now can be on windows pc, later on lets get to all of these. I would like apple devices as well so try that too if possible.
add a USB connection option as well, which can be done through usb debugging mode. this will for sure have extremely less latency so for users with no wifi/bluetooth this can work well.
the user interface should be extremely beautiful while also minimalistic. as I said before, there should be app themes as well , original theme can be green, where major bold text is in green, and background is a very dark slight green. and buttons 
themselves have green shades.
the above are the main features of the app. if there is anything that you think would be a useful addition then add it as well .
## Status Key



great now I think all these basic steps are done. now lets move on to the real task of beautifying the app and the user interface. first of all the current button scheme is abysmal to say the least. i have attached an image, lets try following that layout for now. 

key points to remember here are 
1. triggers cannot be kept as sliders, people only press them, nobody half presses it. so triggers must be kept as buttons and you should figure out what that should result in X-input. 
2. 
════════ Exception caught by rendering library ═════════════════════════════════
A RenderFlex overflowed by 90 pixels on the bottom.
The relevant error-causing widget was:
    Column Column:file:///C:/Users/admin/Documents/Projects/gamepad/game_controller/lib/features/controller/controller_page.dart:261:30
════════════════════════════════════════════════════════════════════════════════
there was some overlapping items in the current layout. very bad looking. i think t he A X Y B buttons also overlap (the A and Y). 

3. the dpad should have more clickable area. you have now created 4 buttons, but if someone clicks to the left of the right button then nothing will be registered, although the place they clicked is still on the right side compared to center of hte Dpad. so make the Dpad fully clickable with a vervy small deadzone in the center, you can shape the buttons in such a way . 

4. there is no joystick currently. there should be 2 joysticks that should be allowed to be kept in the layout. 

5. Remember that all of this must be modular. we will later create a customize layout screen where users can add whichever elements they want, they should be able to resize it and place it at different locations on the screen as well. and remove components that are not needed, or add those that are. make this feature with a mind to user interface and user interaction

6. after all this is done, make a couple more layouts that can be chosen on the layouts page. the layouts should have stuff like  a) only dpad and the A X Y B buttons, or only joystick and A X Y B buttons, for games like mario. and then b) the current layout that i told you with all of it, shaped like an actual gamepad.  c) a racing game focused layout with only 2 buttons A and Y, and 2 trigger buttons but very long so they cover the full height, these trrigger buttons will act like brake an daccelrate in most racing games.