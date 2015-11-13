var BenchesSearch = React.createClass({

  getInitialState: function () {
    return ({ detailMarker: null });
  },

  onLiMouseEnter: function(e) {
    e.preventDefault();
    var target = e.currentTarget;
    var bench = BenchStore.find(target.innerText);
    MarkerStore.resetMarker(bench);
    this.setState({detailMarker: bench});
  },

  onLiMouseLeave: function(e) {
    e.preventDefault();
    var target = e.currentTarget;
    MarkerStore.resetMarker(null);
    this.setState({detailMarker: null});
  },

  render: function () {
    var key = 0;
    if (this.state.detailMarker) {
      key = this.state.detailMarker.description;
    }
    return (
      <div>
        <BenchesMap detailMarker={this.state.detailMarker}/>
        <BenchesIndex
          onLiMouseLeave={this.onLiMouseLeave}
          onLiMouseEnter={this.onLiMouseEnter}/>
      </div>
    );
  }
});
