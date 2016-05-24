define([
    'backbone',
    'text!../templates/registration-template.html',
    '../models/userModel',
    '../models/appModel',
    '../models/localeModel'

],function(Backbone, mainTemplate, userModel){

    var RegistrationView = Backbone.View.extend({

        model: userModel,

        className: 'registration-form',

        translation: [
            {
                selector: '.user-label',
                field: 'user'
            },
            {
                selector: '.company-label',
                field: 'company'
            },
            {
                selector: '#registration-button',
                field: 'registration'
            },
            {
                selector: '#go',
                field: 'go'
            },
            {
                selector: '#back',
                field: 'home'
            },
            {
                selector: '#name',
                field: 'user-name',
                attr: 'placeholder'
            },
            {
                selector: '#password',
                field: 'password',
                attr: 'placeholder'
            },
            {
                selector: '#confirmPassword',
                field: 'confirm-password',
                attr: 'placeholder'
            },
            {
                selector: '#enterCompany',
                field: 'company-name',
                attr: 'placeholder'
            },
            {
                selector: '#enterKey',
                field: 'enter-key',
                attr: 'placeholder'
            },

        ],

        bindings: {
            '#name': {
                events: ['keyup'],
                observe: 'login'
            },
            '#password': {
                events: ['keyup'],
                observe: 'password'
            },
            '#enterCompany': {
                events: ['keyup'],
                observe: 'company'
            },
            '#enterKey': {
                events: ['keyup'],
                observe: 'key'
            },
            '#confirmPassword': {
                events: ['keyup'],
                observe: 'confirmPassword'
            },
            ':radio': {
                events: ['change'],
                observe: 'mode'
            },
            '.enter-company': {
                observe: 'mode',
                updateModel: false,
                updateView: false,
                visible: function(val){
                    return val === 'company';
                }
            },
            '.enter-key': {
                observe: 'mode',
                updateModel: false,
                updateView: false,
                visible: function(val){
                    return val === 'user';
                }
            },
            '#registration-button': {
                attributes: [{
                    name: 'disabled',
                    observe: ['login','password', 'mode', 'key', 'company', 'confirmPassword'],
                    onGet: function(values){
                        //console.log(values);
                        var userCheck = values[0].length < 4 || values[1].length < 4 && (values[1] === values[5]) ;
                        if(values[2] === 'user'){
                            return userCheck || !values[3].length;
                        }
                        if(values[2] === 'company'){
                            return userCheck || !values[4].length;
                        }
                        return true;
                    }
                }]
            },

            '#key': {
                attributes: [{
                    observe: 'DescriptionRegistration',
                    updateModel: false,
                    name: 'class',
                    onGet: function(val){
                        console.log(val);
                        return val ? 'show': '';
                    }
                }]
            },
            '.text': {
                updateModel: false,
                observe: 'DescriptionRegistration'
            }
        },

        events: {
            'click #registration-button': 'registration'
        },

        template: _.template(mainTemplate),


        initialize: function(){
            this.render();
            this.applyTranslation();
            this.stickit(this.model, this.bindings);
            return this;
        },

        render: function(){
            this.$el.html(this.template());
            return this;
        },

        registration: function(e){
            e.preventDefault();
            this.model.signIn();
        }

    });
    return RegistrationView;

});