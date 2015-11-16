ApiActions = {
  receiveAll: function (benches) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCHES_RECEIVED,
      benches: benches
    });
  },

  recieveOneBench: function (bench) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_RECEIVED,
      bench: bench
    });
  },

  showBench: function (id) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_SHOW,
      id: id
    });
  }
};
