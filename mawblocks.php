<?php
/*
Plugin Name: Custom Gutenberg Blocks
Description: A collection of custom Gutenberg blocks with an admin interface to enable or disable them.
Version: 1.0.0
Author: Your Name
Text Domain: custom-gutenberg-blocks
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Define Plugin Constants
define( 'MAW_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'MAW_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// Include necessary files
require_once MAW_PLUGIN_PATH . 'includes/admin-settings.php';
require_once MAW_PLUGIN_PATH . 'includes/register-blocks.php';