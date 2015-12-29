define([
    'backbone',
    '../models/model',
    '../models/modelDevice',
    '../api'

], function(Backbone, MainModel, ModelDevice, api){

    var KeyView = Backbone.View.extend({

        tagName: 'button',

        className: 'buy-btn',

        events: {
            'click': 'sendKey'
        },

        initialize: function(){
            this.render();
            api.once('buy', function(code){
                console.log(code);
                if(code > 0){
                    this.remove();
                }
            }.bind(this));
            return this;
        },

        render: function(){
            this.$el.html('Buy');
            return this
        },

        sendKey: function(){
            api.emit('buy');
        }
    });

    return KeyView;

});