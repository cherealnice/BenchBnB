FilterActions = {
  receiveNewParams: function (params) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.NEW_PARAMS,
      params: params
    });
  }
};
