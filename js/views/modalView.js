define([
    'backbone',
    '../models/model',
    '../models/modelDevice',
    'text!../templates/modal-add.html'

], function(Backbone, MainModel, ModelDevice, myTemplate){

    var ModalView = Backbone.View.extend({

        tagName: 'div',

        className: 'wrapper-modal',

        model: new ModelDevice,

        template: _.template(myTemplate),

        bindings: {
            ':text': {
                events: ['keyup'],
                observe: 'deviceName'
            },
            '#close': {
                attributes: [{
                    name: 'disabled',
                    observe: 'deviceName',
                    onGet: function(val){
                        return !val;
                    }
                }]
            }
        },

        events: {
            'click #close': 'submit'
        },

        initialize: function(){
            this.render();
            return this;
        },

        render: function(){
            this.$el.html(this.template());
            this.$el.appendTo('#popup');
            this.stickit(this.model, this.bindings);
            return this
        },

        submit: function(){
            this.model.sendName();
            this.remove();
        }
    });

    return ModalView;

});