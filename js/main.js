define([
    'backbone',
    'jquery',
    './views/MainView',
    './eventAggregator',
    './views/homeView',
    './views/loginView',
    './views/registrationView'

], function(Backbone, $, MainView, eventAggregator, HomeView, LoginView, RegistrationView){

    var MyRouter = Backbone.Router.extend({
        currentView: null,
        routes: {
            '': 'home',
            'login': 'login',
            'registration': 'registration',
            '(kettles/:id)': 'application'
        },

        initialize: function(){
            Backbone.history.start();
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
            if(!this.currentView){
                this.currentView = new MainView({currentId: id});
            }else{
                eventAggregator.trigger('currentId', id);
            }
        },

        removeView: function(){
            this.currentView && this.currentView.close();
        }
    });

    return MyRouter;
});