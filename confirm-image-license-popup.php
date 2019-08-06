<?php
/*
Plugin Name: Confirm Image License Popup
Plugin URI: https://www.elhardoum.com
Description: A simple WordPress plugin to confirm licensing before uploading any file to your website via wp-admin.
Author: Samuel Elh
Version: 0.1
Author URI: https://www.elhardoum.com
License: GPLv3
Text Domain: confirm-image-license-popup
*/

if ( ! defined ( 'WPINC' ) ) {
    exit; // direct access
}

class ConfirmImageLicensePopup
{
    const VERSION = 0.1;

    public function init()
    {
        if ( ! is_admin() )
            return;

        add_action('admin_enqueue_scripts', [$this, 'scripts']);

        add_filter('wp_handle_upload_prefilter', function($data)
        {
            global $pagenow;

            if ( 'async-upload.php' == $pagenow && isset( $_POST['unconfirmed'] ) ) {
                $data['error'] = __('Unconfirmed action: You must confirm the licensing allows publishing this file in our platform.', 'confirm-image-license-popup', 'confirm-image-license-popup');
            }

            return $data;
        });

        // i18n
        load_plugin_textdomain( 'confirm-image-license-popup', false, basename( __DIR__ ) . '/languages' );
    }

    public function scripts()
    {
        global $pagenow;

        if ( ! in_array($pagenow, ['post.php', 'post-new.php', 'upload.php', 'media-new.php']) )
            return;

        wp_enqueue_script('confirm-image-license-popup', ($root=trailingslashit(plugin_dir_url(__FILE__)) . 'assets/') . 'loader.js', ['jquery'], $this::VERSION);

        wp_localize_script('confirm-image-license-popup', 'ConfirmImageLicensePopup', [
            'root' => $root,
            'i18n' => [
                'confirm' => __('Are you sure you want to upload this file? By continuing you agree that licensing of the file allows public sharing on our platform.', 'confirm-image-license-popup'),
                'continue' => __('Continue', 'confirm-image-license-popup'),
                'confirm2' => __('I confirm the images I upload are copyright free and i have the full rights to use them.', 'confirm-image-license-popup'),
            ], 
        ]);
    }
}

add_action('plugins_loaded', [new ConfirmImageLicensePopup, 'init']);
