var BenchesMap = React.createClass({

  getInitialState: function () {
    return { map: 'undefined', markers: []};
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

    var benches = BenchStore.all() || [];
    var markers = this.state.markers.slice() || [];

    addMarkers.call(this, benches, markers);
    removeMarkers.call(this, benches, markers);


    // if (benches) {
    //   benches.forEach(function (bench) {
    //     debugger;
    //
    //     var markerOverlap = markers.filter(function (marker) {
    //
    //       return(
    //         benchLat === markerLat &&
    //         benchLng === markerLng
    //       );
    //     });
    //
    //     if (markerOverlap.length > markers.length) {
    //       markerOverlap.forEach(function (overLapMarker) {
    //         overLapMarker.setMap(null);
    //         markers.splice(markers.indexOf(overLapMarker), 1);
    //       });
    //     } else {
    //     }
      //
      //   this.setState({ markers: markers });
      // }.bind(this));
    // }
  },

  makeMarker: function (bench) {
    var LatLng = { lat: bench.lat, lng: bench.long };
    return (
      new google.maps.Marker({
        position: LatLng,
        title: bench.description
      })
    );
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

var addMarkers = function (benches, markers) {
  for (var i = 0; i < benches.length; i++) {
    var matched = false;
    var benchMarker = this.makeMarker(benches[i]);
    var benchLat = benchMarker.getPosition().lat();
    var benchLng = benchMarker.getPosition().lng();

    for (var j = 0; j < markers.length; j++) {
      var markerLat = markers[i].getPosition().lat();
      var markerLng = markers[i].getPosition().lng();

      if (benchLat === markerLat || benchLng === markerLng) {
        matched = true;
      }
    }

    if (!matched) {
      benchMarker.setMap(this.state.map);
      markers.push(benchMarker);
    }
  }
};

var removeMarkers = function (benches, markers) {
  for (i = 0; i < markers.length; i++) {
    var matched = false;
    var markerLat = markers[i].getPosition().lat();
    var markerLng = markers[i].getPosition().lng();

    for (j = 0; j < benches.length; j++) {
      var benchMarker = this.makeMarker(benches[i]);
      var benchLat = benchMarker.getPosition().lat();
      var benchLng = benchMarker.getPosition().lng();

      if (benchLat === markerLat || benchLng === markerLng) {
        matched = true;
      }
    }

    if (!matched) {
      benchMarker.setMap(null);
      markers.splice(markers.indexOf(benchMarker));
    }
  }
};
