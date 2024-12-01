<?php

add_action('woocommerce_edit_account_form', 'add_delete_me_shortcode_to_account_form');

function add_delete_me_shortcode_to_account_form() {
    // Проверка дали е инсталиран нужният плъгин
    if (shortcode_exists('plugin_delete_me')) {
        echo '<div class="delete-account-section">';
        echo do_shortcode('[plugin_delete_me /]');
        echo '</div>';
    }
}
