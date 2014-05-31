/*
    AMD loader for less stylesheets
    https://github.com/pingsrl/requirejs-less
    
    Copyright (c) 2014 Ping Srl 
    Released under MIT license

    This plugin is based on JF Paradis require-handlebars plugin 
    http://github.com/jfparadis/requirejs-handlebars and allows you to
    import and compile less tempaltes into a requirejs application.

    To work this library needs the text plugin for require and a less 
    compiler (lessc)

    RequireJS configuration:
    var requireConfig = {
        paths: {
            text: 'libs/text',
            less: 'libs/less',
            lessc: 'libs/lessc'
        },
        less: {
            path: 'assets/styles/',
            avoidReimport: true
        }
    };
    
    Usage: 
    require(
    [   
        'less!master' // Load master.less file
    ],
    function(){
        // The template is loaded
    });

    Currently it supports only one option "avoidReimport", if true the library
    check if the stylesheed was already added to the DOM and ignore the request.

    Thanks to jrburke this code is based on its stack overflow response
    http://stackoverflow.com/questions/5889901/requirejs-and-less

*/

define(['text', 'lessc'], function (text, lessc) {
    'use strict';

    var buildMap = {};

    return {
        
        version: '0.1',

        load: function (moduleName, parentRequire, onload, config) {
            
            var path = (config.less && config.less.path) || 'styles/';
            var ext = (config.less && config.less.ext) || '.less';
            var avoidReimport = (config.less && config.less.avoidReimport) || true;

            if(avoidReimport && buildMap[moduleName]){
                onload(buildMap[moduleName]);
            }

            text.load(path + moduleName + ext, parentRequire, function (source) {
                
                var styleElem;
                var parser = new(less.Parser)({
                    filename: moduleName,
                });

                parser.parse(source, function (err, css) {
                    if (err) {
                        if (typeof console !== 'undefined' && console.error) {
                            console.error(err);
                        }
                    } else {
                        styleElem = document.createElement('style');
                        styleElem.type = 'text/css';

                        if (styleElem.styleSheet) {
                            styleElem.styleSheet.cssText = css.toCSS();
                        } else {
                            styleElem.appendChild( document.createTextNode( css.toCSS() ) );
                        }

                        document.getElementsByTagName("head")[0].appendChild( styleElem );

                        buildMap[moduleName] = styleElem;

                    }
                    onload(styleElem);
                });

            }, config);
        }
    };
});
