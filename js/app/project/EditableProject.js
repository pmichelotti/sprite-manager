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

		this.save = function() {

			return new Project( self.project.id, {
				name : self.name(),
				sprites : self.sprites()
			} );

		};
	};

	return EditableProject;

} );

