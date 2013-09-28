define( [ 'project/EditableProject', 'sprite/Sprite', 'projecteditor/panel/SimpleViewPanel', 'util/uniqueIdUtil' ], function( EditableProject, Sprite, SimpleViewPanel, uniqueIdUtil ) {

	var ProjectEditor = function( options ) {

		var self = this;

		this.persistenceManager = options.persistenceManager;

		this.spriteEditor = options.spriteEditor;

		this.project = ko.observable();

		this.mode = ko.observable( 'sprite-view' );

		var spriteRenderer = options.spriteRenderer;

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
				if ( spriteSelf.name() ) {
					self.addSprite( spriteSelf.name() );
					spriteSelf.name( '' );
				}
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

			//TODO Update so that it asks if you want to save
			var savedSprite = self.spriteEditor.saveSprite();

			self.project().updateSprite( savedSprite );

			self.spriteEditor.clear();

			self.mode( 'sprite-view' );

		};

		this.save = function() {
			if ( self.project() && self.persistenceManager ) {
				self.persistenceManager.saveProject( self.project().save() );
			}
		};

		this.spriteViewContext = function( sprite ) {
			var editContext = {
				spriteFrame : function() {
					if ( sprite.spriteFrames.length ) {
						return sprite.spriteFrames[ 0 ];
					}

					return null;
				}
			};

			return new SimpleViewPanel( {
				spriteRenderer : spriteRenderer,
				context : editContext
			} );
		};

	};

	return ProjectEditor;

} );