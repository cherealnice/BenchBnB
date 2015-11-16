var BenchesSearch = React.createClass({

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
    if (this.state.detailMarker) {
      key = this.state.detailMarker.description;
    }
    return (
      <div>
        <section className='map-section group'>
          <BenchesMap detailMarker={this.state.detailMarker}/>
        </section>
        <section className='sidebar group'>
          <header></header>
          <BenchesIndex />
        </section>
      </div>
    );
  }
});
