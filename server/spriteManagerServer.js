var express = require( 'express' );
var app = express();

var start = function( staticDirectory ) {

	/*
	 * Setup Express
	 */
	console.log( 'Serving static files from' + staticDirectory );

	app.use( express.static( staticDirectory ) );

	app.get( '/sprite-manager/package-project', function( req, res ) {

		console.log( 'Request Recieved' );

		res.status( 200 ).set( {
			"content-type" : "application/json"
		} ).json( {
			"status" : "Success!"
		} );

	} );


	app.listen( 8000 );

	console.log( 'Sprite Manager Server Started - Listening at port 8000' );

};

exports.start = start;
