const devBtn = document.getElementById('developer-btn');
const devOverlay = document.getElementById('developer-overlay');
const closeBtn = document.getElementById('close-developer');

function getFocusable(el) {
    return [...el.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')]
        .filter(node => node.offsetParent !== null);
}

function openDevOverlay() {
    devOverlay.classList.add('active');
    devBtn.setAttribute('aria-expanded', 'true');
    devBtn.__previousFocus = document.activeElement;
    const focusables = getFocusable(devOverlay);
    (focusables[0] || devOverlay).focus();
    document.addEventListener('keydown', handleKeyDown);
}

function closeDevOverlay() {
    devOverlay.classList.remove('active');
    devBtn.setAttribute('aria-expanded', 'false');

    try { (devBtn.__previousFocus || devBtn).focus(); } catch (e) {}
    document.removeEventListener('keydown', handleKeyDown);
}

function handleKeyDown(e) {

    if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        closeDevOverlay();
        return;
    }

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

if (devBtn && devOverlay && closeBtn) {
    devBtn.addEventListener('click', () => openDevOverlay());
    devBtn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDevOverlay(); } });

    closeBtn.addEventListener('click', () => closeDevOverlay());

    devOverlay.addEventListener('click', e => {
        if (e.target === devOverlay) {
            closeDevOverlay();
        }
    });

    devOverlay.addEventListener('transitionend', () => {
        if (!devOverlay.classList.contains('active')) {
            devOverlay.blur && devOverlay.blur();
        }
    });
}
