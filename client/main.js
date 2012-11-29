/*global console:false */



requirejs.config({
   paths: {
        app: 'app',
        views: 'app/views',
        templates: 'app/templates',
        controllers: 'app/controllers',
        models: 'app/models',
        api: 'app/api',

        jquery: 'lib/jquery',
        bootstrap: 'lib/bootstrap',
        emberjs: 'lib/emberjs',
        connect: 'lib/connect',
        common: 'lib/common',
        requirejs: 'lib/requirejs',
    },
    shim: {
        'bootstrap': ['jquery'],
        'emberjs': ['jquery.'],
        'common': ['bootstrap'],
        'connect': ['common'],
    }
});

// requirejs([
//     'jquery/jquery',
//     'bootstrap'
// ]);


require([
    "jquery/jquery.min",
	"jquery/jquery.ui.min",
    'bootstrap/bootstrap.min',
    'connect/connect',
	// "app/core"
],function(){
	"use strict";
	
    console.log('Client application started');
});