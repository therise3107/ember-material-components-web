module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies
  afterInstall: function() {
    return this.addPackagesToProject([
      { name: '@material/base', target: '^0.1.0' },
      { name: '@material/animation', target: '^0.1.0' },
      { name: '@material/theme', target: '^0.1.0' },
      { name: '@material/checkbox', target: '^0.1.0' },
      { name: '@material/radio', target: '^0.1.1' },
      { name: '@material/button', target: '^0.1.1' },
      { name: '@material/fab', target: '^0.2.0' },
      { name: '@material/card', target: '^0.1.0' },
      { name: '@material/icon-toggle', target: '^0.1.1' },
      { name: '@material/elevation', target: '^0.1.1' },
      { name: '@material/list', target: '^0.1.0' },
      { name: '@material/form-field', target: '^0.1.1' },
      { name: '@material/textfield', target: '^0.2.0' },
      { name: '@material/menu', target: '^0.1.2' }
    ]);
  }
};
