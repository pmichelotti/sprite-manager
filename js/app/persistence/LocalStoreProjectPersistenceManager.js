define( [ 'project/Project', 'sprite/Sprite', 'sprite/SpriteFrameGroup', 'sprite/SpriteFrame', 'sprite/Size', 'sprite/VirtualPixel' ],
		function( Project, Sprite, SpriteFrameGroup, SpriteFrame, Size, VirtualPixel ) {

	var STORAGE_KEY_PREFIX = 'sprite-manager.project';

	var PersistenceManager = function() {

		var self = this;

		this.saveProject = function( project ) {

			var projectJson = project.toJSON();

			var storageKey = STORAGE_KEY_PREFIX + project.id;

			localStorage[ storageKey ] = JSON.stringify( projectJson );

		};

		var createPixelFromJSON = function( json ) {

			return new VirtualPixel( json.position, json.color, json.opacity );

		};

		var createPixelMatrixFromJSON = function( json ) {

			var matrix = Array();

			json.forEach( function( curColumn ) {
				var curMatrixColumn = Array();

				curColumn.forEach( function( curColumnItem ) {
					curMatrixColumn.push( createPixelFromJSON( curColumnItem ) );
				} );

				matrix.push( curMatrixColumn );
			} );

			return matrix;
		};

		var createSizeFromJSON = function( json ) {

			return new Size( json.width, json.height );

		};

		var createSpriteFrameFromJSON = function( json ) {

			var frameOptions = {
				name : json.name,
				size : createSizeFromJSON( json.size ),
				pixelSize : json.pizelSize,
				pixels : createPixelMatrixFromJSON( json.pixels )
			};

			return new SpriteFrame( json.id, frameOptions );
		};

		var createSpriteFrameGroupFromJSON = function( json, frames ) {

			var frameMap = {};

			frames.forEach( function( curFrame ) {
				frameMap[ curFrame.id ] = curFrame;
			} );

			var groupOptions = {
				name : json.name,
				spriteFrames : Array()
			};

			if ( json.spriteFrames && json.spriteFrames.length ) {
				json.spriteFrames.forEach( function( curFrameJson ) {
					groupOptions.spriteFrames.push( frameMap[ curFrameJson ] );
				} );
			}

			return new SpriteFrameGroup( json.id, groupOptions );

		};

		var createSpriteFromJSON = function( json ) {

			var spriteOptions = {
				name : json.name,
				spriteFrames : Array(),
				spriteFrameGroups : Array(),
				labels : json.labels
			};

			if ( json.spriteFrames && json.spriteFrames.length ) {
				json.spriteFrames.forEach( function( curFrameJSON ) {
					spriteOptions.spriteFrames.push( createSpriteFrameFromJSON( curFrameJSON ) );
				} );
			}

			if ( json.spriteFrameGroups && json.spriteFrameGroups.length ) {
				json.spriteFrameGroups.forEach( function( curFrameGroupJSON ) {
					spriteOptions.spriteFrameGroups.push( createSpriteFrameGroupFromJSON( curFrameGroupJSON, spriteOptions.spriteFrames ) );
				} );
			}

			return new Sprite( json.id, spriteOptions );
		};

		this.loadProject = function( project ) {

			var storageKey = STORAGE_KEY_PREFIX + project.id;

			var projectJson = JSON.parse( localStorage[ storageKey ] );

			var projectOptions = {
				name : projectJson.name,
				sprites : Array()
			};

			if ( projectJson.sprites && projectJson.sprites.length ) {
				projectJson.sprites.forEach( function( curSpriteJSON ) {
					projectOptions.push( createSpriteFromJSON( curSpriteJSON ) );
				} );
			}

			return new Project( projectJson.id, projectOptions );

		};

		this.loadProjects = function() {

			var returnedProjects = Array();

			for ( var curProjectKey in localStorage ) {
				if ( curProjectKey.indexOf( STORAGE_KEY_PREFIX ) === 0 ) {
					var projectId = curProjectKey.substring( STORAGE_KEY_PREFIX.length );
					var loadedProject = self.loadProject( projectId );
					returnedProjects.push( loadedProject );
				}
			}

			return returnedProjects;

		};
	};

	return PersistenceManager;

} );
