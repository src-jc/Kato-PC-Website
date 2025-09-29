const devBtn = document.getElementById('developer-btn');
const devOverlay = document.getElementById('developer-overlay');
const closeBtn = document.getElementById('close-developer');

// Open overlay
devBtn.addEventListener('click', () => {
    devOverlay.classList.add('active');
});

// Close overlay
closeBtn.addEventListener('click', () => {
    devOverlay.classList.remove('active');
});

// Close overlay when clicking outside the panel
devOverlay.addEventListener('click', e => {
    if (e.target === devOverlay) {
        devOverlay.classList.remove('active');
    }
});