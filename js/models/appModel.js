define(['backbone', 'jquery'], function(Backbone, $) {

    var MainModel = Backbone.Model.extend({

        defaults: {
            lang: localStorage.getItem('lang') || 'en'
        }
    });

    return new MainModel;

});

