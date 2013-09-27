define( [], function() {

	var Sprite = function( id, options ) {

		options = options || {};

		this.id = id;

		this.name = options.name || id;

		this.spriteFrames = options.spriteFrames || Array();
		this.spriteFrameGroups = options.spriteFrameGroups || Array();
		this.labels = options.labels || Array();

		this.frameCount = this.spriteFrames.length;
		this.frameGroupCount = this.spriteFrameGroups.length;

	};

	return Sprite;

} );