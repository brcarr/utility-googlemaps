define(['framework-core', 'json!static:../resources/strings'], function (Core, resources) {
    'use strict';

    // when suitable resources for a locale cannot be found, the system will access the root resources
    resources.root = resources.en;

    return Core.Strings.load(resources);
});