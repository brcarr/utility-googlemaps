define(['core', '../../src/js/views/mainView'], function (Core, MainView) {

    describe("MainView", function () {

        var mainView = null;
        var model = null;
        beforeEach(function () {
            model = new Core.Model({
                    greeting: 'Test Greeting',
                    items: [
                        {category: 'category a', item: 'item1'},
                        {category: 'category a', item: 'item2'},
                        {category: 'category b', item: 'item3'},
                    ]
                });
            mainView = new MainView({model: model});
        });

        it("should set model", function () {
            expect(mainView.model).toBe(model);
        });

        describe("Render", function () {
            beforeEach(function(){ mainView.render(); });

            it("should return itself on render", function () {
                expect(mainView.render()).toBe(mainView);
            });

            it("should contain a greeting", function () {
                expect(mainView.$('h1')).toContainText('Test Greeting');
            });

            it("should contain li for each item", function () {
                expect(mainView.$('li.category-item').length).toBe(3);
            });

            it("should contain a message if no items exist", function () {
                mainView = new MainView({
                    model: new Core.Model({
                        greeting: 'Test',
                        items: []
                    })
                });
                mainView.render();
                expect(mainView.$('li.category-item').length).toBe(0);
                expect(mainView.$element).toContainText("No items");
            });
            
        });

    });
});



