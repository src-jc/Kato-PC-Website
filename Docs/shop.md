shop.js — Documentation

Purpose
-------
`shop.js` implements the shop page behaviors: a client-side cart (localStorage-backed), a collapsible cart sidebar, a live search that flattens product results, sidebar toggling, and utility UI interactions (add-to-cart delegation, search result animations, and smooth navigation).

Location
--------
`c:\Users\jcmag\WebstormProjects\Kato PC Website\shop.js`

Quick summary
-------------
- Cart is stored in `localStorage` under the `cart` key and mirrored in a runtime `cart` array.
- Public functions: `addToCart(name, price)`, `updateCart()`, `removeFromCart(index)`, `checkout()`, `closeCart()`.
- Search: `performSearch(query)` and `hideSearchResults()` implement a live search that clones matching `.item` elements into `#search-results` and hides the original product sections while showing a flattened results section.
- Sidebar: `#sidebar-toggle` toggles a `#sidebar` element's `show` class. Sidebar anchor links perform smooth scroll and temporarily add a `nav-highlight` class to the target.

DOM expectations
----------------
The script expects the following elements to exist on the page (IDs/classes):
- `#cart-sidebar` — the cart panel which is shown/hidden via `.active`.
- `#cart-toggle` — cart button (script updates `.shifted` and `.cart-badge`). Fallback logic creates this element at runtime if missing (see `ensureCartToggle()` in the file).
- `#cart-items` — `<ul>` or container where cart `<li>` elements are rendered.
- `#total` — element where the cart total is displayed.
- `.cart-badge` — badge element inside `#cart-toggle` or globally selected to display cart item count.
- `main > section .item` — product cards with `h3` (title), `.price` (price) and a `button` (add to cart). The script annotates each item with `data-name` and `data-price` and converts buttons to `add-to-cart` delegates.
- `#searchBar`, `#searchInput`, `#searchBtn`, `#clearSearch`, `#search-results-section`, `#search-results`, `#no-results` — search bar and results area elements.
- `#sidebar`, `#sidebar-toggle` — optional sidebar and toggle for navigation.

Public API
----------
- `addToCart(name, price)` — push an item into the cart, persist, update UI, open the cart sidebar.
- `updateCart()` — re-render cart items, update total, and refresh the cart badge.
- `removeFromCart(index)` — remove item at index, persist, and update UI.
- `checkout()` — if cart non-empty, persist and redirect to `checkout.html`.
- `closeCart()` — close the cart sidebar and reset cart toggle state.
- `performSearch(query)` — run a live search for `query` (or reads from `#searchInput`) and show flattened results.
- `hideSearchResults()` — hide the flattened results and restore product sections.

Implementation notes
--------------------
- Event delegation is used to handle `add-to-cart` clicks globally; items are annotated with `data-name` and `data-price` during `DOMContentLoaded` initialization.
- The search clones `.item` nodes into the `#search-results` container and marks clones with `data-cloned` to avoid re-creating duplicates.
- The script attempts to keep the `#searchInput` focused and in view when results are displayed using `focus({ preventScroll: true })` and `scrollIntoView()` with a try/catch fallback.
- Search visibility is controlled via CSS class transitions: `results-visible` and `results-hiding`, with a `transitionend` listener cleanup.
- `updateCart()` finds a badge using `#cart-toggle .cart-badge` or `.cart-badge` fallback — useful because the runtime fallback may create different markup.

Data shape
----------
localStorage `cart` key contains a JSON array of objects: `[{ name: string, price: number }, ...]`.
The `cart` array in memory mirrors that structure.

Edge cases and caveats
---------------------
- Prices are extracted by stripping non-digits from `.price` text and `parseInt` — ensure price text contains digits. Currency symbols and separators are tolerated.
- Using array `index` for removal is simple but can be fragile if multiple places mutate the cart concurrently. Consider stable IDs for items if you later support editing or quantity changes.
- The search clones DOM nodes — cloned elements will not have bound event listeners. If you need clone actions (e.g., buying from results) make sure to re-attach necessary listeners or rely on delegation to cover cloned nodes.
- The script expects certain IDs/classes; if markup changes, fallback logic may create elements, but the ideal fix is to keep `shop.html` markup consistent.

Testing / QA
-----------
- Add items via the Add to Cart buttons and verify the cart badge increments and `#cart-sidebar` opens.
- Remove an item from the cart and confirm total updates and badge decrements.
- With search, type a query and verify `#search-results` shows flattened matching items, original sections hide, and the intro is compacted.
- Click a result button and ensure the cart behavior works (add via delegation) and results hide afterwards.
- Test the site with and without the explicit `#cart-toggle` markup to verify runtime fallback behavior.

Recommended improvements
------------------------
- Add stable IDs to cart items for robust removal and quantity support.
- Re-attach or rely on delegation for actions inside cloned search results to ensure buttons work consistently.
- Improve search scoring (tokenize product titles, categories) and add keyboard navigation within results.
- Provide a small animation/aria-live update when the cart badge changes for better accessibility.
- Consider debouncing `performSearch()` during typing to reduce CPU work on large catalogs.

Files touched
------------
- `shop.js` — main logic

License / Attribution
---------------------
Generated documentation for internal project use. Review and adapt before public distribution.
