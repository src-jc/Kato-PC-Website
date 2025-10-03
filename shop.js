let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart(); // ✅ refresh the cart UI immediately
    document.getElementById("cart-sidebar").classList.add("active");
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
        removeBtn.onclick = function () {
            removeFromCart(index);
        };

        li.appendChild(removeBtn);
        cartList.appendChild(li);

        total += c.price;
    });

    document.getElementById("total").textContent = `Total: ₱${total.toLocaleString()}`;
    localStorage.setItem("cart", JSON.stringify(cart));
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
    document.getElementById("cart-sidebar").classList.remove("active");
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
