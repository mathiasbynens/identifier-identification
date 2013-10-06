module.exports = function(grunt) {

	grunt.initConfig({
		'template': {
			'build': {
				'options': {
					'data': function() {
						return require('./scripts/export-data.js');
					}
				},
				'files': {
					'identifier.js': ['src/identifier.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-template');

	grunt.registerTask('default', [
		'template'
	]);

};
