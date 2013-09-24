define( [
          'editcontext/EditContext',
          'editcontext/panel/EditPanel',
          'editcontext/panel/ViewPanel',
          'editcontext/panel/Pallet',
          'editcontext/tool/Pencil',
          'sprite/renderer/DOMSpriteRenderer',
          'sprite/SpriteFrame' ],
		function( EditContext, EditPanel, ViewPanel, Pallet, Pencil, DOMSpriteRenderer, SpriteFrame ) {

	var spriteRenderer = new DOMSpriteRenderer();

	var editPanel = new EditPanel( {
		spriteRenderer : spriteRenderer
	} );

	var viewPanel = new ViewPanel( {
		spriteRenderer : spriteRenderer
	} );

	var pencil = new Pencil();

	var pallet = new Pallet();


	var editContext = new EditContext( {
			editPanel : editPanel,
			viewPanel : viewPanel,
			tools : [ pencil ],
			pallet : pallet
	} );

	editContext.setSpriteFrame( new SpriteFrame( 'test-1' ) );

	ko.applyBindings( editContext );

} );