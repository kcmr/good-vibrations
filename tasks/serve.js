'use strict';

const path = require('path');
const {spawn} = require('child_process');
const browserSync = require('browser-sync');
const colors = require('colors');
const component = path.basename(process.cwd());
const browserSyncConfig = require('./browsersync-config');
const browserSyncServerConfig = JSON.parse(JSON.stringify(browserSyncConfig.server).replace(/{{component}}/g, component));

function runEslint(cb) {
  const lint = spawn('npm', ['run', 'lint']);
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
  .watch(browserSyncConfig.sources)
  .on('change', () => {
    runEslint(browserSync.reload);
  });
