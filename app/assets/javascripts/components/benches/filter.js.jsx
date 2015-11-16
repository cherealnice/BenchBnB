(function (root) {
  root.FilterParams = React.createClass({
    mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

    getInitialState: function () {
      return parseFilterParams(FilterParamsStore.params());
    },

    handleSeatingSubmit: function (e) {
      FilterActions.receiveNewParams(this.state);
    },

    render: function () {
      return (
        <form onMouseUp={this.handleSeatingSubmit}>
          <label htmlFor='seating-min'>Minimum Number of Seats:</label>
          <input type="range" id="seating-min" min="1" max="20"
            valueLink={this.linkState('minSeating')} />
          <output
            htmlFor="seating-min"
            id="seating-min-output">
            {this.state.minSeating}
          </output>

          <label htmlFor='seating-max'>Maximum Number of Seats:</label>
          <input type="range" id="seating-max" min="1" max="20"
            valueLink={this.linkState('maxSeating')} />
            <output
              htmlFor="seating-max"
              id="seating-max-output">
              {this.state.maxSeating}
            </output>
          <br />

        </form>
      );
    },
  });

  var parseFilterParams = function (params) {
    minSeating = params.minSeating;
    maxSeating = params.maxSeating;
    return {minSeating: minSeating, maxSeating: maxSeating};
  };
}(this));
