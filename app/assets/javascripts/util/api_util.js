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

  fetchBench: function(id) {
    $.ajax({
      url: "/api/benches" + id,
      type: "GET",
      data: {id: id},
      success: function (bench) {
        ApiActions.receiveOneBench(bench);
      }
    });
  },

  createBench: function (bench, callback) {
    $.ajax({
      url: "/api/benches",
      type: "POST",
      data: {bench: bench},
      success: function (bench) {
        ApiActions.receiveOneBench(bench);
        if (callback) {
          callback(bench.id);
        }
      }
    });
  }
};
