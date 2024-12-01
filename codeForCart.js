document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.woocommerce-cart-form__cart-item').forEach((item, index) => {
        console.log(`Processing cart item #${index + 1}`); // Debugging log

        // Create a container for subtotal, quantity, and title
        const productGroup = document.createElement('div');
        productGroup.className = 'product-group';
        productGroup.style.display = 'flex';
        productGroup.style.flexDirection = 'column';
        productGroup.style.flex = '1';

        // Create a container for subtotal and quantity
        const subtotalQuantityGroup = document.createElement('div');
        subtotalQuantityGroup.className = 'subtotal-quantity-group';
        subtotalQuantityGroup.style.display = 'flex';
        subtotalQuantityGroup.style.alignItems = 'center';
        subtotalQuantityGroup.style.gap = '10px';

        // Get the existing elements
        const subtotal = item.querySelector('.product-subtotal');
        const quantity = item.querySelector('.product-quantity');
        const title = item.querySelector('.product-name');

        console.log('Found elements:', {
            subtotal: subtotal ? 'Yes' : 'No',
            quantity: quantity ? 'Yes' : 'No',
            title: title ? 'Yes' : 'No',
        });

        // Append subtotal and quantity to the new container
        if (subtotal && quantity) {
            subtotalQuantityGroup.appendChild(subtotal);
            subtotalQuantityGroup.appendChild(quantity);
        }

        // Append the subtotal-quantity group and the title to the product group
        if (title) {
            productGroup.appendChild(subtotalQuantityGroup);
            productGroup.appendChild(title);
        }

        // Insert the product group after the thumbnail
        const thumbnail = item.querySelector('.product-thumbnail');
        if (thumbnail) {
            thumbnail.insertAdjacentElement('afterend', productGroup);
            console.log(`Product group inserted for item #${index + 1}`);
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Move the actions (coupon section) outside the scrollable tbody
    const cartTable = document.querySelector('.woocommerce-cart-form__contents');
    const actions = cartTable.querySelector('.actions');

    if (actions) {
        // Insert the coupon section after the table
        cartTable.parentNode.appendChild(actions);
        console.log('Moved coupon section outside the scrollable product list.');
    }
});

