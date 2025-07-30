document.addEventListener('DOMContentLoaded', () => {

    // 1. Product Image Gallery & Color Switching
    const mainProductImage = document.getElementById('mainProductImage');
    const thumbnailContainer = document.querySelector('.thumbnail-images'); // Get the container
    const colorSelect = document.getElementById('color-select');
    let thumbnails = document.querySelectorAll('.thumbnail-images .thumbnail'); // Initial NodeList

    // Product image data by color (using placeholders)
    const productImageData = {
        "black": {
            main: "https://m.media-amazon.com/images/I/71wsFuSw1kL._SY741_.jpg",
            thumbs: [
                "https://m.media-amazon.com/images/I/614M06s5KiL._SY550_.jpg",
                "https://m.media-amazon.com/images/I/61oagXZIKNL._SY550_.jpg",
                "https://m.media-amazon.com/images/I/51JChjWzrqL._SX522_.jpg",
                "https://m.media-amazon.com/images/I/61Ff0KXOfOL._SY550_.jpg"
            ]
        },
        "white": {
            main: "https://m.media-amazon.com/images/I/61w7r7NhqJL._SY550_.jpg",
            thumbs: [
                "https://m.media-amazon.com/images/I/61slpMHEc7L._SY550_.jpg",
                "https://m.media-amazon.com/images/I/61Uc5jZrX7L._SY550_.jpg",
                "https://m.media-amazon.com/images/I/51cjco5C8UL._SX522_.jpg",
                "https://m.media-amazon.com/images/I/61t8K7Fi7PL._SY550_.jpg"
            ]
        }
    };

    // Function to update main image and thumbnails based on color
    function updateProductImages(selectedColor) {
        const images = productImageData[selectedColor];

        // Update main image
        mainProductImage.src = images.main;
        mainProductImage.alt = `TAGDO Men's Jacquard Polo Shirt - ${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}`;

        // Clear existing thumbnails
        thumbnailContainer.innerHTML = '';

        // Add new thumbnails
        images.thumbs.forEach((thumbSrc, index) => {
            const img = document.createElement('img');
            img.src = thumbSrc;
            img.alt = `${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} Polo Thumbnail ${index + 1}`;
            img.classList.add('thumbnail');
            if (index === 0) {
                img.classList.add('active'); // Set the first thumbnail as active
            }
            thumbnailContainer.appendChild(img);
        });

        // Re-query thumbnails to include newly added ones and attach listeners
        thumbnails = document.querySelectorAll('.thumbnail-images .thumbnail');
        attachThumbnailListeners(); // Re-attach listeners after updating DOM
    }

    // Function to attach click listeners to thumbnails
    function attachThumbnailListeners() {
        thumbnails.forEach(thumbnail => {
            // Remove any existing listeners to prevent duplicates
            thumbnail.removeEventListener('click', onThumbnailClick);
            // Add the listener
            thumbnail.addEventListener('click', onThumbnailClick);
        });
    }

    // Thumbnail click handler
    function onThumbnailClick(event) {
        const clickedThumbnail = event.currentTarget;
        // Update main image source
        // Note: For placeholders, we might just use the thumbnail src directly or a specific main size placeholder
        mainProductImage.src = clickedThumbnail.src; // Assuming thumbnail src can be used for main display

        // Remove 'active' class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));

        // Add 'active' class to the clicked thumbnail
        clickedThumbnail.classList.add('active');
    }

    // Event listener for color selection
    colorSelect.addEventListener('change', (event) => {
        const selectedColor = event.target.value;
        updateProductImages(selectedColor);
    });

    // Initial load: Set images based on default selected color (Black)
    updateProductImages(colorSelect.value);
    attachThumbnailListeners(); // Attach listeners for initial thumbnails


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

    // 4. Buy Now Button Interaction (REMOVED - now handled by HTML <a> tag)
    // The previous buyNowBtn click listener is no longer needed as the <a> tag
    // directly handles the Amazon redirection. If you need analytics before redirect,
    // you would add an event listener to the `buy-now-btn-link` and use event.preventDefault()
    // before window.location.href.

    // 5. Simulate Review Scroll/Load (optional interactive element)
    console.log("Product page loaded. Ready for customer interaction!");
});
