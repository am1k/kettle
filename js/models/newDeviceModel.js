define(['backbone', '../api'], function(Backbone, api) {


    var ModelDevice = Backbone.Model.extend({

        defaults: {},

        addDevice: function(){
            api.emit('addDevice', JSON.stringify({
                companyId: this.get('companyId'),
                name: this.get('name')
            }));
        }
    });

    return ModelDevice

});