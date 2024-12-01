<?php

// Добавяне на NONCE към JS
function custom_enqueue_scripts() {
    // Зареждаме основния JavaScript файл
    wp_enqueue_script('custom-add-to-cart', get_template_directory_uri() . '/js/custom-add-to-cart.js', array('jquery'), null, true);

    // Локализираме скрипта, за да предадем PHP стойности на JavaScript
    wp_localize_script('custom-add-to-cart', 'wc_add_to_cart_params', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'wc_ajax_nonce' => wp_create_nonce('custom_add_to_cart_nonce'), // Генерираме nonce за сигурност
    ));
}
add_action('wp_enqueue_scripts', 'custom_enqueue_scripts');



add_action( 'wp_ajax_custom_add_to_cart', 'custom_add_to_cart_callback' );
add_action( 'wp_ajax_nopriv_custom_add_to_cart', 'custom_add_to_cart_callback' );

function custom_add_to_cart_callback() {
    // Проверка за валидност на заявката (например, id на продукта)
    if ( isset( $_POST['product_id'] ) && isset( $_POST['quantity'] ) ) {
        $product_id = intval( $_POST['product_id'] );
        $quantity = intval( $_POST['quantity'] );

        // Добавяне на продукта в количката
        WC()->cart->add_to_cart( $product_id, $quantity );

        // Събиране на новата информация за количката
        $fragments = array();
        ob_start();
        woocommerce_mini_cart();
        $fragments['.oxy-woo-mini-cart__flyout-fragments'] = ob_get_clean();

        ob_start();
        echo WC()->cart->get_cart_contents_count(); // Актуализиране на бройката
        $fragments['.oxy-woo-mini-cart__quantity-badge'] = ob_get_clean();

        ob_start();
        echo WC()->cart->get_total(); // Актуализиране на цената
        $fragments['.oxy-woo-mini-cart__total'] = ob_get_clean();

        // Връщаме фрагментите в отговор
        wp_send_json_success( $fragments );
    }

    wp_die();
}
