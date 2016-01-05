define(['backbone', '../api'], function(Backbone, api) {


    var ModelDevice = Backbone.Model.extend({

        defaults: {
        },

        sendName: function(){
            var device = this.get('deviceName');
            api.emit('addDevice', device);
        }
    });

    return ModelDevice

});