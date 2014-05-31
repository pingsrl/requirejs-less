requirejs-less
==============

AMD loader for less stylesheets
https://github.com/pingsrl/requirejs-less

Copyright (c) 2014 Ping Srl 
Released under MIT license

This plugin is based on [JF Paradis require-handlebars plugin](http://github.com/jfparadis/requirejs-handlebars) and allows you to import and compile less tempaltes into a requirejs application.

To work this library needs the text plugin for require and a less 
compiler (lessc)

### RequireJS configuration:
```
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
```

### Usage: 
```
require(
[   
    'less!master' // Load master.less file
],
function(){
    // The template is loaded
});
```

Currently it supports only one option "avoidReimport", if true the library
check if the stylesheed was already added to the DOM and ignore the request.

Thanks to [jrburke](http://stackoverflow.com/users/126372/jrburke) this code is based on its [stack overflow response](http://stackoverflow.com/questions/5889901/requirejs-and-less)

