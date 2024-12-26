<?php
function maw_register_blocks() {
    $options = get_option('maw_settings', array());
    $enabled_blocks = array_keys(array_filter($options));

    $all_blocks = array(
        'block-one' => 'Block One',
        'responsive-tables' => 'MAW Tables',
        // Add more blocks as needed
    );

    // Register the editor styles once for all blocks
    $editor_style_path = MAW_PLUGIN_PATH . '/src/blocks/components/spacing-controls.css';
    if (file_exists($editor_style_path)) {
        wp_register_style(
            'maw-editor-styles',
            MAW_PLUGIN_URL . '/src/blocks/components/spacing-controls.css',
            array('wp-components'),
            filemtime($editor_style_path)
        );
    }

foreach ($enabled_blocks as $block_name) {
    if (isset($all_blocks[$block_name])) {
        // Check if JS file exists before registering
        $js_path = MAW_PLUGIN_PATH . 'build/maw-' . $block_name . '.js';  // Add 'maw-' prefix
        if (file_exists($js_path)) {
            wp_register_script(
                'maw-' . $block_name,
                MAW_PLUGIN_URL . 'build/maw-' . $block_name . '.js',  // Add 'maw-' prefix
                array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'),
                filemtime($js_path)
            );
        }

        // Check if CSS file exists before registering
        $css_path = MAW_PLUGIN_PATH . 'build/maw-' . $block_name . '.css';  // Add 'maw-' prefix
        if (file_exists($css_path)) {
            wp_register_style(
                'maw-' . $block_name,
                MAW_PLUGIN_URL . 'build/maw-' . $block_name . '.css',  // Add 'maw-' prefix
                array(),
                filemtime($css_path)
            );
        }

        // Rest of your code remains the same...

            // Register the block with available assets
            $block_args = array(
                'editor_script' => file_exists($js_path) ? 'maw-' . $block_name : null,
                'editor_style'  => file_exists($editor_style_path) ? 'maw-editor-styles' : null,
                'style'         => file_exists($css_path) ? 'maw-' . $block_name : null,
            );
            

            // Remove null values from array
            $block_args = array_filter($block_args);

            register_block_type('maw/' . $block_name, $block_args);
        }
    }
}
add_action('init', 'maw_register_blocks');
