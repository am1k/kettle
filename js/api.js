define(['socketio'], function(io){
    'use strict';

    // установка связи и запись токена в localStorage
    var socket = io.connect('http://localhost:3000', {query: 'token=' + (localStorage.getItem('kettleToken') || '')});

    return socket;
});