define( [ 'sprite/EditableSprite', 'util/uniqueIdUtil' ], function( EditableSprite, uniqueIdUtil ) {

	var SpriteEditor = function( options ) {

		var self = this;

		this.sprite = ko.observable();

		this.spriteFrameEditContext = options.spriteFrameEditContext;

		this.newFrameForm = new function() {

			var frameSelf = this;

			this.name = ko.observable();

			this.submit = function() {
				self.addFrame( frameSelf.name() );
			};

		};

		this.setSprite = function( sprite ) {
			this.sprite( new EditableSprite( sprite ) );
		};

		this.editFrame = function( spriteFrame ) {
			self.spriteFrameEditContext.setSpriteFrame( spriteFrame );
		};

		this.deleteFrame = function( spriteFrame ) {
			self.sprite().removeSpriteFrame( spriteFrame );
		};

		this.copyFrame = function( spriteFrame ) {
			self.sprite().addSpriteFrame( { spriteFrame : spriteFrame } );
			self.spriteFrameEditContext.setSpriteFrame( spriteFrame );
		};

		this.addFrame = function( name ) {
			var newSpriteFrame = self.sprite().addSpriteFrame( {
				id : uniqueIdUtil( name ),
				name : name
			} );

			self.spriteFrameEditContext.setSpriteFrame( newSpriteFrame );
		};

		this.saveCurrentSpriteFrame = function() {
			var newSpriteFrame = self.spriteFrameEditContext.spriteFrame().save();
			self.sprite().updateSpriteFrame( newSpriteFrame );
		};
	};

	return SpriteEditor;

} );
