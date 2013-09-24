
ko.bindingHandlers.spritearea = {
	init : function( element, valueAccessor, allBindingsAccessor, viewModel, bindingContext ) {
		var spriteContext = ko.unwrap( valueAccessor() );

		var renderSprite = function() {
			spriteContext.render( element );
		};

		if ( spriteContext.dirty ) {
			spriteContext.dirty.subscribe( function( newValue ) {
				if ( newValue ) {
					renderSprite();
				}
			} );
		}

		renderSprite();

	}
};
