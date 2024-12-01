document.addEventListener('DOMContentLoaded', function () {
    const currentPage = document.querySelector('.product-template-default');

    if (currentPage) {
        const buyButton = document.querySelector('.button.add-to-cart.custom-add-to-cart-button');
        buyButton.addEventListener('click', function (e) {
            e.preventDefault();

            const checkedLabels = [];
            let productId = null;
            let productQuantity = null;

            // Взимаме всички елементи с клас "acf-field-item"
            const fieldItems = document.querySelectorAll('.acf-field-item');

            // Обхождаме всеки елемент
            fieldItems.forEach((item) => {
                const checkbox = item.querySelector('.acf-checkbox'); // Чекбоксът в текущия елемент
                const label = item.querySelector('label'); // Лейбълът в текущия елемент

                if (checkbox && checkbox.checked) {
                    checkedLabels.push(label.textContent.trim()); // Добавяме текста на лейбъла
                }
            });

            // Вземаме ID на продукта
            productId = document.querySelector('.custom-cart-button-wrapper')?.getAttribute('data-product-id');

            // Вземаме количеството
            const quantityInput = document.querySelector('.product-quantity');
            if (quantityInput) {
                productQuantity = parseInt(quantityInput.value, 10); // Преобразуваме в число
            }

            // AJAX заявка към сървъра
            if (productId && productQuantity) {
                const dataToSend = {
                    action: 'custom_add_to_cart',
                    product_id: productId,
                    quantity: productQuantity,
                    meta_data: JSON.stringify(checkedLabels),
                    security: wc_add_to_cart_params.wc_ajax_nonce,
                };

                // Изпращаме AJAX заявка
                jQuery.ajax({
                    url: wc_add_to_cart_params.ajax_url, // URL за AJAX заявката
                    type: 'POST',
                    data: dataToSend,
                    success: function(response) {
                        if (response.success) {
                            // Актуализираме само конкретните елементи в количката
                            if (response.data['.oxy-woo-mini-cart__quantity-badge']) {
                                jQuery('.oxy-woo-mini-cart__quantity-badge')
                                    .html(response.data['.oxy-woo-mini-cart__quantity-badge'])
                                    .show();
                            }

                            if (response.data['.oxy-woo-mini-cart__total']) {
                                jQuery('.oxy-woo-mini-cart__total')
                                    .html(response.data['.oxy-woo-mini-cart__total']);
                            }

                            if (response.data['.oxy-woo-mini-cart__items-count']) {
                                jQuery('.oxy-woo-mini-cart__items-count')
                                    .html(response.data['.oxy-woo-mini-cart__items-count']);
                            }

                            alert('Продуктът е добавен успешно в количката!');
                        } else {
                            alert('Възникна грешка: ' + response.data.message);
                        }
                    },
                    error: function() {
                        alert('Грешка при добавяне на продукта в количката.');
                    }
                });
            }
        });
    }
});