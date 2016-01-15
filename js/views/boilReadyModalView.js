define([
    'backbone',
    'models/kettleModel',
    'text!../templates/boil-ready-modal.html'

], function(Backbone, Model, myTemplate){

    var boilReadyView = Backbone.View.extend({

        tagName: 'div',

        template: _.template(myTemplate),

        events: {
            'click .close': 'remove'
        },

        initialize: function(){
            this.render();
            return this;
        },

        render: function(){
            this.$el.html(this.template({name: this.model.name}));
            this.$el.appendTo('#popup');
            setTimeout(function(){
                this.remove()
            }.bind(this), 5000);
            return this
        }
    });

    return boilReadyView;

});