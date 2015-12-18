define([
    'backbone',
    'text!../templates/list-kettles.html',
    '../collections/mainCollection'
], function(Backbone, mainTemplate){

    var MainView = Backbone.View.extend({

        tagName: 'div',

        className: 'list-kettles',

        bindings: {
            '.class': {
                attributes: [{
                    name: 'class',
                    observe: 'active',
                    onGet: function (val) {
                        console.log(val);
                        return val ? 'active' : ''
                    }
                }]
            }
        },

        template: _.template(mainTemplate),

        initialize: function(){
            this.render();
            this.listenTo(this.model, 'change', function(){
                console.log(this.model)
            });
            return this;
        },

        render: function(){
            console.log(this.model);
            this.$el.html(this.template(this.model.toJSON() ));
            this.stickit(this.model, this.bindings);
            return this;
        }

    });

    return MainView;

});