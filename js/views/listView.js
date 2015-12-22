define([
    'backbone',
    'text!../templates/list-kettles.html',
    '../collections/mainCollection'
], function(Backbone, mainTemplate){

    var MainView = Backbone.View.extend({

        tagName: 'li',

        className: 'list-kettles',

        bindings: {
            ':el': {
                attributes: [{
                    name: 'class',
                    observe: 'active',
                    onGet: function (val) {
                        return val ? 'active' : ''
                    }
                }]
            }
        },

        template: _.template(mainTemplate),

        initialize: function(){
            this.render();
            return this;
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON() ));
            this.stickit(this.model, this.bindings);
            return this;
        }

    });

    return MainView;

});