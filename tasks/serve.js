'use strict';

const browserSync = require('browser-sync');
const {CLIEngine} = require('eslint');

function linterOutput(success, formatter, report) {
  return success ? 'Lint analysis OK' : formatter(report.results);
}

function linterExecute() {
  const config = { configFile: './.eslintrc'};
  const executeOnFiles = ['*.html', 'test/*.html', 'demo/**'];
  const engine = new CLIEngine(config);
  const report = engine.executeOnFiles(executeOnFiles);
  const whichFormatter = config.formatter || 'stylish';
  const formatter = engine.getFormatter(whichFormatter);
  const success = report.errorCount + report.warningCount === 0;
  const output = linterOutput(success, formatter, report);

  return {
    success,
    output,
    report
  };
}

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

browserSync
  .init(browserSyncConfig.server)
  .watch(browserSyncConfig.sources)
  .on('change', function() {
    const result = linterExecute();
    console.log(result.output);
  });
