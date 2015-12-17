/**
 * Created by v.bogoroditskiy on 12/14/2015.
 */
define(['socketio'], function(io){
    'use strict';
    var socket = io.connect('http://localhost:3000');

    return socket;
});