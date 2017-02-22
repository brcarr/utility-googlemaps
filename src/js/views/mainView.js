define(['jquery', 'framework-core', './mapView', './cardView', 'framework-application-context', 'framework-notifications'], function ($, Core, MapView, CardView, ApplicationContext, Notifications) {
    "use strict";

    return Core.View.extend({

        id: 'mainView',

        initialize: function () {
            this.mapView = new MapView();
            this.cardView = new CardView();

            //            var me = this;
            //            Dashboard.DashboardViewsSystem.registerView({
            //                id: 71231,
            //                icon: 'ico-document',
            //                name: 'Google Maps',
            //                group: 'Maps',
            //                cardSize: 3,
            //                createView: function () {
            //                    return me.mapView.render().$element;
            //                },
            //                createViewPreview: function () {
            //                    return me.mapView.render().$element;
            //                }
            //            });

            this.listenToContext();
        },

        listenToContext: function () {

            var me = this;

            //Read config.json to get settings for contextDocSearch
            var packageSettings = Core.config.applicationContextSettings || {};
            me.applicationContextConfig = packageSettings.googlemaps || {};
            me.contextSources = me.applicationContextConfig.contextSources || '';

            // Listen for context change events, read the properties of the context object, pass address to MapView through lookupAddress
            me.listenTo(ApplicationContext.Manager, 'change:context', function (change) {
                me.context = change.context;
                if (me.contextSources !== '') {
                    if (me.contextSources[me.context.source.type] === 'address') {
                        me.address = me.context.properties.address + ", " + me.context.properties.city + ", " + me.context.properties.state + ", " + me.context.properties.zip;
                    } else {
                        return;
                    }
                } else {
                    return;
                }
                // Create the context card and add the notification to the context menu
                me.notification = Notifications.notificationsSystem.addNotification(me.context, me.cardView.element);
                me.notification.state = 'loading';
                me.mapView.lookupAddress(me.address);
                me.addCard(me.address);
                me.mapView.$element.closest('[data-items-container]').children().on('shown:PopoverMenu', me.mapView.resizeMap.bind(me.mapView));
            }.bind(me));
        },

        // Function used to add notifications to the application context menu
        addCard: function (address) {
            var self = this;
            var cardData = {
                image: self.mapView.$element,
                address: address
            };
            self.cardView.render(cardData);
        },

        removeCard: function () {
            if (this.notification) {
                this.notification.state = 'no-content';
            }
        },

        render: function () {
            if (!this.mapView) {
                this.mapView = new MapView();
            }
            this.$element.html(this.mapView.$element);
            //return this;
        },

        resizeMap: function () {
            this.mapView.resizeMap();
        }
    });
});