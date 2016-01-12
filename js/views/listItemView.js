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
                }, {
                    name: 'class',
                    observe: 'boil',
                    onGet: function(val){
                        return val ? 'boil' : ''
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
            this.listenTo(this.model, 'change:degree', this.boiled);
            this.listenTo(this.model, 'destroy', this.remove);
            return this;
        },

        render: function(removeMode){
            this.$el.html(this.template(_.extend( {remove: removeMode}, this.model.toJSON()  ) ));
            this.stickit(this.model, this.bindings);
        },

        boiled: function(){
            if(this.model.get('degree') == this.model.get('targetDegree')) {
                this.model.set('boil', true);
            }
            if(this.model.get('boil') == true){
                setTimeout(function(){
                    this.model.set('boil', false);
                }.bind(this), 5000);
            }
        },

        removeDevice: function(){
            this.model.removeKettle();
        }
    });

    return MainView;

});

