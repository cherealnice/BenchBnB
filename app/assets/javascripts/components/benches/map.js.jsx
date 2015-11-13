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

    var newMarkers = addMarkers.call(this, benches, markers);
    markers.concat(newMarkers);
    markers = removeMarkers.call(this, benches, markers);
    this.setState({markers: markers});
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
  var newMarkerArray = [];

  for (var i = 0; i < benches.length; i++) {
    var matched = false;
    var benchMarker = this.makeMarker(benches[i]);
    var benchLat = benchMarker.getPosition().lat();
    var benchLng = benchMarker.getPosition().lng();

    if (markers.length > 1) {
      for (var j = 0; j < markers.length; j++) {
        var markerLat = markers[j].getPosition().lat();
        var markerLng = markers[j].getPosition().lng();

        if (benchLat === markerLat || benchLng === markerLng) {
          matched = true;
        }
      }
    }

    if (!matched) {
      benchMarker.setMap(this.state.map);
      newMarkerArray.push(benchMarker);
    }
  }
  newMarkerArray.forEach(function(newMarker) {
    markers.push(newMarker);
  });

  return markers;
};

var removeMarkers = function (benches, markers) {
  var iArray = [];
  for (i = 0; i < markers.length; i++) {
    var matched = false;
    var markerLat = markers[i].getPosition().lat();
    var markerLng = markers[i].getPosition().lng();

    if (benches.length > 0) {
      for (j = 0; j < benches.length; j++) {
        var benchMarker = this.makeMarker(benches[j]);
        var benchLat = benchMarker.getPosition().lat();
        var benchLng = benchMarker.getPosition().lng();

        if (benchLat === markerLat || benchLng === markerLng) {
          matched = true;
        }
      }
    }

    if (!matched) {
      markers[i].setMap(null);
      iArray.push(i);
    }
  }
  iArray.reverse().forEach(function(idx) {
    markers.splice(idx, 1);
  });

  return markers;
};
