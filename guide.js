document.querySelectorAll('.doc-nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelectorAll('.doc-nav-link').forEach(l => l.classList.remove('active'));

        this.classList.add('active');

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offset = 100; // Account for fixed navbar
            const targetPosition = targetSection.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.doc-section');
    const navLinks = document.querySelectorAll('.doc-nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

const cardInput = document.getElementById('card');
if (cardInput) {
    cardInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        e.target.value = value.match(/.{1,4}/g)?.join(' ') || value;
    });
}