define([
    'backbone',
    '../api'
], function(Backbone, api){

    var RegistrationModel = Backbone.Model.extend({

        defaults: {
            login: '',
            password: '',
            user: '',
            key: '',
            company: ''
        },

        sentRegistrationData: function(){
            api.emit('login',  JSON.stringify({
                login: this.get('login'),
                password: this.get('password'),
                user: this.get('user'),
                key: this.get('key'),
                company: this.get('company')
            }));
        }
    });

    return RegistrationModel;

});