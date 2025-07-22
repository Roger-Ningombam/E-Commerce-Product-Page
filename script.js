document.addEventListener('DOMContentLoaded', () => {
    // 1. Product Image Gallery
    const mainProductImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail-images .thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Update main image source
            mainProductImage.src = thumbnail.src.replace('150x150', '600x600'); // Adjust placeholder size for main image

            // Remove 'active' class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));

            // Add 'active' class to the clicked thumbnail
            thumbnail.classList.add('active');
        });
    });

    // 2. Quantity Selector
    const decrementBtn = document.getElementById('decrement-btn');
    const incrementBtn = document.getElementById('increment-btn');
    const quantityInput = document.getElementById('quantity');

    decrementBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) { // Ensure quantity doesn't go below 1
            quantityInput.value = currentValue - 1;
        }
    });

    incrementBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });

    // Optional: Prevent manual input of non-positive numbers
    quantityInput.addEventListener('change', () => {
        let currentValue = parseInt(quantityInput.value);
        if (isNaN(currentValue) || currentValue < 1) {
            quantityInput.value = 1;
        }
    });

    // 3. Add to Cart Button Interaction
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        const productTitle = document.querySelector('.product-title').textContent;
        const selectedQuantity = quantityInput.value;
        const selectedColor = document.getElementById('color-select').value;

        alert(`Added ${selectedQuantity} "${productTitle}" (${selectedColor}) to cart! (This is a demo action)`);
        console.log({
            product: productTitle,
            quantity: selectedQuantity,
            color: selectedColor,
            action: 'Add to Cart'
        });
        // In a real application, you'd send this data to a backend or update a cart state.
    });

    // 4. Buy Now Button Interaction
    const buyNowBtn = document.querySelector('.buy-now-btn');
    buyNowBtn.addEventListener('click', () => {
        const productTitle = document.querySelector('.product-title').textContent;
        const selectedQuantity = quantityInput.value;
        const selectedColor = document.getElementById('color-select').value;

        alert(`Proceeding to checkout with ${selectedQuantity} "${productTitle}" (${selectedColor}). (This is a demo action)`);
        console.log({
            product: productTitle,
            quantity: selectedQuantity,
            color: selectedColor,
            action: 'Buy Now'
        });
        // In a real application, this would redirect to a checkout page or trigger an immediate payment flow.
    });

    // 5. Simulate Review Scroll/Load (optional interactive element)
    // You could add an "Load More Reviews" button and fetch reviews dynamically.
    // For this demo, we'll just log something.
    console.log("Product page loaded. Ready for customer interaction!");
});
