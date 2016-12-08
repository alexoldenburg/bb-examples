/**
 * A module representing the application router.
 * @module router
 */
define('router', [ 'backbone' ], function ( Backbone ) {

    'use strict';

    /** returns Backbone.Router, including routes. */
    return Backbone.Router.extend({

        /**
         *  Kicking off the browsers own history.
         */
        start: function() {
            Backbone.history.start();
        },

        /**
         *  Application routes
         */
        routes: {
            '': function () {
                console.log( 'home 1' );
            },
            'home': function () {
                console.log( 'home 2' );
            },
            'todo': function () {
                console.log( 'todo' );
            },
            'chat': function () {
                console.log( 'chat' );
            },
            'parking': function () {
                console.log( 'parking' );
            },
            ':page': function (page) {
                console.log( 'visited another page :: ', page );
            }
        }

    });
})