guide.js — Documentation

Purpose
-------
`guide.js` powers a documentation-style page with a table of contents (TOC) that smoothly scrolls to sections and highlights the active TOC link while scrolling. It also formats a credit card input into groups of 4 digits.

Location
--------
`c:\Users\jcmag\WebstormProjects\Kato PC Website\guide.js`

Quick summary
-------------
- Intercepts clicks on `.doc-nav-link` anchors to perform a smooth scroll to the corresponding section while accounting for a fixed header offset.
- Updates the active TOC link on scroll by comparing the page Y offset against each `.doc-section`'s offsetTop.
- Formats the input with ID `card` into 4-digit groups as the user types.

DOM expectations
----------------
The script expects the following structure on the page:
- Navigation links with the class `.doc-nav-link` linking to section IDs (e.g., `<a class="doc-nav-link" href="#intro">Intro</a>`).
- Content sections with class `.doc-section` and unique `id` attributes matching the nav links (e.g., `<section id="intro" class="doc-section">`).
- An input with ID `card` if card-number formatting is desired (optional).

Behavior details
----------------
1. Click handling for `.doc-nav-link`:
   - Prevents default anchor behavior.
   - Removes `.active` from all nav links and adds it to the clicked link.
   - Computes a scroll target position as `target.offsetTop - offset` where `offset = 100` (to account for a fixed navbar).
   - Calls `window.scrollTo({ top: targetPosition, behavior: 'smooth' })` for a smooth scroll.

2. Scrollspy logic:
   - On `scroll`, iterates all `.doc-section` elements and finds the last section for which `pageYOffset >= sectionTop - 150`.
   - Sets the corresponding nav link (matching `href` to `#<current>`) to `.active`.
   - This provides a simple scrollspy that highlights the TOC link for the section currently scrolled into view.

3. Card input formatting:
   - Listens for `input` on `#card`.
   - Removes whitespace, groups characters into 4-digit chunks, and inserts spaces between groups.
   - Uses a safe optional chaining (`?.`) pattern to avoid errors when the split yields `null`.

Edge cases and notes
--------------------
- Offset hardcoded: `offset = 100` and the scrollspy threshold `150` are magic numbers. They should match your header height; otherwise active link highlighting may feel off.
- The script assumes that `href` values on nav links are valid IDs present on the page. If a link points to a missing element, clicking will do nothing.
- The scrollspy picks the last qualifying section by iterating all sections; in complex layouts you may prefer `getBoundingClientRect()` checks.
- `card` input formatting does not restrict to digits — if you need strict validation, apply an input filter to remove non-digit characters.
- Mobile/responsive: smooth scrolling and offsets may need tuning for different viewport heights and fixed header behaviors.

Testing / QA steps
------------------
1. Click a TOC link: it should smoothly scroll to the section and the clicked link should receive `.active`.
2. Scroll manually: as you pass section boundaries the corresponding TOC link should become `.active`.
3. Resize the window and test again to ensure offsets are still reasonable.
4. Card input: type a 16-digit number and confirm the input automatically formats into groups of 4 digits.

Suggested improvements
----------------------
- Calculate the header offset dynamically: measure the fixed header height (`document.querySelector('.navbar').offsetHeight`) instead of hardcoding `100`.
- Debounce the scroll handler for performance on long pages.
- Use `IntersectionObserver` for a more robust and efficient scrollspy implementation.
- Restrict `#card` input to digits only and consider using `inputmode="numeric"` and `pattern` attributes for better mobile UX.
- Add keyboard accessibility improvements: allow nav links to be focused and activated via keyboard, and maintain context for screen readers when navigating.

Files touched
------------
- `guide.js` — behavior described above.

License / Attribution
---------------------
Generated documentation for internal project use. Review and adapt before public distribution.
