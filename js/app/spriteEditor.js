define( [
          'editcontext/EditContext',
          'editcontext/panel/EditPanel',
          'editcontext/panel/ViewPanel',
          'editcontext/panel/Pallet',
          'editcontext/tool/Pencil',
          'editcontext/tool/Eraser',
          'sprite/renderer/DOMSpriteRenderer',
          'sprite/SpriteFrame',
          'spriteeditor/SpriteEditor',
          'sprite/Sprite' ],
		function( EditContext, EditPanel, ViewPanel, Pallet, Pencil, Eraser, DOMSpriteRenderer, SpriteFrame, SpriteEditor, Sprite ) {

	var spriteRenderer = new DOMSpriteRenderer();

	var editPanel = new EditPanel( {
		spriteRenderer : spriteRenderer
	} );

	var viewPanel = new ViewPanel( {
		spriteRenderer : spriteRenderer
	} );

	var pencil = new Pencil();
	var eraser = new Eraser();

	var pallet = new Pallet();


	var editContext = new EditContext( {
			editPanel : editPanel,
			viewPanel : viewPanel,
			tools : [ pencil, eraser ],
			pallet : pallet
	} );

	var spriteEditor = new SpriteEditor( {
		spriteFrameEditContext : editContext
	} );

	spriteEditor.setSprite( new Sprite( 'test-sprite-1' ) );

	ko.applyBindings( spriteEditor );

} );