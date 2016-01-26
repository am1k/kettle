define(['backbone', 'jquery', './appModel', '../nls/locale'], function(Backbone, $, appModel, translations) {

    var MainModel = Backbone.Model.extend({
        initialize: function(){
            this.set(translations[appModel.get('lang')]);
            this.listenTo(appModel, 'change:lang', this.update);
        },

        update: function(model, lang){
            this.set(translations[lang]);
        }
    });

    return new MainModel;

});

