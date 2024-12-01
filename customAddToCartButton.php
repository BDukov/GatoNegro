<?php

function render_add_to_cart_button() {
    global $product; // Вземаме текущия продукт в контекста на повторителя

    if (!$product || !$product->is_purchasable()) {
        return ''; // Ако продуктът не е наличен за покупка, връщаме празно
    }

    // ID на продукта
    $product_id = $product->get_id();
	
	// URL на изображението
    $image_url = 'https://projects.miagod.com/gatonegro.bg/delivery/wp-content/uploads/2024/11/ph_handbag-simple-bold.svg';

    // Генерираме HTML за бутона
    $button_html = '<form class="cart" method="post" enctype="multipart/form-data">';
    $button_html .= '<button type="submit" name="add-to-cart" value="' . esc_attr($product_id) . '" class="button add-to-cart oxygen-add-to-cart-button">';
	$button_html .= '<img src="' . esc_url($image_url) . '" alt="Cart Icon" class="cart-icon">';
    $button_html .= esc_html__('Добави', 'woocommerce');
    $button_html .= '</button>';
    $button_html .= '</form>';

    echo $button_html;
}

// Регистриране на функцията като шорткод за използване в Oxygen
add_shortcode('oxygen_add_to_cart_button', 'render_add_to_cart_button');


// Функция за извличане на изображението на текущия продукт с fallback (placeholder)
function get_product_image_shortcode() {
    global $product; // Вземаме текущия продукт в контекста на повторителя

    if (!$product) {
        return ''; // Ако няма продукт, връщаме празно
    }

    // Вземаме изображението на продукта
    $image_id = $product->get_image_id();
    
    // Ако има изображение, го извличаме
    if ($image_id) {
        $image_url = wp_get_attachment_url($image_id); // Вземаме URL на изображението
    } else {
        // Ако няма изображение, задаваме placeholder
        $image_url = 'https://projects.miagod.com/gatonegro.bg/delivery/wp-content/uploads/2024/11/placeholder.png';
    }

    // Връщаме HTML с изображението
    $image_html = '<img src="' . esc_url($image_url) . '" alt="' . esc_attr($product->get_name()) . '" class="product-image" />';
    return $image_html; // Връщаме HTML на изображението
}

// Регистриране на шорткода
add_shortcode('product_image', 'get_product_image_shortcode');



//CUSTOM ADD TO CART BUTTON OT PRODUCT PAGE
function render_custom_add_to_cart_button() {
    global $product;

    if (!$product || !$product->is_purchasable()) {
        return ''; // Ако продуктът не може да се купи, връщаме празно.
    }

    // ID на продукта
    $product_id = $product->get_id();
    
    // URL на изображението
    $image_url = 'https://projects.miagod.com/gatonegro.bg/delivery/wp-content/uploads/2024/11/ph_handbag-simple-bold.svg';

    // Генериране на HTML за бутона
    $button_html = '<div class="custom-cart-button-wrapper" data-product-id="' . esc_attr($product_id) . '">';
    $button_html .= '<button type="button" class="button add-to-cart custom-add-to-cart-button">';
    $button_html .= '<img src="' . esc_url($image_url) . '" alt="Cart Icon" class="cart-icon">';
    $button_html .= esc_html__('Добави', 'woocommerce');
    $button_html .= '</button>';
    $button_html .= '</div>';

    echo $button_html;
}

// Регистриране на функцията като шорткод за използване в Oxygen
add_shortcode('custom_add_to_cart_button', 'render_custom_add_to_cart_button');
