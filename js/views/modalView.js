define([
    'backbone',
    'models/newDeviceModel',
    'text!../templates/modal-add.html'

], function(Backbone, Model, myTemplate){

    var ModalView = Backbone.View.extend({

        template: _.template(myTemplate),

        bindings: {
            ':text': {
                events: ['keyup'],
                observe: 'name'
            },
            '#add': {
                attributes: [{
                    name: 'disabled',
                    observe: 'name',
                    onGet: function(val){
                        return !val;
                    }
                }]
            }
        },

        events: {
            'click #add': 'addDevice',
            'click .close': 'remove'
        },

        initialize: function(opts){
            this.model = new Model({
                companyId: opts.companyId
            });

            this.render();
            return this;
        },

        render: function(){
            this.$el.html(this.template());
            this.$el.appendTo('#popup');
            this.stickit(this.model, this.bindings);
            return this
        },

        addDevice: function(e){
            e.preventDefault();
            this.model.addDevice();
            this.remove();
        }

    });

    return ModalView;

});