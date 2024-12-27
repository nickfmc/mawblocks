<?php
function maw_register_blocks() {
    $options = get_option('maw_settings', array());
    $enabled_blocks = array_keys(array_filter($options));

    $all_blocks = array(
        // 'block-one' => 'Block One',
        'responsive-tables' => 'MAW Tables',
        // Add more blocks as needed
    );





    foreach ($enabled_blocks as $block_name) {
        if (isset($all_blocks[$block_name])) {
            // Path to block.json
            $block_json_path = MAW_PLUGIN_PATH . 'src/' . $block_name . '/block.json';
            
            if (file_exists($block_json_path)) {
                register_block_type(
                    MAW_PLUGIN_PATH . 'src/' . $block_name
                );
            }
        }
    }
}
add_action('init', 'maw_register_blocks');