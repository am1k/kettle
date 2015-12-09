define(function(){

    function changeTemperature(){
        var currentValue;
        var inputs = document.getElementsByClassName('temperature');
        var items = [].slice.call(inputs);
        for(var i=0; i< items.length; i++){
            items[i].addEventListener('click', function() {
                if (this.type === 'radio' && this.checked) {
                    currentValue = this.value;
                }
                document.getElementById('current-temperature').innerHTML = currentValue;
            });
        }
    }

    return changeTemperature;

});