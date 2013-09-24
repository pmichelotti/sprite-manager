define( [], function() {

	var Sprite = function( id, options ) {

		options = options || {};

		this.id = id;

		this.name = options.name || id;

		this.spriteFrames = options.spriteFrames || Array();
		this.spriteFrameGroups = options.spriteFrameGroups || Array();
		this.labels = options.labels || Array();

	};

	return Sprite;

} );