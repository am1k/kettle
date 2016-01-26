define([
    'backbone',
    'text!../templates/login-page.html',
    '../models/userModel',
    '../eventAggregator'

], function(Backbone, mainTemplate, userModel, eventAggregator){

    var LoginPage = Backbone.View.extend({

        bindings: {
            '#login': {
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
            'submit': 'login'
        },

        translation: [
            {
                selector: '#login',
                field: 'login',
                attr: 'placeholder'
            },
            {
                selector: '#password',
                field: 'password',
                attr: 'placeholder'
            },
            {
                selector: '#login-button',
                field: 'login'
            },
            {
                selector: '#home',
                field: 'home'
            }
        ],


        model:  userModel,

        className: 'login-form',

        template: _.template(mainTemplate),

        initialize: function(){
            this.render();
            this.applyTranslation();
            this.stickit(this.model, this.bindings);
            return this;
        },

        render: function(){
            this.$el.html(this.template());
        },

        login: function(e){
            e.preventDefault();
            this.model.userLogin().then(function(){
                console.log(this.model);
                eventAggregator.trigger('redirect', 'kettles');
            });
        }

    });
    return LoginPage;
});