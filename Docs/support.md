support.js — Documentation

Purpose
-------
`support.js` provides client-side support utilities for the site's Support page. It contains a small knowledge-base of troubleshooting guides, renders step-by-step instructions for selected issues, collects and displays system information for users to share with support, implements a simple FAQ accordion toggle, and handles support form submission (client-side only; logs to console and displays a success message).

Location
--------
`c:\Users\jcmag\WebstormProjects\Kato PC Website\support.js`

Quick summary
-------------
- A `troubleshootingGuides` object stores named guides (keyed by id like `nopower`, `overheating`, etc.) containing title, steps (heading + items), and a warning.
- `showTroubleshooting()` renders a selected guide into the DOM and is driven by a `<select id="issueCategory">` control.
- `getSystemInfo()` collects basic client environment info (platform, browser, resolution, cores, language, online/cookie status), formats it and shows it in an element with ID `systemInfo`.
- `toggleFAQ(button)` toggles `.active` on the clicked FAQ item and collapses others.
- The support form (`#supportForm`) submission is handled on the client: it gathers form values, logs them, displays a success message in `#formMessage`, clears the form, and scrolls the message into view.

DOM expectations
----------------
The script expects the following IDs/classes to exist in the support page markup:
- `#issueCategory` — a <select> used to pick a troubleshooting topic.
- `#troubleshootingSteps` — container where selected guide HTML is rendered.
- `#systemInfo` — container where `getSystemInfo()` writes a summary of the user's environment.
- `.faq-item` — FAQ items whose parent contains a toggle button used with `toggleFAQ(button)`.
- `#supportForm` — the contact/support form with inputs: `#name`, `#email`, `#phone`, `#issue`, `#description`, `#urgency`.
- `#formMessage` — container used to show a confirmation message after submission.

Public functions
----------------
- `showTroubleshooting()`
  - Reads the current value of `#issueCategory` and renders the corresponding guide into `#troubleshootingSteps`.
  - If no issue is selected it clears the container.

- `getSystemInfo()`
  - Gathers data from `navigator`, `screen`, and other browser APIs and renders a readable list into `#systemInfo`.
  - Adds the `.active` class to the container to reveal it.

- `getBrowserName()`
  - Small utility that returns a human-friendly browser name based on `navigator.userAgent`.

- `toggleFAQ(button)`
  - Collapses all `.faq-item` nodes and opens the one whose toggle button was used (adds `.active`).

- `getResponseTime(urgency)`
  - Convenience mapping: `high -> '4 hours'`, `medium -> '48 hours'`, `low -> '3-5 business days'`.

Client-side form handling
-------------------------
- On `DOMContentLoaded` the script wires a submit handler on `#supportForm`.
- On submit it builds a `formData` object, logs it to `console`, shows a friendly message in `#formMessage`, resets the form, scrolls the message into view, and hides the message after 10s.
- NOTE: This is client-side only and does not send data to a server. Replace the console log with a `fetch()` call if you want to persist support requests to a backend.

Data shapes
-----------
- `troubleshootingGuides` shape:
  ```json
  {
    "<key>": {
       "title": "...",
       "steps": [{ "heading": "...", "items": ["...", "..."] }, ...],
       "warning": "..."
    }
  }
  ```
- `formData` (on submit):
  ```json
  {
    "name": "...",
    "email": "...",
    "phone": "...",
    "issue": "...",
    "description": "...",
    "urgency": "low|medium|high",
    "timestamp": "ISO-8601 string"
  }
  ```

Edge cases and caveats
---------------------
- The script inserts HTML built from the `troubleshootingGuides` object directly into the DOM using template strings. Since the content is static and internal, this is acceptable, but if guide content ever becomes user-generated, sanitize it to avoid XSS.
- `getBrowserName()` uses simple substring checks on `navigator.userAgent`; it can misidentify less-common browsers or future UA strings. Consider feature-detection or a well-maintained UA parser if accuracy matters.
- The support form handler assumes all expected input elements exist; a missing element will throw an error when accessing `.value`. Add defensive checks if the markup is dynamic.
- There is no client-side validation on the form fields. Invalid emails or missing required data will still be "submitted" (logged) by the current handler.

Testing / QA steps
------------------
1. Troubleshooting render
   - Select each option in `#issueCategory` and verify `#troubleshootingSteps` updates to show the guide, steps, and a warning box.
2. System Info
   - Click (or otherwise trigger) `getSystemInfo()` and verify `#systemInfo` displays accurate platform, browser, resolution, cores, and online/cookie status.
3. FAQ toggle
   - Click the toggle button inside different `.faq-item` elements and ensure only the clicked item expands (class `.active`) while others collapse.
4. Support form
   - Fill and submit the form; confirm the console logs the `formData`, the success message appears in `#formMessage`, the form resets, and the message scrolls into view and disappears after ~10s.

Recommended improvements
------------------------
- Server integration: replace the console log with a `fetch('/api/support', { method: 'POST', body: JSON.stringify(formData) })` to persist requests and send confirmation emails.
- Validation: add client-side validation for required fields and proper email format before sending.
- Accessibility: ensure `#formMessage` uses `role="status"` or `aria-live="polite"` so assistive tech announces confirmations.
- Sanitization: if any guide content becomes editable by users, sanitize before injecting into the DOM.
- Rate-limiting / spam protection: add a simple CAPTCHA or server-side rate limiting to avoid abuse.
- Progressive enhancement: make the `showTroubleshooting()` behavior gracefully degrade if JavaScript is disabled (for example, provide server-side rendered guides).

Files touched
------------
- `support.js` — main logic

License / Attribution
---------------------
Generated documentation for internal project use. Review and adapt before public distribution.
