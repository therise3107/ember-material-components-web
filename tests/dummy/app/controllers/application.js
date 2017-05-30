import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    alert(what) {
      window.alert(what);
      return false;
    }
  }
});
