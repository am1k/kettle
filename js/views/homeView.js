define([
    'backbone',
    'text!../templates/main-page.html',
    '../models/appModel'

], function(Backbone, mainTemplate, AppModel){

    var MainPage = Backbone.View.extend({

        className: 'application-view',

        model: AppModel,

        translation: [
            {
                selector: '#login',
                field: 'login'
            },
            {
                selector: '#registration',
                field: 'registration'
            }
        ],

        template: _.template(mainTemplate),

        initialize: function(){

            this.render();
            this.applyTranslation();
            return this;
        },

        render: function(){
            this.$el.html(this.template());
        }

    });
   return MainPage;
});