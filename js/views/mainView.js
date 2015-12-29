define([
    'backbone',
    'text!../templates/mainTemplate.html',
    './listItemView',
    './kettleView',
    '../models/userModel',
    './buyView',
    './addButton',
    '../collections/mainCollection'
], function(Backbone, mainTemplate, ListView, KettleView,UserModel, BuyView, AddButton, MainCollection){

    var MainView = Backbone.View.extend({

        model: new UserModel,

        collection: new MainCollection,

        template: _.template(mainTemplate),

        initialize: function(opts){
            var kettleView;
            this.$el.html(this.template());
            this.$el.appendTo('#application');
            this.listenToOnce(this.model, 'change:_id', function(){
                this.collection.fill(opts.currentId);
            });
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'reset', function(){
                console.log(555)
                this.collection.each(this.addOne);
                if(this.model.get('free')){
                    this.renderBuyButton();
                }
                if(this.model.get('free') && this.model.get('kettles') <= 3 || !this.model.get('free') ){
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
            view.$el.appendTo('#aside');
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