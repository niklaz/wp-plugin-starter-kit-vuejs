<?php
/**
 * Plugin Name:     WP Plugin Name VueJs
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     PLUGIN DESCRIPTION HERE
 * Author:          YOUR NAME HERE
 * Author URI:      YOUR SITE HERE
 * Text Domain:     wp-plugin-name-vuejs
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         WPPluginNameVueJS
 */

// Your code starts here.

// Protect from the direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit( "You're not allowed to access this file directly." );// Exit if accessed directly
}


// path to the plugin
define( 'WP_PLUGIN_NAME_VUEJS_DIR_PATH', plugin_dir_path(__FILE__ ) );
define( 'WP_PLUGIN_NAME_VUEJS_PATH', plugin_dir_url(__FILE__ ) );
define( 'WP_PLUGIN_NAME_VUEJS_MAIN_FILE', __FILE__  );
define( 'WP_PLUGIN_NAME_VUEJS_VERSION', '0.1.0' );
define( 'WP_PLUGIN_NAME_VUEJS_ENV', 'production' ); //set production to get minified assets, must minify assets first!
define( 'WP_PLUGIN_NAME_VUEJS_HANDLE_PREFIX', 'wp_plugin_name_vuejs' );



require_once WP_PLUGIN_NAME_VUEJS_DIR_PATH . '/includes/bootstrap.php';

