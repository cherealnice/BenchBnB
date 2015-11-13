(function(root){
  var _marker;

  root.MarkerStore = $.extend({}, EventEmitter.prototype, {

    INDEX_HOVER_CHANGE_EVENT: "index_hover_change",

    resetMarker: function(marker){
      _marker = marker;
    },

    marker: function(){
      return marker;
    },

    addChangeListener: function(callback, event){
      this.on(event, callback);
    },

    removeChangeListener: function(callback, event){
      this.removeListener(event, callback);
    },

  });
})(this);
