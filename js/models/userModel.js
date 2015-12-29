define(['backbone', '../api'], function(Backbone, api) {

    var User = Backbone.Model.extend({
           defaults: {
               free: true,
               kettles: 0,
               token: localStorage.getItem('kettleToken')
           },
           initialize: function(){
               api.on('user', function(data){
                   data = JSON.parse(data);
                   localStorage.setItem('kettleToken', data.token);
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

    return User;
});