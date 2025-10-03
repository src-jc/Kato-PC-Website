const devBtn = document.getElementById('developer-btn');
const devOverlay = document.getElementById('developer-overlay');
const closeBtn = document.getElementById('close-developer');

// simple focus-trap helpers
function getFocusable(el) {
    return [...el.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')]
        .filter(node => node.offsetParent !== null);
}

function openDevOverlay() {
    devOverlay.classList.add('active');
    devBtn.setAttribute('aria-expanded', 'true');
    // save previously focused element
    devBtn.__previousFocus = document.activeElement;
    // focus first focusable element in dialog (close button)
    const focusables = getFocusable(devOverlay);
    (focusables[0] || devOverlay).focus();
    // listen for keyboard navigation
    document.addEventListener('keydown', handleKeyDown);
}

function closeDevOverlay() {
    devOverlay.classList.remove('active');
    devBtn.setAttribute('aria-expanded', 'false');
    // return focus to the button
    try { (devBtn.__previousFocus || devBtn).focus(); } catch (e) {}
    document.removeEventListener('keydown', handleKeyDown);
}

function handleKeyDown(e) {
    // Escape closes
    if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        closeDevOverlay();
        return;
    }

    // Focus trap: keep focus inside overlay when open
    if (e.key === 'Tab' && devOverlay.classList.contains('active')) {
        const focusables = getFocusable(devOverlay);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    }
}

// mouse / click handlers
devBtn.addEventListener('click', () => openDevOverlay());
devBtn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDevOverlay(); } });

closeBtn.addEventListener('click', () => closeDevOverlay());

devOverlay.addEventListener('click', e => {
    // clicking outside the panel closes
    if (e.target === devOverlay) {
        closeDevOverlay();
    }
});

// ensure overlay doesn't trap focus when hidden
devOverlay.addEventListener('transitionend', () => {
    if (!devOverlay.classList.contains('active')) {
        // remove tabindex hack
        devOverlay.blur && devOverlay.blur();
    }
});
