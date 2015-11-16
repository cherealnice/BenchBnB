(function (root) {
  root.BenchesIndex = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function () {
      return { benches: BenchStore.all() };
    },

    componentDidMount: function () {
      BenchStore.addChangeListener(this.onBenchesIndexChange,
        BenchStore.BENCHES_INDEX_CHANGE_EVENT);
    },

    componentWillUnmount: function () {
      BenchStore.removeChangeListener(this.onBenchesIndexChange,
        BenchStore.BENCHES_INDEX_CHANGE_EVENT);
    },

    onBenchesIndexChange: function () {
      this.setState({ benches: BenchStore.all() });
    },

    onLiMouseEnter: function(e) {
      e.preventDefault();
      var target = e.currentTarget;
      var bench = BenchStore.find(target.innerText, 'description');
      MarkerStore.resetMarker(bench);
    },

    onLiMouseLeave: function(e) {
      e.preventDefault();
      var target = e.currentTarget;
      MarkerStore.resetMarker(null);
    },

    onLiClick: function (e) {
      e.preventDefault();
      var target = e.currentTarget;
      var bench = BenchStore.find(target.innerText, 'description');
      this.history.pushState(null, "/benches/" + bench.id, {});
    },

    render: function () {
      return <div className="benches">
        <h2>Locations:</h2>
        <ul>
      {this.state.benches.map(function (bench) {
        return <li
          onMouseLeave={this.onLiMouseLeave}
          onMouseEnter={this.onLiMouseEnter}
          onClick={this.onLiClick}
          key={bench.description}
          className="bench">
            {bench.description}
          </li>;
      }.bind(this))}</ul></div>;
    }
  });
}(this));
