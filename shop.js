let cart = [];

function addToCart(item, price) {
    // Add item to cart array
    cart.push({ item, price });

    // Update sidebar cart
    updateCart();

    // Open cart sidebar
    document.getElementById("cart-sidebar").classList.add("active");
}

function updateCart() {
    const cartList = document.getElementById("cart-items");
    cartList.innerHTML = ""; // Clear previous items

    let total = 0;

    cart.forEach((c) => {
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
        return;
    }

    alert(`Thank you for your purchase! Total: ₱${cart.reduce((a, b) => a + b.price, 0)}`);
    cart = [];
    updateCart();
}

function closeCart() {
    document.getElementById("cart-sidebar").classList.remove("active");
}

const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("sidebar-toggle");

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show");
});
