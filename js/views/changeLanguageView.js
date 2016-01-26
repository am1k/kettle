define([
    'backbone',
    'text!../templates/change-language.html',
    '../models/appModel'

], function(Backbone, myTemplate, AppModel){

    var ChangeLanguageView = Backbone.View.extend({

        model: AppModel,

        bindings: {
            '.select-language input': {
                events: ['change'],
                observe: 'lang',
                update: function($els, val){
                    $els.filter('[value="'+val+'"]').attr('checked', true);
                }
            }
        },

        template: _.template(myTemplate),

        initialize: function(){
            this.render();
            this.stickit(this.model, this.bindings);
            return this;
        },

        render: function(){
            this.$el.html(this.template()).appendTo('#application');
        }

    });

    return ChangeLanguageView;

});