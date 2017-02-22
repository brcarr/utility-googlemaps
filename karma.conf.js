/*eslint-env node, es6*/

const defaultConfig = require('experience-karma').config(require('./bower.json').name);

// add files not included in the defaultConfig such as json
// defaultConfig.files.push({pattern: 'test/**.json', included: false});

module.exports = config => config.set(
    Object.assign(defaultConfig, {
        browsers: ['PhantomJS' /*, 'Firefox', 'Chrome'*/]
    })
);