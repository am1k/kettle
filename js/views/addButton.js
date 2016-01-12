define([
    'backbone',
    '../views/modalView'

], function(Backbone, ModalView){

    var KeyView = Backbone.View.extend({

        tagName: 'button',

        className: 'add-btn',

        events: {
            'click': 'addDevice'
        },

        bindings: {
            ':el': {
                attributes: [{
                    name: 'disabled',
                    observe: ['free','kettles'],
                    onGet: function(values){
                        return values[0] && values[1] === 3;
                    }
                }]
            }
        },

        initialize: function(opts){
            this.render();
            this.stickit(this.model, this.bindings);
            return this;
        },

        render: function(){
            this.$el.html('Add Device');
            return this
        },

        addDevice: function(){
            if(this.model.get('free') && this.model.get('kettles') <= 3 || !this.model.get('free')){
                new ModalView({
                    companyId: this.model.get('companyId')
                });
            }
        }
    });

    return KeyView;

});