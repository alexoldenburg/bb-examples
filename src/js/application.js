console.log('define app');
define('application', ['router'], function (Router) {

    "use strict";

    return function () {

        this.started = false;
        this.router = new Router(this);

        this.init = function () {
            this.started = true;
            this.router.start();
        };

        this.init();
    };

});