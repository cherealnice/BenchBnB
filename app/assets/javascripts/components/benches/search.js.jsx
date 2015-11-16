(function (root) {
  root.BenchesSearch = React.createClass({

    getInitialState: function () {
      return ({ detailMarker: null, params: FilterParamsStore.params() });
    },

    componentDidMount: function () {
      FilterParamsStore.addChangeListener(this.onParamsChange,
        FilterParamsStore.PARAMS_CHANGE_EVENT);
    },

    componentWillUnmount: function () {
      FilterParamsStore.removeChangeListener(this.onParamsChange,
        FilterParamsStore.PARAMS_CHANGE_EVENT);
    },

    onParamsChange: function () {
      this.setState({ params: FilterParamsStore.params() });
      ApiUtil.fetchBenches(this.state.params);
    },

    render: function () {
      var key = 0;
      var center = {lat: 40.7459036, lng: -73.9908681};
      if (this.state.detailMarker) {
        key = this.state.detailMarker.description;
      }
      return (
        <div>
          <section className='map-section group'>
            <BenchesMap center={center}
              zoom={12}
              draggable={true}
              detailMarker={this.state.detailMarker} />
          </section>
          <section className='sidebar group'>
            <header>
              <FilterParams />
            </header>
            <BenchesIndex />
          </section>
        </div>
      );
    }
  });
}(this));
