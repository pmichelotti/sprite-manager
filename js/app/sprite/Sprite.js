define( [ 'sprite/Size', 'sprite/VirtualPixel' ], function( Size, VirtualPixel ) {

	var Sprite = function( id, options ) {
		var self = this;

		options = options || {};

		this.name = options.name || id;
		this.id = id;

		this.size = options.size || new Size( 10, 10 );
		this.pixelSize = options.pixelSize || 10;

		/*
		 * A matrix of pixels.  The outer array represents rows while the inner arrays represent columns
		 */
		this.pixels = options.pixels;

	};

	return Sprite;

} );