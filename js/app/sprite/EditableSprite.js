define( [ 'sprite/Sprite', 'sprite/VirtualPixel' ], function( Sprite, VirtualPixel ) {

	var EditableSprite = function( sprite ) {

		var self = this;

		this.sprite = sprite;

		this.newName = ko.observable( sprite.name );
		this.newSize = ko.observable( sprite.size );
		this.size = this.newSize;
		this.newPixelSize = ko.observable( sprite.pixelSize );
		this.pixelSize = this.newPixelSize;

		this.pixels = null;

		var initializePixelMatrix = function() {
			var newMatrix = Array();

			for ( var curX = 0; curX < self.newSize().width; curX++ ) {
				var curYArray = Array();

				for ( var curY = 0; curY < self.newSize().height; curY++ ) {
					if ( self.sprite.pixels && self.sprite.pixels[ curX ][ curY ] ) {
						curYArray.push( self.sprite.pixels[ curX ][ curY ] );
					}
					else {
						curYArray.push( new VirtualPixel( { x : curX, y : curY } ) );
					}
				}

				newMatrix.push( curYArray );
			}

			self.pixels = newMatrix;
		};

		var updatePixelMatrix = function() {
			var newMatrix = Array();

			for ( var curX = 0; curX < self.newSize().width; curX++ ) {
				var curYArray = Array();

				for ( var curY = 0; curY < self.newSize().height; curY++ ) {
					if ( self.pixels != null && self.pixels[ curX ][ curY ] ) {
						curYArray.push( self.pixels[ curX ][ curY ] );
					}
					else {
						curYArray.push( new VirtualPixel( { x : curX, y : curY } ) );
					}
				}

				newMatrix.push( curYArray );
			}

			self.pixels = newMatrix;
		};

		initializePixelMatrix();

		this.newSize.subscribe( updatePixelMatrix );



		this.draw = function( pixel ) {

			if ( self.pixels && self.pixels[ pixel.position.x ][ pixel.position.y ] ) {
				self.pixels[ pixel.position.x ][ pixel.position.y ] = pixel;
				return;
			}

			throw "Pixel to draw is at position " + pixel.position.x + ", " + pixel.position.y + " which is outside the area of the Sprite";

		};

		this.erase = function( pixel ) {

			this.draw( new VirtualPixel( { x : pixel.position.x, y : pixel.position.y } ) );

		};

		this.save = function() {

			var newSprite = new Sprite( self.sprite.id, {
				name : self.newName(),
				size : self.newSize(),
				pixelSize : self.newPixelSize(),
				pixels : self.pixels
			} );

			return newSprite;

		};

	};

	return EditableSprite;

} );