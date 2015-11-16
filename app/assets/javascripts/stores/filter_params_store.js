(function (root){
  var _params = {
    minSeating: 1,
    maxSeating: 20,
    mapBounds: {}
  };

  var updateParams = function (newParams) {
    Object.keys(newParams).forEach(function(key) {
      if (_params[key]) {
        _params[key] = newParams[key];
      }
    });
  };

  root.FilterParamsStore = $.extend({}, EventEmitter.prototype, {

    PARAMS_CHANGE_EVENT: "params_change_event",

    params: function () {
      return _params;
    },

    addChangeListener: function (callback, event) {
      this.on(event, callback);
    },

    removeChangeListener: function (callback, event) {
      this.on(event, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case FilterConstants.NEW_PARAMS:
          updateParams(payload.params);
          FilterParamsStore.emit(FilterParamsStore.PARAMS_CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
