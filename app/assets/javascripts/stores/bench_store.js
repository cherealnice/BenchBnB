(function(root){
  var _benches = [];

  var resetBenches = function (benches) {
    _benches = benches || [];
  };

  var addBench = function (bench) {
    debugger;
    var oldBench = BenchStore.find(bench.id, 'id');
    if (oldBench) {
      _benches[oldBench] = bench;
    } else {
      _benches.push(bench);
    }
  };

  var addComment = function (comment) {
    var bench = BenchStore.find(comment.bench_id, 'id');
    if (bench) {
      _benches[bench][comments].push(comment);
    }
  };

  root.BenchStore = $.extend({}, EventEmitter.prototype, {

    BENCHES_INDEX_CHANGE_EVENT: "benches_index_change",
    BENCH_DETAIL_CHANGE_EVENT:  "bench_detail_change",

    all: function(){
      return _benches.slice(0);
    },

    addChangeListener: function(callback, event){
      this.on(event, callback);
    },

    removeChangeListener: function(callback, event){
      this.removeListener(event, callback);
    },

    find: function (value, param) {
      var match;
      for (var i = 0; i < _benches.length; i++) {
        if (_benches[i][param] === value) {
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
          addBench(payload.bench);
          BenchStore.emit(BenchStore.BENCHES_INDEX_CHANGE_EVENT);
          break;
        case CommentConstants.COMMENT_RECEIVED:
          addComment(payload.comment);
          BenchStore.emit(BenchStore.BENCHES_DETAIL_CHANGE_EVENT);
      }
    })
  });
})(this);
