var BenchesSearch = React.createClass({

  getInitialState: function () {
    return ({ detailMarker: null });
  },

  onLiHover: function(e) {
    e.preventDefault();
    var target = e.currentTarget;
    var bench = BenchStore.find(target.innerText);
    MarkerStore.resetMarker(bench);
    this.setState({detailMarker: bench});
  },

  render: function () {
    var key = 0;
    if (this.state.detailMarker) {
      key = this.state.detailMarker.description;
    }
    return (
      <div>
        <BenchesMap detailMarker={this.state.detailMarker}/>
        <BenchesIndex onLiHover={this.onLiHover}/>
      </div>
    );
  }
});
