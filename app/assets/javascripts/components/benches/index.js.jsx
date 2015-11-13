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
    return <div>{this.state.benches.map(function (bench) {
      return <div key={bench.description} className="bench">{bench.description}</div>;
    })}</div>;
  }
});
