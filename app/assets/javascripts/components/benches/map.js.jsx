var BenchesMap = React.createClass({

  getInitialState: function () {
    return { map: 'undefined'};
  },

  componentDidMount: function () {
    BenchStore.addChangeListener(this.onBenchIndexChange,
      BenchStore.BENCHES_INDEX_CHANGE_EVENT);

    this.createMap();
  },

  createMap: function () {

    var map = React.findDOMNode(this.refs.map);

    var mapOptions = {
      center: {lat: 40.8698595, lng: -74.3088759},
      zoom: 12
    };

    var newMap = new google.maps.Map(map, mapOptions);

    newMap.addListener('idle', function () {
      var coords = parseBounds.call(this);

      ApiUtil.fetchBenches(coords);
    });

    this.setState({map: newMap});


  },

  onBenchIndexChange: function () {

    var benches = BenchStore.all();
    benches.forEach(function (bench) {
      var LatLng = { lat: bench.lat, lng: bench.long };
      new google.maps.Marker({
        position: LatLng,
        map: this.state.map,
        title: bench.description
      });
    }.bind(this));
  },

  render: function () {
    return(
      <div className="map" ref="map">
      </div>
    );
  }
});

  var parseBounds = function () {
    var bounds = this.getBounds();

    var northEastLat = bounds.getNorthEast().lat();
    var northEastLng = bounds.getNorthEast().lng();
    var southWestLat = bounds.getSouthWest().lat();
    var southWestLng = bounds.getSouthWest().lng();

    return {
      northEast: { lat: northEastLat, lng: northEastLng },
      southWest: { lat: southWestLat, lng: southWestLng }
    };
  };
