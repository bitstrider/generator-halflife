'use strict';

const fs = require('fs');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const path = require('path');

const templateListPath = path.join(__dirname, 'templates');
const templatePath = (branch, ...paths) => path.join(templateListPath, branch, ...paths);

module.exports = class extends Generator {
  prompting() {
    this.branch = 'master';
  }

  writing() {
    const ignoredPaths = ['src', 'src-clean', '.git'];
    const sources = fs
      .readdirSync(this.templatePath(this.branch))
      .filter(source => ignoredPaths.indexOf(source) === -1);

    sources.forEach(source => {
      this.fs.copy(templatePath(this.branch, source), this.destinationPath(source), {
        dot: true
      });
    });

    this.fs.copy(templatePath(this.branch, 'src'), this.destinationPath('src'));
    try {
      this.fs.move(
        this.destinationPath('.npmignore'),
        this.destinationPath('.gitignore')
      );
    } catch (e) {}
  }

  install() {
    this.installDependencies({ bower: false });
  }
};
