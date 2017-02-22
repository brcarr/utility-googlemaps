define(['require'], function(require) {
    'use strict';
    return new Promise(function(resolve) {
        require(['https://maps.googleapis.com/maps/api/js?v=3.exp?key=AIzaSyBHDaSLkj6DlFnF5ijvzKhqgGE4z9WB0aQ&signed_in=false&libraries=places'], resolve);
    });
});