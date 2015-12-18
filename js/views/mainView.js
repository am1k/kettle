define([
    'backbone',
    'text!../templates/mainTemplate.html',
    '../models/model',
    './listView',
    './kettleView',
    '../collections/mainCollection'
], function(Backbone, mainTemplate, MainModel, ListView, KettleView, MainCollection){

    var MainView = Backbone.View.extend({

        model: new MainModel,

        collection: new MainCollection,

        template: _.template(mainTemplate),

        initialize: function(opts){
            var kettleView;
            var self = this;
            this.$el.html(this.template());
            var docFrag = document.createDocumentFragment();
            this.collection.fill(opts.currentId);
            this.collection.on('reset', function(){
                self.collection.forEach(function(model){
                    docFrag.appendChild((new ListView({model: model})).$el[0])
                });
                self.$el.find('#aside').append(docFrag);
            });
            this.listenTo(this.collection, 'setActive', function(model){
                !kettleView && (kettleView = new KettleView());
                console.log(model);
                kettleView.applyModel(model);
            });
            return this;
        }

    });

    return MainView;

});