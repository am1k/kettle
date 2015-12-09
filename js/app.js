require.config({
    baseUrl: 'js',
    paths:{
        jquery: 'lib/jquery-2.1.4.min',
        main: 'main'
    }
});

requirejs(['main'],
    function(Kettle){
       new Kettle();
    }
);