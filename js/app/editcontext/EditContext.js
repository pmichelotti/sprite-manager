define( [ 'sprite/EditableSprite' ], function( EditableSprite ) {

	var EditContext = function( options ) {

		var self = this;

		this.sprite = ko.observable();

		this.editPanel = options.editPanel;
		this.viewPanel = options.viewPanel;
		this.tools = options.tools || Array();
		this.pallet = options.pallet;

		this.editPanel.setEditContext( self );
		this.viewPanel.setEditContext( self );

		this.currentTool = ko.observable( this.tools[ 0 ] );

		this.setSprite = function( sprite ) {
			self.sprite( new EditableSprite( sprite ) );
		};

		this.draw = function( pixel ) {
			if ( self.sprite() ) {
				self.sprite().draw( pixel );

				self.setDirty();
			}
		};

		this.erase = function( pixel ) {
			if ( self.sprite() ) {
				self.sprite().erase( pixel );

				self.setDirty();
			}
		};

		this.handleEvent = function( event, eliciter, parameters ) {

			if ( self.currentTool() && self.currentTool().listeners[ event.type ] ) {
				self.currentTool().listeners[ event.type ].call( self.currentTool(), event, self, eliciter, parameters );
			}

		};

		this.setDirty = function() {
			self.editPanel.dirty( true );
			self.viewPanel.dirty( true );
		}

	};

	return EditContext;

} );