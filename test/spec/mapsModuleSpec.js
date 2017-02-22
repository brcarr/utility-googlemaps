define(['core', '../../src/js/mapsModule'], function(Core, MapsModule) {
    'use strict';

    describe('MapsModule', function() {
        var module = null;

        beforeEach(function() {
            module = new MapsModule();
        });

        it('defines a path', function() {
            expect(module.path).toBe('maps');
        });

        describe('routes', function() {
            //todo: test your route handlers
        });

        describe('connected', function() {
            it("sets the element content", function() {
                module.connected();
                expect(module.$element).not.toBeEmpty();
            });
        });

        describe('icon', function() {
            it('defines className', function() {
                expect(module.icon.className).not.toBeNull();
            });

            it('sets the text', function() {
                expect(module.icon.text).toBe(Core.Strings.translate('maps.title'));
            });
        });
    });
});
