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









<div class="maw-card maw-demo-section">
    <h2>Responsive Table Modes</h2>
    <p class="maw-description">Examples of how your tables will display in different responsive modes:</p>

    <div class="maw-demo-grid">
        <!-- Horizontal Scroll Demo -->
        <div class="maw-demo-item">
            <h3>Horizontal Scroll</h3>
            <div class="maw-demo-preview">
                <div class="table-container scroll">
                    <table class="wp-block-table">
                        <thead>
                            <tr>
                                <th>Header 1</th>
                                <th>Header 2</th>
                                <th>Header 3</th>
                                <th>Header 4</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Data 1</td>
                                <td>Data 2</td>
                                <td>Data 3</td>
                                <td>Data 4</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <p>Tables scroll horizontally on smaller screens</p>
        </div>

        <!-- Card View Demo -->
        <div class="maw-demo-item">
            <h3>Card View</h3>
            <div class="maw-demo-preview">
                <div class="table-container cards">
                    <div class="mobile-card">
                        <div class="card-row">
                            <span class="card-label">Header 1:</span>
                            <span class="card-value">Data 1</span>
                        </div>
                        <div class="card-row">
                            <span class="card-label">Header 2:</span>
                            <span class="card-value">Data 2</span>
                        </div>
                    </div>
                </div>
            </div>
            <p>Data displays as individual cards</p>
        </div>

        <!-- Stack Rows Demo -->
        <div class="maw-demo-item">
            <h3>Stack Rows</h3>
            <div class="maw-demo-preview">
                <div class="table-container stack">
                    <div class="stacked-row">
                        <div class="stack-label">Header 1:</div>
                        <div class="stack-value">Data 1</div>
                    </div>
                    <div class="stacked-row">
                        <div class="stack-label">Header 2:</div>
                        <div class="stack-value">Data 2</div>
                    </div>
                </div>
            </div>
            <p>Rows stack vertically with labels</p>
        </div>

        <!-- Stack Columns Demo -->
        <div class="maw-demo-item">
            <h3>Stack Columns</h3>
            <div class="maw-demo-preview">
                <div class="table-container list">
                    <div class="column-stack">
                        <div class="column-header">Header 1</div>
                        <div class="column-data">Data 1</div>
                        <div class="column-data">Data 2</div>
                    </div>
                </div>
            </div>
            <p>Columns stack vertically</p>
        </div>

        <!-- Chart View Demo -->
        <div class="maw-demo-item">
            <h3>Chart View</h3>
            <div class="maw-demo-preview">
                <div class="chart-view-table">
                    <div class="chart-main-header">Sales Data</div>
                    <div class="chart-column">
                        <div class="chart-header">Monthly Sales</div>
                        <div class="chart-bar">January: $1000</div>
                        <div class="chart-bar">February: $1500</div>
                        <div class="chart-bar">March: $2000</div>
                    </div>
                </div>
            </div>
            <p>Displays data in a visual chart format</p>
        </div>
        
    </div>
</div>

<style>
.maw-demo-section {
    margin-top: 30px;
    padding: 20px;
}

.maw-demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.maw-demo-item {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
}

.maw-demo-preview {
    background: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 15px;
    margin: 10px 0;
    min-height: 150px;
    overflow: hidden;
}

/* Demo-specific styles */
.chart-bar {
    background: #007cba;
    color: white;
    padding: 5px 10px;
    margin: 5px 0;
    border-radius: 3px;
}

.card-row, .stacked-row {
    padding: 8px;
    border-bottom: 1px solid #ddd;
}

.card-label, .stack-label {
    font-weight: bold;
    margin-right: 10px;
}

.column-header {
    background: #007cba;
    color: white;
    padding: 8px;
    margin-bottom: 5px;
}

.column-data {
    padding: 8px;
    border-bottom: 1px solid #ddd;
}


.maw-demo-section {
    margin-top: 30px;
    padding: 20px;
}

.maw-demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.maw-demo-item {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
}

.maw-demo-preview {
    background: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 15px;
    margin: 10px 0;
    min-height: 150px;
    overflow: hidden;
}

/* Chart View Demo styles */
.chart-view-table {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.chart-main-header {
    font-weight: bold;
    margin-bottom: 10px;
}

.chart-column {
    margin-bottom: 10px;
}

.chart-header {
    background: #007cba;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-weight: bold;
    margin-bottom: 5px;
}

.chart-bar {
    background: #007cba;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    margin: 5px 0;
    transition: transform 0.2s ease;
}

.chart-bar:hover {
    transform: translateX(5px);
}

/* Other demo styles */
.card-row, .stacked-row {
    padding: 8px;
    border-bottom: 1px solid #ddd;
}

.card-label, .stack-label {
    font-weight: bold;
    margin-right: 10px;
}

.column-header {
    background: #007cba;
    color: white;
    padding: 8px;
    margin-bottom: 5px;
}

.column-data {
    padding: 8px;
    border-bottom: 1px solid #ddd;
}

</style>






















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
