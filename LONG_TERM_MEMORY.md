# Long-term UX memory

This file captures important UX/product requirements so we don't regress later.

## Joysticks
- **Floating by default**: when `Fixed joysticks` is OFF, the first drag inside the joystick zone becomes the temporary center (tap alone should not “move” a stick).
- **Return after lift**: after finger lifts, the joystick visual returns to its original position.
- **Auto-center toggle**: `Auto-center joysticks` controls whether the stick input snaps back to center after lift (default ON).
- **Stick click gesture**: `Double-tap stick = stick click` (default ON) makes double-tap on stick send L3/R3, replacing separate stick-click buttons.
- **Tilt to steer implementation**: must use gravity-including accelerometer and compute angle/roll; `userAccelerometer` will not hold steady tilt.
- **Tilt must not break holds**: tilt-to-steer updates must not trigger high-frequency `setState` rebuilds on the controller page (can cancel held pointers). Update the outgoing input frame without rebuilding.
- **Stick value updates must not `setState` the whole controller page**: `setLeftStick` / `setRightStick` should mutate stick axes and send frames without rebuilding the entire `GamepadLayoutSurface` (rebuilds cancel held pointers).
- **Outgoing frames must snapshot `buttons`**: never pass the live `Set` into `InputFrame` (async send + mutation can corrupt serialized button lists).
- **Hit testing when sticks overlap buttons**: paint/order sticks **below** other controls so overlapping buttons keep pointer priority.
- **Custom sticks**: layout rect can be non-square; optional `stickVisualScale` scales the drawn stick radii (may extend outside the rect). The dashed rect is the floating-center zone.
- **Tilt is per-layout**: each saved layout can allow/disallow tilt-to-steer. Default: Racing allows tilt. Global tilt setting still gates everything.

## Open / polish (tilt + input)
- **Tilt-to-steer + hold is not fully solved**: with global tilt enabled, some devices still see **held buttons as repeated taps** or inconsistent hold. Treat as a **post-MVP polish** item: may need input sampling coalescing, isolating the controller surface in a `RepaintBoundary` / layered composition, or platform-specific pointer behavior review. Revisit when polishing; do not assume the current implementation is the final word.

## Layout editing
- **Full gamepad preset**: large left/right stick **hit** regions below the upper clusters with a **small center gap** (~4% width) only; keep visual stick size similar via `stickVisualScale` on the preset if the new `min(width,height)` changes.
- **Editor must be fullscreen landscape**, using the full available canvas area.
- **Reserved Back button**: always visible in previews/play; in the editor it must be movable/resizable but **not deletable**, and it should not navigate away when tapped in edit mode.
- **Copy presets**: users can copy built-in layouts into a custom layout and edit from there.

## Navigation / chrome
- In landscape pre-connect mode, use a **side menu** (not a large bottom bar) and keep app chrome minimal.

## Android / protocol identity
- Each install must send a **unique persistent `deviceId`** in `DeviceHello` / `DeviceHeartbeat` / `DeviceBye` (stored in `SharedPreferences`, UUID v4). Never hardcode a shared id like `mobile-local` when multiple phones can connect.

## PC dashboard
- Must support **multiple simultaneous Android devices**, each mapped to its own virtual controller (Gamepad 1..N).
- The primary “Connected devices” view should show **live input** per device (buttons light while held, dpad/axes move) to identify who controls which gamepad.
- Avoid noisy/debug-only metrics in the main UI (e.g. total frames).
- **Stable gamepad slots**: prefer `DeviceHello.deviceId` as the injection/slot identity (fallback to IP). Keep the same “Gamepad N” index across disconnect/reconnect when possible; release only the ViGEm device on disconnect, not the slot mapping.

