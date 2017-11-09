'use strict';

const {spawn} = require('child_process');
const browserSync = require('browser-sync');
const colors = require('colors');

const browserSyncConfig = {
  sources: [
    '**/*.{html,js}'
  ],
  server: {
    server: {
      baseDir: '.',
      index: 'index.html',
      routes: {
        '/components/good-vibrations/': '.',
        '/components': 'bower_components'
      }
    },
    open: false,
    ghostMode: false,
    ui: false,
    reloadOnRestart: true,
    startPath: 'components/good-vibrations/demo/index.html'
  }
};

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
  .init(browserSyncConfig.server)
  .watch(browserSyncConfig.sources)
  .on('change', () => {
    runEslint(browserSync.reload);
  });
