// Function to check if the user is logged in
function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Initialize cart data (from localStorage or empty array if none exists)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart UI dynamically
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    const checkoutButton = document.getElementById('checkoutButton');
    const loginMessage = document.getElementById('login-message');

    let totalAmount = 0;

    // Clear previous cart items
    cartItemsContainer.innerHTML = "";

    // If the cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<tr><td colspan='4'>Your cart is empty.</td></tr>";
        totalAmountElement.innerText = "₹0";
        checkoutButton.disabled = true; // Disable the checkout button if the cart is empty
    } else {
        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <button class="quantity-button" data-index="${index}" data-action="decrease">-</button>
                    ${item.quantity}
                    <button class="quantity-button" data-index="${index}" data-action="increase">+</button>
                </td>
                <td>₹${item.totalAmount}</td> <!-- Total amount per item (quantity * unit price) -->
                <td><button class="remove-button" data-index="${index}">Remove</button></td>
            `;
            cartItemsContainer.appendChild(row);

            // Add the item total to the overall cart total
            totalAmount += item.totalAmount;

            // Add event listeners for quantity change buttons
            row.querySelectorAll('.quantity-button').forEach(button => {
                button.addEventListener('click', function() {
                    const action = button.dataset.action;
                    const index = button.dataset.index;

                    if (action === 'increase') {
                        cart[index].quantity += 1;
                    } else if (action === 'decrease' && cart[index].quantity > 1) {
                        cart[index].quantity -= 1;
                    }

                    cart[index].totalAmount = cart[index].pricePerUnit * cart[index].quantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartUI(); // Re-render the cart UI
                });
            });

            // Add event listener for remove button
            row.querySelector('.remove-button').addEventListener('click', function() {
                const index = this.dataset.index;
                cart.splice(index, 1); // Remove the item from the cart
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI(); // Re-render the cart UI
            });
        });

        // Update the total amount
        totalAmountElement.innerText = `₹${totalAmount}`;
        checkoutButton.disabled = false; // Enable the checkout button if the cart is not empty
    }

    // If the user is not logged in, show a message instead of the checkout option
    if (!isUserLoggedIn()) {
        loginMessage.style.display = 'block'; // Show the "Please log in" message
        checkoutButton.disabled = true; // Disable the checkout button
    } else {
        loginMessage.style.display = 'none'; // Hide the "Please log in" message if the user is logged in
    }
}

// Checkout Button Logic
document.getElementById('checkoutButton').addEventListener('click', function() {
    if (!isUserLoggedIn()) {
        alert("You need to log in to checkout.");
        window.location.href = 'home.html'; // Redirect to login page
    } else {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items to your cart.");
        } else {
            alert("Proceeding with checkout...");
            // Clear the cart after checkout
            cart = []; 
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI(); // Re-render the empty cart
            window.location.href = 'home.html'; // Redirect to home page (Thank You page)
        }
    }
});

// Function to continue shopping (redirect to home)
function continueShopping() {
    window.location.href = 'home.html'; // Redirect to home page
}

// Initial load of cart UI on page load
window.onload = updateCartUI;
