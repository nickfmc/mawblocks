<?php
// Block registration file.

function maw_register_blocks() {
    // Get enabled blocks from settings
    $options = get_option( 'maw_settings', array() );
    $enabled_blocks = array_keys( array_filter( $options ) );

    // Define all available blocks
    $all_blocks = array(
        'block-one' => 'Block One',
        'block-two' => 'Block Two',
        // Add more blocks as needed
    );

    // Register the editor styles once for all blocks
    wp_register_style(
        'maw-editor-styles',
        MAW_PLUGIN_URL . '/src/blocks/components/spacing-controls.css',
        array('wp-components'),
        filemtime(MAW_PLUGIN_PATH . '/src/blocks/components/spacing-controls.css')
    );

    foreach ( $enabled_blocks as $block_name ) {
        if ( isset( $all_blocks[ $block_name ] ) ) {
            // Enqueue block scripts
            wp_register_script(
                'maw-' . $block_name,
                MAW_PLUGIN_URL . 'build/' . $block_name . '.js',
                array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
                filemtime( MAW_PLUGIN_PATH . 'build/' . $block_name . '.js' )
            );

            // Register the block with both script and style
            register_block_type( 'maw/' . $block_name, array(
                'editor_script' => 'maw-' . $block_name,
                'editor_style'  => 'maw-editor-styles',
            ) );
        }
    }
}
add_action( 'init', 'maw_register_blocks' );
