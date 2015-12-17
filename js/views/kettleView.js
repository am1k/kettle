define([
    'backbone',
    'text!../templates/kettle.html'
], function(Backbone, mainTemplate){

    var MainView = Backbone.View.extend({

        el: '#main',

        bindings: {
            '.button-temperature input': {
                observe: 'targetDegree'
            },
            '#current-temperature': {
                observe: 'degree'
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
            console.log(model);
            this.model && this.unstickit(this.model, this.bindings);
            this.model = model;
            this.waterLevel();
            this.listenTo(this.model, 'change', function(){
                if(this.model.get('powerOn') == true) {
                    $('.temperature').attr('disabled', 'disabled')
                } else {
                    $('.temperature').removeAttr('disabled')
                }
            });
            this.stickit(this.model, this.bindings);
        },

        render: function(){
            this.$el.html(this.template());
            return this;
        },

        turnOn: function(){
            this.model.boil();
        },

        waterLevel: function(){
            $('#scale').css('height', this.model.get('waterLevel') + 'px');
        }

    });

    return MainView;

});