# wp-plugin-starter-kit-vuejs

Starter kit for building WordPress plugin with VueJS, with namespaces through composer's autoloader, optionally npm, webkit and gulp to compile scss and sourced js.

### Prerequisites

- Installed composer - dependency manager for PHP - https://getcomposer.org/
- Installed latest nodejs along with npm  


### Plugin setup

- Use git clone and download the content by running: 
`git clone https://github.com/niklaz/wp-plugin-starter-kit-vuejs.git`
or manually download zip file and unpack in your WordPress plugins directory. 

- Do the appropriate renaming and find and replace for the strings: 

    1. Rename plugin folder name from `wp-plugin-name-vuejs` to something else
    
    2. Rename main plugin file from 'wp-plugin-name-vuejs.php' to something else
    
    3. Search and replace appropriate WordPress plugin meta in main plugin file: 
    
    ```
    /**
     * Plugin Name:     WP_PLUGIN_NAME_VUEJS
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
     ``` 
    iv. Find and replace following strings in files: 
    
    - `WP_PLUGIN_NAME_VUEJS`
    - `WPPluginNameVueJS`
    - `wp-plugin-name-vuejs`
    - `WP_PLUGIN_NAME_VUEJS`
    
    v. In composer.json find and replace main plugin namespace mapping `WPPluginNameVueJS`: 
    
    ```
      "autoload": {
        "psr-4": {
          "WPPluginNameVueJS\\": "includes/"  
        }
      },
    ```
    
    **important:** after renaming autoload.psr-4 namespace mapping you need to run: `composer dumpautoload`


#####Using composer

Plugin starter kit has generated autoload through composer. 
If you want change the top-level namespace name from `WPPluginNameVueJS` to something else, 
or if you change the base for your plugin's classes from `includes`, run `composer dumpautoload`
  
To install new composer packages, or update existing, visit https://getcomposer.org/ for documentation

#####Installing node modules 

Run `npm install `

#####Running gulp tasks

There are several tasks but main is gulp watch. It compiles scss, js and minifies the css and js for production environment.


