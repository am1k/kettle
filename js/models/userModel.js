define(['backbone', '../api'], function(Backbone, api) {

    var User = Backbone.Model.extend({
           defaults: {
               kettles: 0,
               token: localStorage.getItem('userToken')
           },
           initialize: function(){
               api.on('user', function(data){
                   console.log(111);
                   data = JSON.parse(data);
                   localStorage.setItem('userToken', data.token);
                   this.set(data);
               }.bind(this));
               api.on('user:change', function(data){
                   data = JSON.parse(data);
                   this.set(data.name, data.value);
               }.bind(this));
               api.on('buy', function(code){
                  if(code > 0){
                      this.set('free', false);
                  }
               }.bind(this));
           }
       });

/*    {
        Code: -1,
            Description: 'Wrong key'
    }*/

    return User;
});