var BenchesIndex = React.createClass({

  getInitialState: function () {
    return { benches: BenchStore.all() };
  },

  componentDidMount: function () {
    BenchStore.addChangeListener(this.onBenchesIndexChange,
      BenchStore.BENCHES_INDEX_CHANGE_EVENT);
  },

  onBenchesIndexChange: function () {
    this.setState({ benches: BenchStore.all() });
  },

  render: function () {
    return <div className="benches">
      <h2>Locations:</h2>
      <ul>
    {this.state.benches.map(function (bench) {
      return <li
        onMouseLeave={this.props.onLiMouseLeave}
        onMouseEnter={this.props.onLiMouseEnter}
        key={bench.description}
        className="bench">
          {bench.description}
        </li>;
    }.bind(this))}</ul></div>;
  }
});
