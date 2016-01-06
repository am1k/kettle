define([
    'backbone',
    'text!../templates/list-kettles.html'
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
                }, {
                    name: 'class',
                    observe: 'boiled',
                    onGet: function (val) {
                        console.log(val);
                        return val ? 'boil' : ''
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
            this.$el.html(this.template( this.model.toJSON() ));
            this.stickit(this.model, this.bindings);
        }
    });

    return MainView;

});