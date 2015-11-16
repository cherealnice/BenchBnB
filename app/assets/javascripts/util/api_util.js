ApiUtil = {
  fetchBenches: function(params){
    $.ajax({
      url: "/api/benches",
      type: "GET",
      data: {mapParams: params},
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
