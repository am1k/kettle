define([
    'backbone',
    'text!../templates/kettle.html'
], function(Backbone, mainTemplate){

    var MainView = Backbone.View.extend({

        el: '.main',

        bindings: {
            '.button-temperature input': {
                observe: 'targetDegree',
                onGet: function(val){
                    console.log(val);
                }
            },
            '#current-temperature': {
                observe: 'degree'
            },
            '#start': {
                attributes: [{
                    name: 'disabled',
                    observe: 'powerOn'
                }]
            },
            '#scale': {
                attributes: [{
                    name: 'style',
                    observe: 'waterLevel',
                    onGet: function(val){
                        return 'height:' +  val + '%';
                    }
                }]
            }
        },

        events: {
            'click #start' : 'turnOn'
        },

        template: _.template(mainTemplate),

        initialize: function(){
            console.log(this.model);
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