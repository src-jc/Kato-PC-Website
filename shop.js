let total = 0;

function toggleNav() {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("active");
}

let cart = [];
function addToCart(item, price) {
    cart.push({ item, price });
    updateCart();
}
function updateCart() {
    const cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach((c, index) => {
        const li = document.createElement("li");
        li.textContent = `${c.item} - ₱${c.price}`;
        cartList.appendChild(li);
        total += c.price;
    });
    document.getElementById("total").textContent = `Total: ₱${total}`;
}
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for your purchase!");
        cart = [];
        updateCart();
    }
}

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('show');
}
