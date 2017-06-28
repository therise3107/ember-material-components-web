module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies
  afterInstall: function() {
    return this.addPackagesToProject([
      { name: '@material/base', target: '0.1.0' },
      { name: '@material/animation', target: '0.2.2' },
      { name: '@material/theme', target: '0.1.5' },
      { name: '@material/checkbox', target: '0.1.0' },
      { name: '@material/radio', target: '0.2.5' },
      { name: '@material/button', target: '0.3.7' },
      { name: '@material/fab', target: '0.3.9' },
      { name: '@material/card', target: '0.1.0' },
      { name: '@material/icon-toggle', target: '0.1.12' },
      { name: '@material/elevation', target: '0.1.1' },
      { name: '@material/list', target: '0.1.0' },
      { name: '@material/form-field', target: '0.1.1' },
      { name: '@material/textfield', target: '0.2.0' },
      { name: '@material/menu', target: '0.4.0' },
      { name: '@material/toolbar', target: '0.3.2'},
      { name: '@material/tabs', target: '0.1.1'},
      { name: '@material/ripple', target: '0.6.1'}
    ]);
  }
};
