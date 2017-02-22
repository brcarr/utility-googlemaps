define(['jquery', 'framework-core', 'framework-home', './views/mainView', './resources'], function ($, Core, Home, MainView, Resources) {
    'use strict';
    
    return Core.Module.extend({
        controller: null,

        icon: 'icon-FPO_circle_filled',
        path: 'psw-utility-googlemaps',

        title: Resources.get('title'),

        routes: {
            "": "index"
        },

        index: function () {
            this.mainView.render();
            this.$element.html(this.mainView.mapView.$element[0]);
            this.mainView.resizeMap();
            this.mainView.removeCard();
        },

        initialize: function () {
            Home.apps.add(this);
            this.on('activated', this.index);
            this.mainView = new MainView();
            var self = this;
            Core.session.on('begin', function () {
                self.mainView.render();
            });
        }
    });
});
