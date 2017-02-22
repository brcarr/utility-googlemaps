define(['jquery', 'framework-core', 'template!../../content/cardView.html', './mainView'], function ($, Core, CardTemplate) {
    "use strict";

    return Core.View.extend({

        className: 'cardView',

        template: CardTemplate,

        render: function (cardData) {
            this.element.innerHTML = CardTemplate.render(cardData);
            this.element.querySelector('.map-container').appendChild(cardData.image[0]);
        }

    });
});