define(['backbone', '../api', 'jquery'], function(Backbone, api,$) {

    var busy = false,
        loginDefer,
        User = Backbone.Model.extend({
           defaults: {
               kettles: 0,
               token: localStorage.getItem('userToken'),
               login: '',
               password: '',
               confirmPassword: '',
               user: '',
               key: '',
               company: '',
               Description: '',
               DescriptionRegistration: '',
               Code: ''
           },

        initialize: function(){
            this.on('change:token', function(model, val){
                console.log(val);
                val && localStorage.setItem('userToken', val);
            });
        },

        userLogin: function(){
            busy = false;
            return this.login();
        },

        login: function(){
            var loginData;
            if(!busy){
                loginDefer = $.Deferred();
                busy = true;
                if(this.get('login')){
                    loginData = {
                        login: this.get('login'),
                        password: this.get('password')
                    }
                }
                else if(this.get('token')){
                    loginData = {
                        token: this.get('token')
                    };
                }

                api.emit('login', JSON.stringify(loginData));

                api.once('login', function(data){
                    data = JSON.parse(data);
                    console.log(data);
                    if(data.Code > 0){
                        this.set('Description', data.Description);
                        this.onLogin();
                        loginDefer.resolve();

                    }else{
                        this.set('Description', data.Description);
                        console.log(data.Code);
                        this.set('Code', data.Code);
                        loginDefer.reject(data);
                    }
                }.bind(this));
            }

            return loginDefer;
        },

        onLogin: function(){
            //busy = false;
            api.on('user', function(data){
                data = JSON.parse(data);
                console.log(data, 555);
                localStorage.setItem('userToken', data.token);
                this.set(data);
            }.bind(this));
            api.on('user:change', function(data){
                data = JSON.parse(data);
                this.set(data.name, data.value);
            }.bind(this));
            api.on('buy', function(code){
                if(code > 0){
                    this.set('free', false);
                }
            }.bind(this));
        },

        signIn: function(){
            var self = this;
            api.emit('registration',  JSON.stringify({
                login: this.get('login'),
                password: this.get('password'),
                user: this.get('user'),
                key: this.get('key'),
                company: this.get('company')
            }));

            api.once('registration', function(data){
                data = JSON.parse(data);
                self.set('DescriptionRegistration', data.DescriptionRegistration);
                self.login();
            });
        }
       });

    return new User;
});