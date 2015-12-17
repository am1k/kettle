define(['jquery', 'backbone', '../models/model', '../api', '../eventAggregator'], function($, Backbone, MainModel, api, eventAggregator){

    var mainCollection = Backbone.Collection.extend({

        model: MainModel,
        initialize: function(){
            api.on('change', function(data){
                data = JSON.parse(data);
                console.log(data);
                this.currentModel.set(data.name, data.value);
            }.bind(this));

            this.listenTo(eventAggregator, 'currentId', function(id){
                this.setActive(id);
            });
        },
        fill: function(id){
            api.emit('getKettles');
            api.once('getKettles', function(data){
                this.reset(JSON.parse(data));
            }.bind(this));

            this.on('reset', function(){
                this.setActive(id);
            });
        },
        setActive: function(id){
            var model;

            if(!id){
                model = this.at(0);
            }else{
                model = this.findWhere({id: id})
            }

            console.log(id, model);
            api.emit('changeKettle', id);

            this.trigger('setActive', model);

            this.currentModel = model;

        }

    });

    return mainCollection;
});