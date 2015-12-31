define([
    'backbone',
    'text!../templates/kettle.html'
], function(Backbone, mainTemplate){

    var MainView = Backbone.View.extend({

        el: '.main',

        bindings: {
            '.button-temperature input': {
                observe: 'targetDegree'
            },
            '#current-temperature': {
                observe: 'degree'
            },
            '#start': {
                attributes: [{
                    name: 'disabled',
                    observe: 'powerOn'
                }]
            }
        },

        events: {
            'click #start' : 'turnOn'
        },

        template: _.template(mainTemplate),

        initialize: function(){
            this.render();
            return this;
        },

        applyModel: function(model){
            this.model && this.unstickit(this.model, this.bindings);
            this.model = model;
            this.stickit(this.model, this.bindings);
        },

        render: function(){
            this.$el.html(this.template());
            return this;
        },

        turnOn: function(){
            this.model.boil();
        }
    });

    return MainView;

});