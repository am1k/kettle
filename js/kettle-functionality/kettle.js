define(function(){

    function boil(){
        var timer = null;
        var currentValue = 0;
        var degree = 65;
        timer = setInterval(function(){
            if(currentValue < degree){
                console.log(currentValue, 111);
                currentValue = currentValue + 1;
            } else {
                console.log(111);
            }
        }, 100)
    }

    return boil;

});