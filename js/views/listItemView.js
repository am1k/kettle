define([
    'backbone',
    'underscore',
    'text!../templates/list-kettles.html'

], function(Backbone, _, mainTemplate){

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

        events: {
            'click .remove-btn': 'removeDevice'
        },

        template: _.template(mainTemplate),

        initialize: function(opts){
            this.render(opts.removeMode);
            this.listenTo(this.model, 'destroy', this.remove);
            return this;
        },

        render: function(removeMode){
            this.$el.html(this.template(_.extend( {remove: removeMode}, this.model.toJSON() ) ));
            this.stickit(this.model, this.bindings);
        },

        removeDevice: function(){
            this.model.removeKettle();
        }
    });

    return MainView;

});

