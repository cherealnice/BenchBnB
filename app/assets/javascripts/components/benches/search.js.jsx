var BenchesSearch = React.createClass({

  getInitialState: function () {
    return ({ detailMarker: null });
  },

  render: function () {
    var key = 0;
    if (this.state.detailMarker) {
      key = this.state.detailMarker.description;
    }
    return (
      <div>
        <BenchesMap detailMarker={this.state.detailMarker}/>
        <BenchesIndex />
      </div>
    );
  }
});
