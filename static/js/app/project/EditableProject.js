define( [ 'sprite/EditableSprite', 'project/Project'], function( EditableSprite, Project ) {

	var EditableProject = function( project ) {

		var self = this;

		this.project = project;

		this.name = ko.observable( project.name );

		this.sprites = ko.observableArray( project.sprites );

		this.addSprite = function( sprite ) {
			self.sprites.push( sprite );

			return sprite;
		};

		this.removeSprite = function( sprite ) {

			var spriteIndex = self.sprites.indexOf( sprite );

			if ( spriteIndex !== -1 ) {
				self.sprites.splice( spriteIndex, 1 );
			}

			return sprite;
		};

		this.updateSprite = function( sprite ) {

			var spritesWithTheSameId = self.sprites().filter( function( curSprite ) {
				return curSprite.id === sprite.id;
			} );

			if ( spritesWithTheSameId.length === 0 ) {
				return;
			}

			if ( spritesWithTheSameId.length > 1 ) {
				throw "An error has occurred resulting in multiple sprites with the same id " + sprite.id + " in the project";
			}

			var spriteIndex = self.sprites.indexOf( spritesWithTheSameId[ 0 ] );

			self.sprites.splice( spriteIndex, 1, sprite );

		};

		this.save = function() {

			return new Project( self.project.id, {
				name : self.name(),
				sprites : self.sprites()
			} );

		};
	};

	return EditableProject;

} );

