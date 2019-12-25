<?php


namespace WPPluginNameVueJS;


class Plugin {


	private $handlePrefix;
	private $pluginVersion;
	private $environment;
	private $pluginPath;


	public function __construct() {

		$this->prefix = WP_PLUGIN_NAME_VUEJS_HANDLE_PREFIX;
		$this->environment = WP_PLUGIN_NAME_VUEJS_ENV;
		$this->pluginPath = WP_PLUGIN_NAME_VUEJS_PATH;
		$this->pluginVersion = WP_PLUGIN_NAME_VUEJS_VERSION;

	}

	public function run(){
		$this->actions();
		$this->adminActions();
	}


	public function actions(){
		add_action( 'enqueue_scripts', [ $this, 'enqueue' ] );
	}
	public function adminActions(){
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueueAdmin' ] );
	}

	public function enqueue(){



		if( 'production' !== $this->environment ){

			wp_register_style( $this->handlePrefix . '_main_style', $this->pluginPath . 'assets/css/main.css', false, $this->pluginVersion );

			wp_enqueue_style( $this->handlePrefix . '_main_style' );

			wp_enqueue_script( $this->handlePrefix . '_main_script', $this->pluginPath . 'assets/js/main.js', [], $this->pluginVersion );
		}else{
			wp_register_style( $this->handlePrefix . '_main_style', $this->pluginPath . 'assets/css/main.min.css', false, $this->pluginVersion );

			wp_enqueue_style( $this->handlePrefix . '_main_style' );

			wp_enqueue_script( $this->handlePrefix . '_main_script', $this->pluginPath . 'assets/js/main.min.js', [], $this->pluginVersion ); //todo, minify assets
		}

	}

	public function enqueueAdmin(){
		if( 'production' !== $this->environment ){
			wp_enqueue_script( $this->handlePrefix . '_admin_script', $this->pluginPath . 'assets/js/admin.js', [], $this->pluginVersion );
		}else{
			wp_enqueue_script( $this->handlePrefix . '_admin_script', $this->pluginPath . 'assets/js/admin.min.js', [], $this->pluginVersion ); //todo minify assets
		}

	}
}