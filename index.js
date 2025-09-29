const devBtn = document.getElementById('developer-btn');
const devOverlay = document.getElementById('developer-overlay');
const closeBtn = document.getElementById('close-developer');

devBtn.addEventListener('click', () => {
    devOverlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    devOverlay.classList.remove('active');
});

devOverlay.addEventListener('click', e => {
    if (e.target === devOverlay) {
        devOverlay.classList.remove('active');
    }
});