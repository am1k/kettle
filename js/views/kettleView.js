define([
    'backbone',
    'text!../templates/kettle.html'

], function(Backbone, mainTemplate){

    var MainView = Backbone.View.extend({

        el: '.main',

        bindings: {
            '.button-temperature input': {
                events: ['change'],
                observe: 'targetDegree',
                update: function($els, val){
                    $els.filter(':checked').attr('checked', false);
                }
            },
            '#current-temperature': {
                observe: 'degree'
            },
            '#start': {
                attributes: [{
                    name: 'disabled',
                    observe: ['powerOn', 'targetDegree'],
                    onGet: function(values){
                        return (!values[0] && !values[1])
                    }
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
            this.render();
            return this;
        },

        applyModel: function(model){
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