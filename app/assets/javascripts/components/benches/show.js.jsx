(function (root) {

  root.BenchShow = React.createClass({

    render: function () {
      var bench = BenchStore.find(parseInt(this.props.routeParams.id), 'id');
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
            <CommentForm benchId={this.props.routeParams.id} />
            <CommentsIndex benchId={this.props.routeParams.id} />
          </section>
        </div>
      );
    }
  });
}(this));
