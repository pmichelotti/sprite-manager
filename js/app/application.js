define( [
          'editcontext/EditContext',
          'editcontext/panel/EditPanel',
          'editcontext/panel/ViewPanel',
          'editcontext/panel/Pallet',
          'editcontext/tool/Pencil',
          'editcontext/tool/Eraser',
          'editcontext/tool/EyeDropper',
          'sprite/renderer/DOMSpriteRenderer',
          'sprite/SpriteFrame',
          'spriteeditor/SpriteEditor',
          'sprite/Sprite',
          'projecteditor/ProjectEditor',
          'application/SpriteManagerApplication',
          'persistence/LocalStoreProjectPersistenceManager'],
		function( EditContext, EditPanel, ViewPanel, Pallet, Pencil, Eraser, EyeDropper, DOMSpriteRenderer, SpriteFrame, SpriteEditor, Sprite, ProjectEditor, SpriteManagerApplication, LocalStoreProjectPersistenceManager ) {

	var spriteRenderer = new DOMSpriteRenderer();

	var editPanel = new EditPanel( {
		spriteRenderer : spriteRenderer
	} );

	var viewPanel = new ViewPanel( {
		spriteRenderer : spriteRenderer
	} );

	var pencil = new Pencil();
	var eraser = new Eraser();
	var eyeDropper = new EyeDropper();

	var pallet = new Pallet();


	var editContext = new EditContext( {
			editPanel : editPanel,
			viewPanel : viewPanel,
			tools : [ pencil, eraser, eyeDropper ],
			pallet : pallet
	} );

	var spriteEditor = new SpriteEditor( {
		spriteFrameEditContext : editContext
	} );

	var persistenceManager = new LocalStoreProjectPersistenceManager();

	var projectEditor = new ProjectEditor( {
		persistenceManager : persistenceManager,
		spriteEditor : spriteEditor,
		spriteRenderer : spriteRenderer
	} );

	var application = new SpriteManagerApplication( {
		persistenceManager : persistenceManager,
		projectEditor : projectEditor
	} );

	ko.applyBindings( application );

} );