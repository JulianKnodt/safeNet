var grunt = require('grunt');
grunt.loadNpmTasks('grunt-shell');


grunt.initConfig({
    shell: {
        listen: {
            command: 'sudo parse-live -o ./savedData/data.txt'
        },

    }
});

grunt.runParse = function(){
  grunt.task.run('shell:listen');
}

module.exports = grunt;
