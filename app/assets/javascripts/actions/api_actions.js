ApiActions = {
  receiveAll: function (benches) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCHES_RECEIVED,
      benches: benches
    });
  },

  receiveOneBench: function (bench) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_RECEIVED,
      bench: bench
    });
  },

  receiveOneComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENT_RECEIVED,
      comment: comment
    });
  },

  showBench: function (id) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_SHOW,
      id: id
    });
  }
};
