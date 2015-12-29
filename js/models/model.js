define(['backbone', '../api'], function(Backbone, api) {

    var MainModel = Backbone.Model.extend({
        defaults: {
            deviceName: ''
        },

        boil: function(){
            if(this.get('degree') < this.get('targetDegree')){
                api.emit('boil', JSON.stringify({
                    _id: this.get('_id'),
                    targetDegree: this.get('targetDegree'),
                    isCold: this.get('powerOn')
                }));
            }
        }
    });

    return MainModel;

});

