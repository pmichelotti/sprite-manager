define( [ 'project/EditableProject', 'sprite/Sprite', 'util/uniqueIdUtil' ], function( EditableProject, Sprite, uniqueIdUtil ) {

	var ProjectEditor = function( options ) {

		var self = this;

		this.persistenceManager = options.persistenceManager;

		this.spriteEditor = options.spriteEditor;

		this.project = ko.observable();

		this.mode = ko.observable( 'sprite-view' );

		this.isSpriteViewMode = ko.computed( function() {
			return self.mode() === 'sprite-view';
		} );

		this.isSpriteEditMode = ko.computed( function() {
			return self.mode() === 'sprite-editor';
		} );

		this.spriteForm = new function() {

			var spriteSelf = this;

			this.name = ko.observable();

			this.submit = function() {
				self.addSprite( spriteSelf.name() );
			};

		};

		this.setProject = function( project ) {

			self.project( new EditableProject( project ) );

		};

		this.addSprite = function( name, id ) {

			if ( !self.project() ) {
				return;
			}

			id = id || uniqueIdUtil( name );

			var newSprite = new Sprite( id, { name : name } );

			self.project().addSprite( newSprite );

			return newSprite;

		};

		this.removeSprite = function( sprite ) {

			if ( self.project() ) {
				self.project().removeSprite( sprite );
			}

		};

		this.editSprite = function( sprite ) {
			if ( self.spriteEditor ) {
				self.spriteEditor.setSprite( sprite );
				self.mode( 'sprite-editor' );
			}
		};

		this.returnToSpriteView = function() {
			self.mode( 'sprite-view' );
		};

		this.save = function() {
			if ( self.project() && self.persistenceManager ) {
				self.persistenceManager.saveProject( self.project().save() );
			}
		};

	};

	return ProjectEditor;

} );