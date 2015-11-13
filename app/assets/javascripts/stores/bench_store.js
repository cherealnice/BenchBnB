(function(root){
  var _benches = [];

  var resetBenches = function(benches){
    _benches = benches;
  };

  root.BenchStore = $.extend({}, EventEmitter.prototype, {

    BENCHES_INDEX_CHANGE_EVENT: "benches_index_change",

    all: function(){
      return _benches.slice(0);
    },

    addChangeListener: function(callback, event){
      this.on(event, callback);
    },

    removeChangeListener: function(callback, event){
      this.removeListener(event, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload){
      switch (payload.actionType) {
        case BenchConstants.BENCHES_RECEIVED:
          resetBenches(payload.benches);
          BenchStore.emit(BenchStore.BENCHES_INDEX_CHANGE_EVENT);
          break;
        default:
      }
    })
  });
})(this);
