define([
    'backbone',
    'jquery',
    './views/MainView',
    './eventAggregator'

], function(Backbone, $, MainView, eventAggregator){

    var MyRouter = Backbone.Router.extend({

        routes: {
            '(:id)': 'home'
        },

        initialize: function(){
            Backbone.history.start();
        },

        home: function(id){
            if(!this.currentView){
                this.currentView = new MainView({currentId: id});
                $('#application').append(this.currentView.$el);
            }else{
                eventAggregator.trigger('currentId', id);
            }
        }
    });

    return MyRouter;
});