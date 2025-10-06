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

const sidebarBtn = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');

if (sidebarBtn) {
    sidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('show');
    });
}

function performSearch(query) {

    const searchInputEl = document.getElementById('searchInput');
    const raw = (searchInputEl ? searchInputEl.value : (query || ''));
    const trimmedQuery = (raw || '').trim();

    const allItems = Array.from(document.querySelectorAll('main > section:not(#search-results-section) .item'));
    const noResults = document.getElementById('no-results');
    const resultsSection = document.getElementById('search-results-section');
    const resultsGrid = document.getElementById('search-results');

    if (!trimmedQuery) {
        hideSearchResults();
        return;
    }

    const q = trimmedQuery.toLowerCase();
    let matches = 0;

    if (resultsGrid) resultsGrid.innerHTML = '';

    allItems.forEach(it => {
        const type = (it.dataset.type || '').toLowerCase();
        const category = (it.dataset.category || '').toLowerCase();
        const text = (it.innerText || it.textContent || '').toLowerCase();

        if (type.includes(q) || category.includes(q) || text.includes(q)) {
            matches++;

            if (resultsGrid) {

                const clone = it.cloneNode(true);

                clone.dataset.cloned = 'true';



                resultsGrid.appendChild(clone);
            }
        }
    });


    document.querySelectorAll('main > section').forEach(sec => {
        if (sec.id === 'intro') {
            sec.style.display = '';
            sec.classList.add('compact-search');
            return;
        }
        if (resultsSection && sec.id === 'search-results-section') return;
        sec.style.display = 'none';
    });


    if (resultsSection) {

        resultsSection.classList.remove('results-hiding');
        resultsSection.style.display = 'block';
        void resultsSection.offsetWidth;
        resultsSection.classList.add('results-visible');
    }
    if (noResults) noResults.style.display = matches === 0 ? 'block' : 'none';

    const inputEl = document.getElementById('searchInput');
    if (inputEl) {
        try {
            inputEl.focus({ preventScroll: true });
            inputEl.scrollIntoView({ block: 'nearest' });
        } catch (e) {
            inputEl.focus();
        }
    }
}

function hideSearchResults() {
    const allItems = Array.from(document.querySelectorAll('main > section:not(#search-results-section) .item'));
    const noResults = document.getElementById('no-results');
    const resultsSection = document.getElementById('search-results-section');
    const resultsGrid = document.getElementById('search-results');

    allItems.forEach(it => it.style.display = '');
    if (noResults) noResults.style.display = 'none';
    if (resultsGrid) resultsGrid.innerHTML = '';

    if (resultsSection) {
        resultsSection.classList.remove('results-visible');
        resultsSection.classList.add('results-hiding');

        const cleanup = () => {
            resultsSection.style.display = 'none';
            resultsSection.removeEventListener('transitionend', cleanup);
        };
        resultsSection.addEventListener('transitionend', cleanup);
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

document.addEventListener('click', (e) => {
    const resultsGrid = document.getElementById('search-results');
    if (!resultsGrid) return;
    if (resultsGrid.contains(e.target)) {

        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            setTimeout(hideSearchResults, 50);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('searchInput');
    const btn = document.getElementById('searchBtn');
    const clear = document.getElementById('clearSearch');


    document.querySelectorAll('main > section .item').forEach(item => {
        const titleEl = item.querySelector('h3');
        const priceEl = item.querySelector('.price') || item.querySelector('p');
        const btnEl = item.querySelector('button');
        if (titleEl && priceEl && btnEl) {
            const name = titleEl.textContent.trim();
            const priceText = priceEl.textContent.replace(/[^0-9]/g, '');
            const price = parseInt(priceText, 10) || 0;
            item.dataset.name = name;
            item.dataset.price = price;
            btnEl.classList.add('add-to-cart');
            if (btnEl.getAttribute('onclick')) btnEl.removeAttribute('onclick');
        }

        if (!item.querySelector('.view-product')) {
            const vp = document.createElement('button');
            vp.textContent = 'View product';
            vp.className = 'view-product';
            vp.addEventListener('click', (e) => {
                e.preventDefault();
                openProductModal(item);
            });
        
            const existingBtn = item.querySelector('button.add-to-cart') || item.querySelector('button');
            if (existingBtn) existingBtn.insertAdjacentElement('beforebegin', vp);
            else item.appendChild(vp);
        }
    });

    document.addEventListener('click', (e) => {
        const btn = e.target.closest && e.target.closest('button.add-to-cart');
        if (btn) {
            const item = btn.closest('.item');
            if (!item) return;
            const name = item.dataset.name || item.querySelector('h3')?.textContent.trim();
            const price = parseInt(item.dataset.price || (item.querySelector('.price')?.textContent.replace(/[^0-9]/g, '') || ''), 10) || 0;
            addToCart(name, price);
            e.preventDefault();
        }
    });

    if (input) {
        input.addEventListener('input', () => {
            performSearch();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
        input.addEventListener('blur', () => {
            setTimeout(() => performSearch(), 0);
        });

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
            const resultsSection = document.getElementById('search-results-section');
            if (resultsSection) resultsSection.style.display = 'none';
        });
    }

    performSearch();

    document.querySelectorAll('#sidebar nav a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const href = a.getAttribute('href');
            const target = document.querySelector(href);
            if (!target) return;


            hideSearchResults();

            const sidebar = document.getElementById('sidebar');
            if (sidebar && sidebar.classList.contains('show')) sidebar.classList.remove('show');

            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            target.classList.add('nav-highlight');
            setTimeout(() => target.classList.remove('nav-highlight'), 1200);
        });
    });
});

const productModal = document.getElementById('product-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('product-modal-title');
const modalPrice = document.getElementById('product-modal-price');
const modalDesc = document.getElementById('product-modal-desc');
const modalSpecs = document.getElementById('product-modal-specs');
const modalAddBtn = document.getElementById('modal-add-to-cart');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalX = document.getElementById('modal-x');

let currentModalItem = null;

function openProductModal(itemEl) {
    if (!productModal) return;
    currentModalItem = itemEl;
    const img = itemEl.querySelector('img');
    const title = itemEl.querySelector('h3')?.textContent.trim() || itemEl.dataset.name || '';
    const priceText = (itemEl.querySelector('.price') || itemEl.querySelector('p'))?.textContent || '';
    const price = priceText.replace(/[^0-9]/g, '') || itemEl.dataset.price || '';
    const desc = itemEl.querySelector('.desc') ? itemEl.querySelector('.desc').textContent : (itemEl.querySelector('p') ? itemEl.querySelector('p').textContent : '');

    modalImage.src = img ? img.src : '';
    modalImage.alt = img ? img.alt || title : title;
    modalTitle.textContent = title;
    modalPrice.textContent = price ? `₱${Number(price).toLocaleString()}` : '';
    
    const synthDesc = (() => {
        const base = (desc || '').trim();
        if (!base || /^₱?\d+/.test(base)) {
            const specs = [];
            if (itemEl.dataset.specs) specs.push(...itemEl.dataset.specs.split('|'));
            else {
                const ps = Array.from(itemEl.querySelectorAll('p'));
                ps.slice(1).forEach(p => { if (p.textContent && !/^₱?\d+/.test(p.textContent.trim())) specs.push(p.textContent.trim()); });
            }
            if (specs.length) return `${title} — ${specs.slice(0,3).join(', ')}.`;
            return `${title} — High-quality component from trusted brands.`; 
        }
        return base;
    })();

    modalDesc.textContent = synthDesc;

    modalSpecs.innerHTML = '';
    if (itemEl.dataset.specs) {
        itemEl.dataset.specs.split('|').forEach(s => {
            const li = document.createElement('li'); li.textContent = s; modalSpecs.appendChild(li);
        });
    } else {

        const ps = Array.from(itemEl.querySelectorAll('p'));
        ps.slice(1).forEach(p => { const li = document.createElement('li'); li.textContent = p.textContent; modalSpecs.appendChild(li); });
    }

    productModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    if (!productModal) return;
    productModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentModalItem = null;
}

if (modalAddBtn) modalAddBtn.addEventListener('click', () => {
    if (!currentModalItem) return;
    const name = currentModalItem.dataset.name || currentModalItem.querySelector('h3')?.textContent.trim();
    const price = parseInt(currentModalItem.dataset.price || (currentModalItem.querySelector('.price')?.textContent.replace(/[^0-9]/g, '') || ''), 10) || 0;
    addToCart(name, price);
    closeProductModal();
});
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProductModal);
if (modalX) modalX.addEventListener('click', closeProductModal);
if (productModal) productModal.addEventListener('click', (e) => {
    if (e.target && e.target.dataset && e.target.dataset.action === 'close-modal') closeProductModal();
});

