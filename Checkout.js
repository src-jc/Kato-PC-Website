window.onload = function () {
    renderCheckout();
};

function renderCheckout() {
    let items = JSON.parse(localStorage.getItem("cart")) || [];
    let summaryList = document.getElementById("summary-items");
    let total = 0;

    summaryList.innerHTML = "";

    if (items.length === 0) {
        summaryList.innerHTML = "<li>No items in cart.</li>";
        document.getElementById("summary-total").textContent = "Total: ₱0";

        document.getElementById("empty-actions").style.display = "block";
        document.getElementById("checkout-actions").style.display = "none";

        document.getElementById("place-order").disabled = true;
        return;
    }

    items.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - ₱${item.price.toLocaleString()}`;

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "×";
        removeBtn.classList.add("remove-btn");
        removeBtn.onclick = function () {
            removeFromCheckout(index);
        };

        li.appendChild(removeBtn);
        summaryList.appendChild(li);

        total += item.price;
    });

    document.getElementById("summary-total").textContent =
        "Total: ₱" + total.toLocaleString();

    document.getElementById("empty-actions").style.display = "none";
    document.getElementById("checkout-actions").style.display = "flex";

    document.getElementById("place-order").disabled = false;
}

function removeFromCheckout(index) {
    let items = JSON.parse(localStorage.getItem("cart")) || [];
    items.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(items));
    renderCheckout();
}

function clearCart() {
    localStorage.removeItem("cart");
    renderCheckout();
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("✅ Order placed successfully! Thank you for shopping.");
            localStorage.removeItem("cart");
            window.location.href = "shop.html";
        });
    }
});
