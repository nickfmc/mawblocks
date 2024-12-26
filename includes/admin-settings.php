<?php



function maw_add_admin_menu() {
    add_menu_page(
        'Custom MAW Blocks',
        'MAW Blocks',
        'manage_options',
        'maw-blocks',
        'maw_options_page',
        'dashicons-block-default',
        30
    );
}
add_action('admin_menu', 'maw_add_admin_menu');

// Enqueue admin styles
function maw_admin_styles() {
    if (isset($_GET['page']) && $_GET['page'] === 'maw-blocks') {
        wp_enqueue_style('maw-admin-styles', plugins_url('assets/css/admin.css', __FILE__));
    }
}
add_action('admin_enqueue_scripts', 'maw_admin_styles');

function maw_settings_init() {
    register_setting('mawSettings', 'maw_settings');

    add_settings_section(
        'maw_section',
        '',  // Remove title as we'll handle it in the template
        'maw_settings_section_callback',
        'mawSettings'
    );

    $blocks = array(
        'block-one' => [
            'name' => 'Block One',
            'description' => 'A versatile content block for creating engaging layouts.',
            'icon' => 'layout'
        ],
        'responsive-tables' => [
            'name' => 'Block Two',
            'description' => 'Advanced gallery block with multiple display options.',
            'icon' => 'images-alt2'
        ],
    );

    foreach ($blocks as $block_id => $block_info) {
        add_settings_field(
            $block_id,
            $block_info['name'],
            'maw_block_checkbox_render',
            'mawSettings',
            'maw_section',
            array(
                'label_for' => $block_id,
                'block_id' => $block_id,
                'description' => $block_info['description'],
                'icon' => $block_info['icon']
            )
        );
    }
}
add_action('admin_init', 'maw_settings_init');

function maw_block_checkbox_render($args) {
    $options = get_option('maw_settings');
    ?>
    <div class="maw-block-card">
        <div class="maw-block-header">
            <span class="dashicons dashicons-<?php echo esc_attr($args['icon']); ?>"></span>
            <label class="maw-block-title" for="<?php echo esc_attr($args['block_id']); ?>">
                <?php echo esc_html($args['label_for']); ?>
            </label>
            <div class="maw-toggle-switch">
                <input type="checkbox" 
                       id="<?php echo esc_attr($args['block_id']); ?>"
                       name="maw_settings[<?php echo esc_attr($args['block_id']); ?>]" 
                       <?php checked(isset($options[$args['block_id']])); ?>
                       class="maw-toggle-checkbox">
                <label class="maw-toggle-label" for="<?php echo esc_attr($args['block_id']); ?>"></label>
            </div>
        </div>
        <p class="maw-block-description"><?php echo esc_html($args['description']); ?></p>
    </div>
    <?php
}

function maw_settings_section_callback() {
    // Section description is handled in the main template
}

function maw_options_page() {
    ?>
    <div class="wrap maw-admin-wrap">
        <div class="maw-header">
            <h1>
                <span class="dashicons dashicons-block-default"></span>
                MAW Blocks Dashboard
            </h1>
            <p class="maw-version">Version 1.0.0</p>
        </div>

        <div class="maw-admin-grid">
            <div class="maw-main-content">
                <div class="maw-card">
                    <h2>Block Management</h2>
                    <p class="maw-description">Enable or disable individual blocks to customize your editing experience.</p>
                    
                    <form action="options.php" method="post">
                        <?php
                        settings_fields('mawSettings');
                        do_settings_sections('mawSettings');
                        submit_button('Save Changes', 'primary maw-save-button');
                        ?>
                    </form>
                </div>
            </div>

            <div class="maw-sidebar">
                <div class="maw-card maw-help-card">
                    <h3>Need Help?</h3>
                    <ul>
                        <li><a href="#"><span class="dashicons dashicons-book"></span> Documentation</a></li>
                        <li><a href="#"><span class="dashicons dashicons-video-alt3"></span> Video Tutorials</a></li>
                        <li><a href="#"><span class="dashicons dashicons-admin-comments"></span> Support Forum</a></li>
                    </ul>
                </div>

                <div class="maw-card maw-pro-card">
                    <h3>Upgrade to Pro</h3>
                    <ul class="maw-pro-features">
                        <li><span class="dashicons dashicons-yes"></span> Additional Premium Blocks</li>
                        <li><span class="dashicons dashicons-yes"></span> Priority Support</li>
                        <li><span class="dashicons dashicons-yes"></span> Advanced Customization Options</li>
                    </ul>
                    <a href="#" class="button button-primary maw-upgrade-button">Upgrade Now</a>
                </div>
            </div>
        </div>
    </div>
    <?php
}
