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



function maw_enqueue_block_editor_assets() {
    wp_enqueue_style(
        'maw-block-editor-styles',
        MAW_PLUGIN_URL . 'includes/maw-editor-styles.css',
        array(),
        filemtime(MAW_PLUGIN_PATH . 'includes/maw-editor-styles.css')
    );
}
add_action('enqueue_block_editor_assets', 'maw_enqueue_block_editor_assets');


// enable shortcodes in the table block
function process_table_shortcodes($block_content, $block) {
    if ($block['blockName'] === 'maw/responsive-tables') {
        return do_shortcode($block_content);
    }
    return $block_content;
}
add_filter('render_block', 'process_table_shortcodes', 10, 2);
// END enable shortcodes in the table block

//simple shortcode to display the current year
function maw_current_year() {
    return date('Y');
}
add_shortcode('current_year', 'maw_current_year');
// END simple shortcode to display the current year
