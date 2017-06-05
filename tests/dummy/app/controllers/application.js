import Ember from 'ember';

export default Ember.Controller.extend({
  isDemoVisible: true,
  actions: {
    alert(what) {
      Ember.run.later(() => {
        window.alert(what);
      }, 300);
      return false;
    }
  }
});
