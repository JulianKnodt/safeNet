var grunt = require('grunt');
grunt.loadNpmTasks('grunt-shell');


grunt.initConfig({
    shell: {
        listen: {
            command: 'sudo parse-live -o ./savedData/data.txt'
        },
        databaseUp: {
          command: 'mongod --dbpath=database'
        },
    }
});

grunt.runParse = function(){
  grunt.task.run('shell:listen');
}

module.exports = grunt;
