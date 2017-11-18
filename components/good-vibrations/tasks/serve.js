'use strict';

const path = require('path');
const {spawn} = require('child_process');
const browserSync = require('browser-sync');
const colors = require('colors');
const component = path.basename(process.cwd());
const args = require('minimist')(process.argv.slice(2));

const config = require('./config');
const browserSyncServerConfig = JSON.parse(JSON.stringify(config.server).replace(/{{component}}/g, component));
const lintConfig = config.lint.sources;
lintConfig.push(args.fix || config.lint.fix === true ? '--fix' : '');

function runEslint(cb) {
  const lint = spawn('eslint', lintConfig);
  let output;
  lint.stdout.on('data', data => {
    output = data.toString();
  });
  lint.on('exit', code => {
    if (code) {
      console.log(colors.red(output));
    }
  });
  lint.on('close', cb);
}

browserSync
  .init(browserSyncServerConfig)
  .watch(config.watch.sources)
  .on('change', () => {
    if (args.lint || config.watch.lint === true) {
      runEslint(browserSync.reload);
    } else {
      browserSync.reload();
    }
  });
