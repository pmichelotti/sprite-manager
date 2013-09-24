define( [], function() {

	var VirtualPixel = function( position, color, opacity ) {

		this.position = position || { x : 0, y : 0 };
		this.color = color || "#FFFFFF";
		this.opacity = opacity || 0;

	};

	return VirtualPixel;

} );