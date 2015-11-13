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
  }
};
