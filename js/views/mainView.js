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

        events: {
            'click #log-out': 'logOut'
        },

        initialize: function(opts){
            var kettleView;
            this.$el.html(this.template());
            this.$el.appendTo('#application');
            this.applyTranslation();
            this.collection.fill(opts.currentId, this.model.get('companyId'));
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'reset', function(){
                this.collection.each(this.addOne);
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

            this.listenTo(this.collection, 'deleteView', function(){
                if(kettleView){
                    kettleView.remove();
                    kettleView = null;
                }
            });

            return this;
        },

        translation: [
            {
                selector: '#device',
                field: 'device'
            },
            {
                selector: '#log-out',
                field: 'log-out'
            }
        ],

        addOne: function(model){
            var view = new ListView({model: model, removeMode: userModel.get('admin')});
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
        },

        logOut: function(){
            this.model.logOut();
        }


    });

    return MainView;

});