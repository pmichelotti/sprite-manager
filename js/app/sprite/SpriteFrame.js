define( [ 'sprite/Size', 'sprite/VirtualPixel', 'util/uniqueIdUtil' ], function( Size, VirtualPixel, uniqueIdUtil ) {

	var SpriteFrame = function( id, options ) {

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

	SpriteFrame.createAsCopy = function( options ) {

		var name = options.name || options.spriteFrame.name + " copy";
		var id = options.id || uniqueIdUtil.getId( name );
		var size = new Size( options.spriteFrame.size.width, options.spriteFrame.size.height );
		var pixelSize = options.spriteFrame.pixelSize;

		var pixels = Array();

		for ( var curX = 0; curX < size.width; curX++ ) {
			var curYArray = Array();

			for ( var curY = 0; curY < size.height; curY++ ) {
				var curPixel = options.spriteFrame.pixels[ curX ][ curY ];

				curYArray.push( VirtualPixel.createAsCopy( curPixel ) );
			}

			pixels.push( curYArray );
		}

		return new SpriteFrame( id, {
			name : name,
			size : size,
			pixelSize : pixelSize,
			pixels : pixels
		} );

	};

	return SpriteFrame;

} );