define( [], function() {

	var Project = function( id, options ) {

		options = options || {};

		this.id = id;
		this.name = options.name || id;
		this.sprites = options.sprites || Array();

	};

	return Project;

} );