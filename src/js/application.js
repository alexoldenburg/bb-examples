/**
 * A module representing the application router.
 * @module application
 */
define('application', [ 'router' ], function ( Router ) {

    'use strict';

    console.log('he');
    /**
     *  Kicks off the application.
     */
    return function () {

        /**
         * The application will always know about the router
         * so you can utilize the browser navigation from anywhere.
         * */
        this.router = new Router(this);

        /** Set up for application */
        this.init = function () {

            /** Kick start it */
            this.router.start();
        };

        this.init();
    };

});