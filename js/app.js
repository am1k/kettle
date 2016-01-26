require.config({
    baseUrl: 'js',
    paths:{
        jquery: 'lib/jquery-2.1.4.min',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        text: 'lib/text',
        stickit: 'lib/backbone.stickit',
        socketio: 'lib/socket.io-1.2.0',
        i18n: 'lib/i18n'
    },

    shim: {
        'jquery': {
            exports: 'jQuery'
        }
    }

});

requirejs([
    './main',
    'stickit'
    ],
    function(App){
       new App();
    }
);
