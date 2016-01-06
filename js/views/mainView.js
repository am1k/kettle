define([
    'backbone',
    'text!../templates/mainTemplate.html',
    './listItemView',
    './kettleView',
    '../models/userModel',
    './buyView',
    './addButton',
    '../collections/mainCollection'
], function(Backbone, mainTemplate, ListView, KettleView,userModel, BuyView, AddButton, MainCollection){

    var MainView = Backbone.View.extend({

        model: userModel,

        collection: new MainCollection,

        template: _.template(mainTemplate),

        initialize: function(opts){
            console.log(opts.currentId);
            var kettleView;
            this.$el.html(this.template());
            this.$el.appendTo('#application');
            this.model.login().then(function(){
                this.collection.fill(opts.currentId);
            }.bind(this));
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'reset', function(){
                this.collection.each(this.addOne);
                console.log(this.model);
                if(this.model.get('free') && (this.model.get('admin') == true)){
                    this.renderBuyButton();
                }
                if((this.model.get('free') && (this.model.get('admin') == true)) && this.model.get('kettles') <= 3 || !this.model.get('free') ){
                    this.renderAddButton();
                }
            });
            this.listenTo(this.collection, 'setActive', function(model){
                !kettleView && (kettleView = new KettleView());
                kettleView.applyModel(model);
            });

            return this;
        },

        addOne: function(model){
            var view = new ListView({model: model});
            view.$el.appendTo('.kettles');
        },

        renderBuyButton: function(){
            var view = new BuyView();
            view.$el.appendTo('.sub-header');
        },

        renderAddButton: function(){
            var view = new AddButton({
                model: this.model
            });
            view.$el.appendTo('.navigation');
        }

    });

    return MainView;

});