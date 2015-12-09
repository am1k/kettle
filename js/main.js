define(function(require){

    var changeTemperature = require('./view/changeTemperature');
    var boil = require('./kettle-functionality/kettle');

    function Kettle(){
        this.init();
    }

    Kettle.prototype = {
        init: function(){
            changeTemperature();
            boil();
        },
    };

    return Kettle;

});
