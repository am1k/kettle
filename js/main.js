define([
    'backbone',
    'jquery',
    './views/mainView',
    './eventAggregator',
    './views/homeView',
    './views/loginView',
    './views/registrationView',
    './models/userModel'

], function(Backbone, $, MainView, eventAggregator, HomeView, LoginView, RegistrationView, userModel){

    var MyRouter = Backbone.Router.extend({
        currentView: null,
        routes: {
            '': 'home',
            'login': 'login',
            'registration': 'registration',
            'kettles(/:id)': 'application'
        },

        initialize: function(){
            Backbone.history.start();
            this.listenTo(eventAggregator, 'redirect', function(){
                this.navigate('kettles', {replace: true, trigger: true});
            });
        },

        home: function(){
            this.removeView();
            this.currentView = new HomeView;
            $('#application').append(this.currentView.$el);
        },

        login: function(){
            this.removeView();
            this.currentView = new LoginView;
            $('#application').append(this.currentView.$el);
        },

        registration: function(){
            this.removeView();
            this.currentView = new RegistrationView;
            $('#application').append(this.currentView.$el);
        },

        application: function(id){
            if(!this.currentView || this.currentView && !(this.currentView instanceof MainView)){
                this.removeView();
                this.currentView = new MainView({currentId: id});
            }else if(id){
                eventAggregator.trigger('currentId', id);
            }
        },

/*        route: function(route, name, callback) {
            var router = this;
            if (!callback) callback = this[name];

            var f = function() {
                console.log('route before', route);
                if(route === 'kettles'){
                    userModel.login().done(function(){
                        callback.apply(router, arguments);
                    }).fail(function(){

                    });
                }else{
                    userModel.login().always(function(){
                        callback.apply(router, arguments);
                    });
                }
                //callback.apply(router, arguments);
                console.log('route after', route);
            };
            return Backbone.Router.prototype.route.call(this, route, name, f);
        },*/

        removeView: function(){
            this.currentView && this.currentView.remove();
        }
    });

    return MyRouter;
});