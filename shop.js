let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart(); // ✅ refresh the cart UI immediately
    const sidebarEl = document.getElementById("cart-sidebar");
    if (sidebarEl) {
        sidebarEl.classList.add("active");
        // move the cart toggle out of the way if present
        const ct = document.getElementById('cart-toggle');
        if (ct) {
            ct.classList.add('shifted');
            ct.setAttribute('aria-expanded', 'true');
        }
    }
}

function updateCart() {
    const cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((c, index) => {
        const li = document.createElement("li");
        li.textContent = `${c.name} - ₱${c.price.toLocaleString()}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "×";
        removeBtn.classList.add("remove-btn");
        removeBtn.setAttribute('aria-label', 'Remove item');
        removeBtn.addEventListener('click', function () {
            removeFromCart(index);
        });

        li.appendChild(removeBtn);
        cartList.appendChild(li);

        total += c.price;
    });

    document.getElementById("total").textContent = `Total: ₱${total.toLocaleString()}`;
    localStorage.setItem("cart", JSON.stringify(cart));
    // update badge if present
    const badge = document.querySelector('#cart-toggle .cart-badge') || document.querySelector('.cart-badge');
    if (badge) badge.textContent = String(cart.length || 0);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "checkout.html";
}
function closeCart() {
    const sidebarEl = document.getElementById("cart-sidebar");
    if (sidebarEl) sidebarEl.classList.remove("active");
    const ct = document.getElementById('cart-toggle');
    if (ct) {
        ct.classList.remove('shifted');
        ct.setAttribute('aria-expanded', 'false');
    }
}

// Cart toggle button on shop page
const cartToggle = document.getElementById('cart-toggle');
if (cartToggle) {
    // initialize badge
    const badge = cartToggle.querySelector('.cart-badge');
    if (badge) badge.textContent = String(cart.length || 0);

    cartToggle.addEventListener('click', () => {
        const sidebar = document.getElementById('cart-sidebar');
        if (!sidebar) return;
        const isActive = sidebar.classList.toggle('active');
        cartToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        // shift the cart toggle button horizontally so it doesn't overlap the opened sidebar
        if (isActive) cartToggle.classList.add('shifted'); else cartToggle.classList.remove('shifted');
    });
}
window.onload = function () {
    updateCart(); //
};

const sidebarBtn = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');

if (sidebarBtn) {
    sidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('show');
    });
}

// --- Search feature ---
function performSearch(query) {
    // normalize query: treat whitespace-only as empty
    const searchInputEl = document.getElementById('searchInput');
    const raw = (searchInputEl ? searchInputEl.value : (query || ''));
    const trimmedQuery = (raw || '').trim();
    // Only consider original product items (exclude items inside the search results container)
    const allItems = Array.from(document.querySelectorAll('main > section:not(#search-results-section) .item'));
    const noResults = document.getElementById('no-results');
    const resultsSection = document.getElementById('search-results-section');
    const resultsGrid = document.getElementById('search-results');

    // When query is empty: restore original sections and hide results area
    if (!trimmedQuery) {
        hideSearchResults();
        return;
    }

    const q = trimmedQuery.toLowerCase();
    let matches = 0;

    // Build results: clear previous
    if (resultsGrid) resultsGrid.innerHTML = '';

    allItems.forEach(it => {
        const type = (it.dataset.type || '').toLowerCase();
        const category = (it.dataset.category || '').toLowerCase();
        const text = (it.innerText || it.textContent || '').toLowerCase();

        if (type.includes(q) || category.includes(q) || text.includes(q)) {
            matches++;

            if (resultsGrid) {
                // clone the item node to display in flat results
                const clone = it.cloneNode(true);
                // mark clone so it won't be treated as an original on subsequent searches
                clone.dataset.cloned = 'true';

                // delegation will handle Add-to-Cart for cloned buttons, so no onclick copying needed

                resultsGrid.appendChild(clone);
            }
        }
    });

    // Hide all original product sections except the intro; put intro in compact mode
    document.querySelectorAll('main > section').forEach(sec => {
        if (sec.id === 'intro') {
            // compact the intro so the search bar remains visible
            sec.style.display = '';
            sec.classList.add('compact-search');
            return;
        }
        if (resultsSection && sec.id === 'search-results-section') return;
        sec.style.display = 'none';
    });

    // Toggle results section and no-results message
    if (resultsSection) {
        // make visible using animation classes
        resultsSection.classList.remove('results-hiding');
        // ensure it's present in layout for the animation
        resultsSection.style.display = 'block';
        // trigger reflow then add visible class
        void resultsSection.offsetWidth;
        resultsSection.classList.add('results-visible');
    }
    if (noResults) noResults.style.display = matches === 0 ? 'block' : 'none';

    // keep focus on search input and avoid page jump
    const inputEl = document.getElementById('searchInput');
    if (inputEl) {
        try {
            inputEl.focus({ preventScroll: true });
            inputEl.scrollIntoView({ block: 'nearest' });
        } catch (e) {
            // fallback for older browsers
            inputEl.focus();
        }
    }
}

// helper to hide results and restore page state
function hideSearchResults() {
    const allItems = Array.from(document.querySelectorAll('main > section:not(#search-results-section) .item'));
    const noResults = document.getElementById('no-results');
    const resultsSection = document.getElementById('search-results-section');
    const resultsGrid = document.getElementById('search-results');

    allItems.forEach(it => it.style.display = '');
    if (noResults) noResults.style.display = 'none';
    if (resultsGrid) resultsGrid.innerHTML = '';

    // animate hiding the results section
    if (resultsSection) {
        resultsSection.classList.remove('results-visible');
        resultsSection.classList.add('results-hiding');

        // wait for transitionend before removing from layout
        const cleanup = () => {
            resultsSection.style.display = 'none';
            resultsSection.removeEventListener('transitionend', cleanup);
        };
        resultsSection.addEventListener('transitionend', cleanup);
        // fallback in case transitionend doesn't fire
        setTimeout(() => {
            if (resultsSection.style.display !== 'none') {
                resultsSection.style.display = 'none';
                resultsSection.classList.remove('results-hiding');
            }
        }, 400);
    }

    document.querySelectorAll('main > section').forEach(sec => {
        sec.style.display = '';
    });
    const introRestore = document.getElementById('intro');
    if (introRestore) introRestore.classList.remove('compact-search');
}

// hide results when user clicks outside search area (and input is empty)
document.addEventListener('click', (e) => {
    const bar = document.getElementById('searchBar');
    const resultsSection = document.getElementById('search-results-section');
    const input = document.getElementById('searchInput');
    if (!bar || !resultsSection) return;
    const insideBar = bar.contains(e.target);
    const insideResults = resultsSection.contains(e.target);
    if (!insideBar && !insideResults) {
        if (input && input.value.trim() === '') {
            hideSearchResults();
        }
    }
});

// delegate clicks inside results so Add to Cart can hide results afterward
document.addEventListener('click', (e) => {
    const resultsGrid = document.getElementById('search-results');
    if (!resultsGrid) return;
    if (resultsGrid.contains(e.target)) {
        // if a button inside results was clicked, close results after the click handler runs
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            setTimeout(hideSearchResults, 50);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('searchInput');
    const btn = document.getElementById('searchBtn');
    const clear = document.getElementById('clearSearch');

    // --- Convert inline Add to Cart buttons to data-driven buttons ---
    // For each product .item, ensure data-name and data-price exist and mark the button
    document.querySelectorAll('main > section .item').forEach(item => {
        // find title and price inside the item
        const titleEl = item.querySelector('h3');
        const priceEl = item.querySelector('.price') || item.querySelector('p');
        const btnEl = item.querySelector('button');
        if (titleEl && priceEl && btnEl) {
            const name = titleEl.textContent.trim();
            // extract digits from price text
            const priceText = priceEl.textContent.replace(/[^0-9]/g, '');
            const price = parseInt(priceText, 10) || 0;
            // attach data attributes to the .item for delegation
            item.dataset.name = name;
            item.dataset.price = price;
            // ensure the button has a class to identify it for delegation
            btnEl.classList.add('add-to-cart');
            // remove any inline onclick attribute if present (clean up)
            if (btnEl.getAttribute('onclick')) btnEl.removeAttribute('onclick');
        }
    });

    // Delegated click for add-to-cart buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest && e.target.closest('button.add-to-cart');
        if (btn) {
            const item = btn.closest('.item');
            if (!item) return;
            const name = item.dataset.name || item.querySelector('h3')?.textContent.trim();
            const price = parseInt(item.dataset.price || (item.querySelector('.price')?.textContent.replace(/[^0-9]/g, '') || ''), 10) || 0;
            addToCart(name, price);
            e.preventDefault();
            return;
        }
    });

    if (input) {
        input.addEventListener('input', (e) => {
            performSearch();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
        // when input loses focus, re-check (this hides results if input is empty)
        input.addEventListener('blur', () => {
            setTimeout(() => performSearch(), 0); // timeout to allow Clear click to process
        });

        // allow Esc to clear and hide results
        input.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                input.value = '';
                performSearch();
            }
        });
    }

    if (btn) {
        btn.addEventListener('click', () => {
            performSearch(input ? input.value : '');
        });
    }

    if (clear) {
        clear.addEventListener('click', () => {
            if (input) input.value = '';
            performSearch();
            // also ensure results container hidden immediately
            const resultsSection = document.getElementById('search-results-section');
            if (resultsSection) resultsSection.style.display = 'none';
        });
    }

    // run an initial check to hide any leftover results on load
    performSearch();

    // Smooth navigation from sidebar links to page sections
    document.querySelectorAll('#sidebar nav a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const href = a.getAttribute('href');
            const target = document.querySelector(href);
            if (!target) return;

            // close search results if open
            hideSearchResults();

            // ensure sidebar is closed for better UX on mobile
            const sidebar = document.getElementById('sidebar');
            if (sidebar && sidebar.classList.contains('show')) sidebar.classList.remove('show');

            // smooth scroll and briefly highlight
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            target.classList.add('nav-highlight');
            setTimeout(() => target.classList.remove('nav-highlight'), 1200);
        });
    });
});
