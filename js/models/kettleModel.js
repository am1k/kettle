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
        },

        removeKettle: function(){
            api.emit('remove', JSON.stringify({
                _id: this.get('_id'),
                companyId: this.get('companyId')
            }));

            api.once('remove', function(code){
                if(code > 0){
                    this.destroy();
                }
            }.bind(this));
        }
    });

    return MainModel;

});

