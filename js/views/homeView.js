define([
    'backbone',
    'text!../templates/main-page.html'

], function(Backbone, mainTemplate){

    Backbone.View.prototype.close = function(){
        this.unstickit(this.model, this.bindings);
        this.remove();
    };

    var MainPage = Backbone.View.extend({

        className: 'application-view',

        template: _.template(mainTemplate),


        initialize: function(){
           this.render();
           return this;
        },

        render: function(){
           this.$el.html(this.template());
        }

    });
   return MainPage;
});