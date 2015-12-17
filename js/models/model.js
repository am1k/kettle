define(['backbone', '../api'], function(Backbone, api) {

    var MainModel = Backbone.Model.extend({
        defaults: {

        },
        boil: function(){
            if(this.get('degree') < this.get('targetDegree')){
                api.emit('boil', JSON.stringify({
                    id: this.get('id'),
                    targetDegree: this.get('targetDegree'),
                    isCold: this.get('powerOn')
                }));
            }
        }
    });

    return MainModel;

});

