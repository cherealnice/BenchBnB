(function(root){
  var _benches = [];

  var resetBenches = function (benches) {
    _benches = benches;
  };

  var resetBench = function (bench) {
    var switched = false;
    _benches.forEach(function (b) {
      if(b.id === bench.id) {
        _benches[_benches.indesOf(b)] = bench;
        switched = true;
      }
    });
    if (!switched) { _benches.push(bench); }
  };

  root.BenchStore = $.extend({}, EventEmitter.prototype, {

    BENCHES_INDEX_CHANGE_EVENT: "benches_index_change",
    BENCH_DETAIL_CHANGE_EVENT: "bench_detail_change",

    all: function(){
      return _benches.slice(0);
    },

    addChangeListener: function(callback, event){
      this.on(event, callback);
    },

    removeChangeListener: function(callback, event){
      this.removeListener(event, callback);
    },

    find: function (description) {
      var match;
      for (var i = 0; i < _benches.length; i++) {
        if (_benches[i].description === description) {
          match = _benches[i];
          break;
        }
      }
      return match;
    },

    dispatcherID: AppDispatcher.register(function(payload){
      switch (payload.actionType) {
        case BenchConstants.BENCHES_RECEIVED:
          resetBenches(payload.benches);
          BenchStore.emit(BenchStore.BENCHES_INDEX_CHANGE_EVENT);
          break;
        case BenchConstants.BENCH_RECEIVED:
          resetBench(payload.bench);
          BenchStore.emit(BenchStore.BENCH_DETAIL_CHANGE_EVENT);
          break;
      }
    })
  });
})(this);
