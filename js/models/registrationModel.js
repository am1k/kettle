define([
    'backbone',
    '../api'
], function(Backbone, api){

    var RegistrationModel = Backbone.Model.extend({

        defaults: {
            login: '',
            password: '',
            confirmPassword: '',
            user: '',
            key: '',
            company: ''
        },

        sentRegistrationData: function(){
            api.emit('registration',  JSON.stringify({
                login: this.get('login'),
                password: this.get('password'),
                user: this.get('user'),
                key: this.get('key'),
                company: this.get('company')
            }));

            api.once('companyKey', function(data){
                console.log(data);
            })
        }

    });

    return RegistrationModel;

});