define([
    'backbone',
    'jquery',
    './views/mainView',
    './eventAggregator',
    './views/homeView',
    './views/loginView',
    './views/registrationView',
    './views/changeLanguageView',
    './models/userModel',
    './models/localeModel'

], function(
    Backbone,
    $,
    MainView,
    eventAggregator,
    HomeView,
    LoginView,
    RegistrationView,
    changeLanguageView,
    userModel,
    localeModel){

    Backbone.View.prototype.close = function(){
        this.unstickit(this.model, this.bindings);
        this.remove();
    };

    Backbone.View.prototype.applyTranslation = function(){
        if(!this.translation){
            console.log('add translation');
            return;
        }
        var data = this.translation.reduce(function(res, cur){
            if(cur.attr){
                res[cur.selector] = {
                    attributes: [{
                        name: cur.attr,
                        observe: cur.field
                    }]
                }
            } else {
                res[cur.selector] = {
                    observe: cur.field
                };
            }
            return res;
        }, {});

        this.stickit(localeModel, data);
    };


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
            new changeLanguageView();
            this.listenTo(eventAggregator, 'redirect', function(path){
                this.navigate(path, {replace: true, trigger: true});
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
            } else if(id){
                eventAggregator.trigger('currentId', id);
            }
        },

        route: function(route, name, callback) {
            var router = this;
            if (!callback) callback = this[name];

            var f = function() {
                var args = Array.prototype.slice.call(arguments, 0);
                userModel.login().done(function(){
                    if(route.indexOf('kettles') < 0){
                        return eventAggregator.trigger('redirect', 'kettles');
                    }
                    callback.apply(router, args);
                }.bind(this)).fail(function(){
                    if(route.indexOf('kettles') === 0){
                        return eventAggregator.trigger('redirect', '#');
                    }
                    callback.apply(router, args);
                }.bind(this));
            };
            return Backbone.Router.prototype.route.call(this, route, name, f);
        },

        removeView: function(){
            this.currentView && this.currentView.remove();
        }
    });

    return MyRouter;
});