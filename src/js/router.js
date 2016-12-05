define('router', ['backbone'], function (Backbone) {

    return Backbone.Router.extend({

        "start": function() {
            Backbone.history.start();
        },

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