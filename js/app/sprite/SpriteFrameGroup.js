define( [], function() {

	var SpriteFrameGroup = function( id, options ) {

		options = options || {};

		this.id = id;
		this.name = options.name || id;

		this.spriteFrames = options.spriteFrames || Array();

	};

	return SpriteFrameGroup;

} );