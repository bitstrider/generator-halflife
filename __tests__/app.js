'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-halflife:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
  });

  it('creates files', () => {
    assert.file([
      'package.json',
      'webpack.development.config.js',
      'webpack.production.config.js'
    ]);
  });
});
