ApiUtil = {
  fetchBenches: function(coords){
    $.ajax({
      url: "/api/benches",
      type: "GET",
      data: {bounds: coords},
      dataType: "json",
      success: function (data) {
        ApiActions.receiveAll(data);
      }
    });
  },

  createBench: function (bench, callback) {
    $.ajax({
      url: "/api/benches",
      type: "POST",
      data: {bench: bench},
      success: function (bench) {
        ApiActions.recieveOneBench(bench);
        if (callback) {
          callback(bench.id);
        }
      }
    });
  }
};
