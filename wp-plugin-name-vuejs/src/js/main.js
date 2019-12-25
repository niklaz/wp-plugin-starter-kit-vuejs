import Vue from 'vue'


let mainElement = '#wp-plugin-name-vuejs-app';

require('./components/bootstrap')

Vue.prototype.wpPluginNameVueJsVueData = window.wpPluginNameVueJsVueData;



if( document.getElementById(mainElement) !== null ){
    var wp_plugin_name_vuejs_app = new Vue({

        el: '#wp-plugin-name-vuejs-app',
        data: {
            // window : window,
        },
        mounted(){

        },




    }); //initialize  vuejs
}