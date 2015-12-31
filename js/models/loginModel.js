define([
    'backbone',
    '../api'
], function(Backbone, api){

    var LoginModel = Backbone.Model.extend({

        defaults: {
            login: '',
            password: ''
        },

        sendUser: function(){
            api.emit('login', JSON.stringify({
                login: this.get('login'),
                password: this.get('password')
            }));

            api.once('login', function(data){
                data = JSON.parse(data);
                console.log(data);
            })
        }

    });


    return LoginModel;

});