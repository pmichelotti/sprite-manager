define( [], function() {

	var Project = function( id, options ) {

		options = options || {};

		this.id = id;
		this.name = options.name || id;
		this.sprites = options.sprites || Array();
		this.spriteCount = this.sprites.length;

		this.toJSON = function() {

			var retObject = {};

			retObject[ 'id' ] = self.id;
			retObject[ 'name' ] = self.name;
			retObject[ 'sprites' ] = Array();

			this.sprites.forEach( function( curSprite ) {
				retObject[ 'sprites' ].push( curSprite.toJSON() );
			} );
		};
	};

	return Project;

} );