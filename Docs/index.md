index.js — Documentation

Purpose
-------
`index.js` implements an accessible developer overlay (floating action button) used on the homepage. The overlay is a small dialog that can be opened via a FAB (`#developer-btn`) and closed via an explicit close button, clicking the overlay backdrop, or pressing Escape.

Location
--------
`c:\Users\jcmag\WebstormProjects\Kato PC Website\index.js`

Quick summary
-------------
- Focus management: saves previously focused element before opening, focuses the first focusable element within the overlay, and restores focus on close.
- Keyboard handling: traps focus using `Tab` / `Shift+Tab` while the overlay is open, and closes the overlay on Escape.
- Mouse handling: clicking the burger/FAB (`#developer-btn`) opens the overlay; clicking the overlay backdrop closes it; clicking the close button closes the overlay.
- Accessibility: the script toggles `aria-expanded` on the `#developer-btn` and maintains focus.

DOM expectations
----------------
- `#developer-btn` — the action button that opens the overlay (should have `aria-haspopup="dialog"`).
- `#developer-overlay` — the overlay container (role `dialog`, should be focusable or contain focusable controls).
- `#close-developer` — close button inside the overlay.

Public behavior / functions
---------------------------
- `openDevOverlay()` — opens the overlay, saves previous focus, focuses the first focusable control inside the overlay, and registers keyboard handlers.
- `closeDevOverlay()` — closes the overlay, restores previously focused element, and removes keyboard handlers.
- `handleKeyDown(e)` — handles Escape to close and Tab/Shift+Tab to trap focus inside the overlay.

Edge cases & notes
------------------
- The script assumes `devBtn`, `devOverlay`, and `closeBtn` exist; if any are missing, invoking functions will cause errors. A defensive check can be added to skip wiring when elements are missing.
- Focusable element detection uses `offsetParent !== null` which excludes visually hidden elements but may fail in some CSS positioning cases. Consider using `:not([hidden])` or explicit visibility checks.
- On mobile, focus trapping semantics are less predictable; ensure overlay is usable with touch if required.

Testing / QA
-----------
1. Open the page and press Enter/Space on the developer button: overlay should open and focus a control inside it.
2. Use Tab and Shift+Tab to ensure focus cycles within the overlay.
3. Press Escape: overlay should close and focus should return to the developer button.
4. Click the backdrop (the overlay container outside the panel): overlay should close.
5. Verify `aria-expanded` toggles on `#developer-btn`.

Suggested improvements
----------------------
- Add defensive checks before wiring event listeners to avoid errors in pages where the markup is absent.
- Move initialization behind `DOMContentLoaded` to ensure the DOM exists before `getElementById` runs.
- Consider using `aria-hidden` to hide the rest of the page content from assistive tech while the dialog is open.
- Add CSS transitions and an `aria-live` region if you plan to dynamically announce state changes.

Files touched
------------
- `index.js` — main overlay behavior.

License / Attribution
---------------------
Generated documentation for internal project use. Review and adapt before public distribution.
