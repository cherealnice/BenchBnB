(function (root) {

  root.BenchShow = React.createClass({
    render: function () {
      var bench = BenchStore.find(parseInt(this.props.routeParams.id), 'id');
      var center = {lat: bench.lat, lng: bench.lng};
      return (
        <div>
          <BenchesMap draggable={false} zoom={16} center={center} />
        </div>
      );
    }
  });
}(this));
