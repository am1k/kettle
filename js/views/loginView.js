define([
    'backbone',
    'text!../templates/login-page.html',
    '../models/userModel',
    '../eventAggregator'

], function(Backbone, mainTemplate, userModel, eventAggregator){

    Backbone.View.prototype.close = function(){
        this.unstickit(this.model, this.bindings);
        this.remove();
    };

    var LoginPage = Backbone.View.extend({

        bindings: {
            '#name': {
                events: ['keyup'],
                observe: 'login'
            },
            '#password': {
                events: ['keyup'],
                observe: 'password'
            },
            '#login-button': {
                attributes: [{
                    name: 'disabled',
                    observe: ['login','password'],
                    onGet: function(values){
                        return !values[0].length && values[1].length < 5;
                    }
                }]
            },
            '.message': {
                attributes: [{
                    observe: 'Description',
                    updateModel: false,
                    name: 'class',
                    onGet: function(val){
                        return val ? 'show': '';
                    }
                }]
            },
            '.text': {
                updateModel: false,
                observe: 'Description'
            }
        },

        events: {
            'click #login-button': 'login'
        },

        model:  userModel,

        className: 'login-form',

        template: _.template(mainTemplate),

        initialize: function(){
            this.render();
            this.stickit(this.model, this.bindings);
            return this;
        },

        render: function(){
            this.$el.html(this.template());
        },

        login: function(){
            this.model.userLogin().then(function(){
                    eventAggregator.trigger('redirect')
            });
        }

    });
    return LoginPage;
});