define([
    'backbone',
    '../models/userModel',
    '../models/kettleModel',
    '../api'

], function(Backbone, userModel, MainModel, api){

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
            api.emit('buy', userModel.get('_id'));
        }
    });

    return KeyView;

});