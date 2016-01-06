var grunt = require('grunt');

grunt.initConfig({
    requirejs: {
        compile: {
            options: {
                optimize: 'uglify',
                baseUrl: "js",
                mainConfigFile: "js/app.js",
                name: "app",
                out: "dist/app.js",
                deps: ["lib/require.js"]
            }
        }
    }
});

grunt.loadNpmTasks('grunt-contrib-requirejs');


grunt.registerTask('default', ['requirejs']);