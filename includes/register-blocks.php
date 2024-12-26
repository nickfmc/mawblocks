<?php
function maw_register_blocks() {
    $options = get_option('maw_settings', array());
    $enabled_blocks = array_keys(array_filter($options));

    $all_blocks = array(
        // 'block-one' => 'Block One',
        'responsive-tables' => 'MAW Tables',
        // Add more blocks as needed
    );

    // Register the GLOBAL Sidebar styles once for all blocks
    // $global_style_path = MAW_PLUGIN_PATH . '/src/blocks/shared/backend.css';
    // if (file_exists($global_style_path)) {
    //     wp_register_style(
    //         'maw-editor-styles',
    //         MAW_PLUGIN_URL . '/src/blocks/shared/backend.css',
    //         array('wp-components'),
    //         filemtime($global_style_path)
    //     );
    // }



foreach ($enabled_blocks as $block_name) {
    if (isset($all_blocks[$block_name])) {
        // Check if JS file exists before registering
        $js_path = MAW_PLUGIN_PATH . 'build/maw-' . $block_name . '.js';
        if (file_exists($js_path)) {
            wp_register_script(
                'maw-' . $block_name,
                MAW_PLUGIN_URL . 'build/maw-' . $block_name . '.js',
                array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'),
                filemtime($js_path)
            );
        }

      // Check if CSS file exists before registering
      $css_path = MAW_PLUGIN_PATH . 'build/style-maw-' . $block_name . '.css';  // Correct path
      if (file_exists($css_path)) {
          wp_register_style(
              'style-maw-' . $block_name, // Changed handle to match block_args
              MAW_PLUGIN_URL . 'build/style-maw-' . $block_name . '.css', // Changed URL to match file path
              array(),
              filemtime($css_path)
          );
      }

    //   check if block specific editor style exists before registering
    //   $editor_style_path = MAW_PLUGIN_PATH . 'build/maw-' . $block_name . '-editor.css';
    //   if (file_exists($editor_style_path)) {
    //       wp_register_style(
    //           'maw-' . $block_name . '-editor',
    //           MAW_PLUGIN_URL . 'build/maw-' . $block_name . '-editor.css',
    //           array('wp-edit-blocks'),
    //           filemtime($editor_style_path)
    //       );
    //   }
      
      




            // Register the block with available assets
            $block_args = array(
                'editor_script' => file_exists($js_path) ? 'maw-' . $block_name : null,
                // 'editor_style'  => file_exists($editor_style_path) ? 'maw-' . $block_name . '-editor' : null,
                
                'style'         => file_exists($css_path) ? 'style-maw-' . $block_name : null,
            );

            

            // Remove null values from array
            $block_args = array_filter($block_args);

            register_block_type('maw/' . $block_name, $block_args);
        }
    }
}
add_action('init', 'maw_register_blocks');
