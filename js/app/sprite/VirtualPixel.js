define( [], function() {

	var VirtualPixel = function( position, color, opacity ) {

		this.position = position || { x : 0, y : 0 };
		this.color = color || "#FFFFFF";
		this.opacity = opacity || 0;

	};

	VirtualPixel.createAsCopy = function( pixel ) {

		var position = { x : pixel.position.x, y : pixel.position.y };
		var color = pixel.color;
		var opacity = pixel.opacity;

		return new VirtualPixel( position, color, opacity );

	};

	return VirtualPixel;

} );