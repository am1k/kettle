define([
    'backbone',
    'text!../templates/mainTemplate.html',
    'text!../templates/modal-add.html',
    'text!../templates/modal-buy.html',
    '../models/model',
    './listView',
    './kettleView',
    '../collections/mainCollection'
], function(Backbone, mainTemplate, modalAdd, modalBuy, MainModel, ListView, KettleView, MainCollection){

    var MainView = Backbone.View.extend({

        model: new MainModel,

        collection: new MainCollection,

        template: _.template(mainTemplate),

        events: {
            'click .add' : 'addName',
            'click .properties': 'buyKey',
            'click #close': 'submit'
        },

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
                kettleView.applyModel(model);
            });
            return this;
        },

        addName: function(e){
            e.preventDefault();
            this.$el.find('#popup').append(modalAdd);
        },

        buyKey: function(e){
            e.preventDefault();
            this.$el.find('#popup').append(modalBuy);
        },

        submit: function(){

            console.log(222);
            this.$el.find('.wrapper-modal').remove();
        }

    });

    return MainView;

});