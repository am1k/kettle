define(['backbone', '../api', 'jquery', '../eventAggregator', 'underscore'], function(Backbone, api,$, eventAggregator, _) {

    var defaults = {
            kettles: 0,
            token: localStorage.getItem('userToken'),
            login: '',
            password: '',
            confirmPassword: '',
            user: '',
            key: '',
            _id: '',
            company: '',
            companyId: '',
            companyKey: '',
            Description: '',
            DescriptionRegistration: '',
            Code: '',
            submitting: false
        },
        loginDefer,
        User = Backbone.Model.extend({
           defaults: defaults,

        initialize: function(){
            this.on('change:token', function(model, val){
                console.log(val);
                val != null && localStorage.setItem('userToken', val);
            });
        },

        userLogin: function(){
            this.set('submitting', false);
            return this.login();
        },

        login: function(){
            var loginData;
            if(!this.get('submitting')){
                loginDefer = $.Deferred();
                this.set('submitting', true);
                if(this.get('login')){
                    loginData = {
                        login: this.get('login'),
                        password: this.get('password')
                    }
                }else{
                    loginData = {
                        token: this.get('token')
                    };
                }

                console.log(loginData)

                api.emit('login', JSON.stringify(loginData));

                api.once('login', function(data){
                    data = JSON.parse(data);
                    console.log(data);
                    if(data.Code > 0){
                        this.set('Description', data.Description);
                        this.onLogin();
                        this.set(data.Data);
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

        onLogin: _.once(function(){
            api.on('user:change', function(data){
                data = JSON.parse(data);
                this.set(data.name, data.value);
            }.bind(this));
            api.on('buy', function(code){
                if(code > 0){
                    this.set('free', false);
                }
            }.bind(this));
        }),

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
        },

        logOut: function(){
            this.set(_.extend(defaults, {
                token: '',
                submitting: false
            }));
            eventAggregator.trigger('redirect', '#');
        }

    });

    return new User;
});