define(['jquery', 'backbone', '../models/kettleModel', '../api', '../eventAggregator', '../views/boilReadyModalView'],
    function($, Backbone, KettleModel, api, eventAggregator, boilReadyModalView){

    var mainCollection = Backbone.Collection.extend({
        model: KettleModel,
        initialize: function(){
            api.on('change', function(data){
                data = JSON.parse(data);
                console.log(data);
                this.currentModel.set(data.name, data.value);
            }.bind(this));

            api.on('boiled', function(data){
                data = JSON.parse(data);
                new boilReadyModalView({model: data})
            }.bind(this));

            api.on('addDevice', function(data){
                console.log(JSON.parse(data));
                this.add(JSON.parse(data));
                if(this.length === 1){
                    this.setActive();
                }
            }.bind(this));

            this.listenTo(eventAggregator, 'currentId', function(id){
                this.setActive(id);
            });
        },
        fill: function(id, companyId){
            api.emit('getKettles', companyId);
            api.once('getKettles', function(data){
                this.reset(JSON.parse(data));
            }.bind(this));

            this.on('reset', function(){
                this.setActive(id);
            });
        },

        setActive: function(id){
            var model = id ? this.findWhere({_id: id}) : this.at(0);

            if(!model){
                model = this.at(0);
                if(!model){
                    return;
                }
            }
            api.emit('changeKettle', model.get('_id'));

            api.once('changeKettle', function(data){
                if(data !== null){
                    model.set(JSON.parse(data));
                }
            });

            this.trigger('setActive', model);

            model.set('active', true);

            if(this.currentModel !== undefined) {
                this.currentModel.set('active', false);
            }

            this.currentModel = model;

        }

    });

    return mainCollection;
});