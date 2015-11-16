(function (root) {

  root.BenchShow = React.createClass({

    componentWillRecieveProps: function (newProps) {
      this.fetchBench(newProps.routParams.id);
    },

    fetchBench: function (id) {
      debugger;
      ApiUtil.fetchBench(id);
    },

    render: function () {
      debugger;
      var bench = BenchStore.find(parseInt(this.props.routeParams.id), 'id');

      if (!bench) {
        setTimeout(this.fetchBench.bind(this, this.props.routeParams.id), 0);
      }

      var center = {lat: bench.lat, lng: bench.lng};
      return (
        <div>
          <section className="map-section">
            <BenchesMap
              draggable={false}
              zoom={16}
              center={center}
              centerMarker={true} />
          </section>

          <section className="sidebar">
            <h1>{bench.description}</h1>
            <h3>Lat: {bench.lat}, Long: {bench.lng}</h3>
            <ReviewForm benchId={this.props.routeParams.id}/>
          </section>
        </div>
      );
    }
  });
}(this));
