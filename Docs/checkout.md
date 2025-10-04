checkout.js — Documentation

Purpose
-------
This script renders and manages the checkout page UI using the cart stored in localStorage. It reads the `cart` entry from localStorage, renders a summary list, shows a total, allows removing individual items, and handles the checkout form submission.

Location
--------
`c:\Users\jcmag\WebstormProjects\Kato PC Website\checkout.js`

Quick summary
-------------
- On page load, `renderCheckout()` is called to populate the summary.
- Cart data is expected in localStorage under the key `cart` as a JSON array of objects: [{ name: string, price: number }, ...].
- The script expects the checkout page to contain the following DOM elements (IDs):
  - `summary-items` — container (e.g., `<ul>`) where `<li>` entries for each cart item are appended.
  - `summary-total` — element where the total price text is written.
  - `empty-actions` — container for actions shown when the cart is empty (display toggled).
  - `checkout-actions` — container for actions shown when the cart has items (display toggled).
  - `place-order` — button that is disabled when cart is empty and enabled otherwise.
  - A `<form>` element wrapping checkout inputs — script attaches a submit handler to this form to finalize the order.

Public functions
----------------
- `renderCheckout()`
  - Reads cart from localStorage and renders the UI.
  - Shows "No items in cart." and disables the place-order button when the cart is empty.
  - For each item, creates an `<li>` of the form: "<name> - ₱<price>" and appends a remove (×) button that calls `removeFromCheckout(index)`.
  - Updates the `summary-total` text to `Total: ₱<sum>` and toggles action containers.

- `removeFromCheckout(index)`
  - Removes the item at `index` from the cart array, writes the updated cart back to localStorage, and calls `renderCheckout()`.

Lifecycle / Event wiring
------------------------
- `window.onload` is used to call `renderCheckout()` on page load.
- `DOMContentLoaded` event listener attaches a `submit` handler to the first `<form>` found on the page. On submit it:
  - Prevents the default submit.
  - Alerts the user with a success message.
  - Clears the `cart` key from localStorage.
  - Redirects the user to `shop.html`.

Data shape / examples
---------------------
Cart in localStorage (JSON):

[ { "name": "ASUS RTX 4080", "price": 89999 }, { "name": "Corsair 32GB DDR5", "price": 12999 } ]

Rendered HTML (example li):

<li>ASUS RTX 4080 - ₱89,999<button class="remove-btn">×</button></li>

Edge cases and assumptions
-------------------------
- Assumes `price` is a number. If price is stored as a string, numeric operations may break or produce unexpected totals. Convert to Number before storing or modify the script to coerce values.
- Uses `index` as the remove identifier. If cart items have identical objects, removal by index is fine but reordering or deduplication elsewhere could cause unexpected removals. Consider giving each item a stable id (UUID) if items need stronger identity.
- The script calls `localStorage.removeItem('cart')` on successful form submission — this clears the cart entirely.
- The script uses `window.onload` and `DOMContentLoaded` concurrently. That works in practice but can be simplified to a single DOM-ready handler.

Testing / QA steps
------------------
1. With an empty cart: remove `cart` from localStorage and reload the checkout page.
   - Expect `summary-items` to show "No items in cart." and `place-order` to be disabled.
2. With items in cart: set localStorage `cart` to an array of items and reload.
   - Expect one `<li>` per item with a working × remove button.
   - Expect `summary-total` to display the sum with proper thousands separators.
3. Removing an item: click a remove button and verify the item disappears and total updates.
4. Placing an order: submit the checkout form and verify the success alert, that localStorage `cart` is cleared, and that the browser redirects to `shop.html`.
5. Cross-check: test with prices as numbers and as numeric strings to ensure totals behave as expected.

Recommended improvements
------------------------
- Use event delegation for remove buttons instead of assigning `onclick` per item — this reduces closures and simplifies re-rendering.
- Use `addEventListener` consistently instead of `onclick` for better composition.
- Replace `window.onload` with a single `DOMContentLoaded` handler to avoid duplication and ensure predictable timing.
- Add input validation on the checkout form before clearing the cart and redirecting.
- Persist each cart item with a stable `id` so removals are unambiguous.
- Consider adding a small unit test harness or headless browser test for the checkout flow.

Files touched
------------
- `checkout.js` — main logic and event wiring.

License / Attribution
---------------------
This documentation was generated to describe existing code in the workspace. Review and adapt before publishing.
