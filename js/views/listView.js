define([
    'backbone',
    'text!../templates/list-kettles.html',
    '../collections/mainCollection'
], function(Backbone, mainTemplate){

    var MainView = Backbone.View.extend({

        tagName: 'div',

        className: 'list-kettles',

        template: _.template(mainTemplate),

        initialize: function(){
            this.render();
            return this;
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON() ));
            return this;
        }

    });

    return MainView;

});