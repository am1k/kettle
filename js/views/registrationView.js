define([
    'backbone',
    'text!../templates/registration-template.html',
    '../models/registrationModel'

],function(Backbone, mainTemplate, RegistrationModel){

    Backbone.View.prototype.close = function(){
        this.unstickit(this.model, this.bindings);
        this.remove();
    };

    var RegistrationView = Backbone.View.extend({

        className: 'registration-form',

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
                    observe: ['login','password', 'mode', 'key', 'company'],
                    onGet: function(values){
                        console.log(values);
                        var userCheck = !values[0].length || values[1].length < 5;
                        console.log(userCheck, !values[3].length, !values[4].length)
                        if(values[2] === 'user'){
                            return userCheck || !values[3].length;
                        }
                        if(values[2] === 'company'){
                            return userCheck || !values[4].length;
                        }
                    }
                }]
            }
        },

        events: {

            'click #registration-button': 'registration'
        },

        model: new RegistrationModel,

        template: _.template(mainTemplate),


        initialize: function(){
            this.render();
            this.stickit(this.model, this.bindings);
            return this;
        },

        render: function(){
            this.$el.html(this.template());
            return this;
        },

        registration: function(){
            this.model.sentRegistrationData();
        }


    });
    return RegistrationView;

});