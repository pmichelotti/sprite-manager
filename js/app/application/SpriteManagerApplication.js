define( [ 'project/Project', 'util/uniqueIdUtil' ], function( Project, uniqueIdUtil ) {

	var Application = function( options ) {

		var self = this;

		this.persistenceManager = options.persistenceManager;

		this.projects = ko.observableArray( options.projects );

		this.projectEditor = options.projectEditor;

		this.mode = ko.observable( 'project-list' );

		this.isProjectListMode = ko.computed( function() {
			return self.mode() === 'project-list';
		} );

		this.isProjectEditMode = ko.computed( function() {
			return self.mode() === 'project-editor';
		} );

		this.isProjectSpriteListMode = ko.computed( function() {
			return self.isProjectEditMode() && self.projectEditor.isSpriteViewMode();
		} );

		this.isProjectSpriteEditMode = ko.computed( function() {
			return self.isProjectEditMode() && self.projectEditor.isSpriteEditMode();
		} );

		this.projectForm = new function() {

			var projectSelf = this;

			this.name = ko.observable();

			this.submit = function() {
				if ( projectSelf.name() ) {
					self.addProject( projectSelf.name() );
					projectSelf.name( '' );
				}
			};

		};

		this.addProject = function( name, id ) {

			id = id || uniqueIdUtil( name );

			var newProject = new Project( id, { name : name } );

			self.projects.push( newProject );

			return newProject;

		};

		this.removeProject = function( project ) {

			var projectIndex = self.projects.indexOf( project );

			if ( projectIndex !== -1 ) {
				self.projects.splice( projectIndex, 1 );
			}

			return project;

		};

		this.editProject = function( project ) {

			self.projectEditor.setProject( project );

			self.mode( 'project-editor' );

		};

		this.returnToProjectListView = function() {
			self.mode( 'project-list' );
		};

		this.save = function() {

			if ( self.persistenceManager ) {
				self.persistenceManager.saveProjects( self.projects() );
			}

		};

		this.load = function() {

			self.projects.removeAll();

			if ( !self.persistenceManager ) {
				return;
			}

			var loadedProjects = self.persistenceManager.loadProjects();

			for ( var curProjectKey in loadedProjects ) {
				self.projects.push( loadedProjects[ curProjectKey ] );
			}

		};

	};

	return Application;

} );