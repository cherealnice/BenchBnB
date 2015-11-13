(function(root){
  root.BenchesMap = React.createClass({

    getInitialState: function () {
      return { map: 'undefined',
        markers: [],
        detailMarker: MarkerStore.marker() };
    },

    componentDidMount: function () {
      BenchStore.addChangeListener(this.onBenchIndexChange,
        BenchStore.BENCHES_INDEX_CHANGE_EVENT);
      MarkerStore.addChangeListener(this.onMarkerDetailChange,
        MarkerStore.INDEX_HOVER_CHANGE_EVENT);

      createMap.call(this);
    },

    onMarkerDetailChange: function () {
      var newMarker = MarkerStore.marker();
      if (this.state.detailMarker) {
        var OldMarker = this.findMarker(this.state.detailMarker.description);
        OldMarker.setAnimation(null);
      }

      if (newMarker) {
        var targetMarker = this.findMarker(newMarker.description);
        targetMarker.setAnimation(google.maps.Animation.BOUNCE);
      }
      this.setState({ detailMarker: newMarker });
    },

    findMarker: function (description) {
      for (var i = 0; i < this.state.markers.length; i++) {
        if (this.state.markers[i].title === description) {
          return this.state.markers[i];
        }
      }
    },

    onBenchIndexChange: function () {

      var benches = BenchStore.all() || [];
      var markers = this.state.markers.slice() || [];

      var newMarkers = addMarkers.call(this, benches, markers);
      markers.concat(newMarkers);
      markers = removeMarkers.call(this, benches, markers);
      this.setState({markers: markers});
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

  var makeMarker = function (bench) {
    var LatLng = { lat: bench.lat, lng: bench.long };
    return (
      new google.maps.Marker({
        position: LatLng,
        title: bench.description,
        animation: google.maps.Animation.DROP
      })
    );
  };

  var addMarkers = function (benches, markers) {
    var newMarkerArray = [];

    for (var i = 0; i < benches.length; i++) {
      var matched = false;
      var benchMarker = makeMarker(benches[i]);
      var benchLatLng = parseLatLng(benchMarker);

      if (markers.length > 1) {
        for (var j = 0; j < markers.length; j++) {
          var markerLatLng = parseLatLng(markers[i]);

          if (sameLatLng(benchLatLng, markerLatLng)) {
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

  var parseLatLng = function (marker) {
    return {
      lat: marker.getPosition().lat(),
      lng: marker.getPosition().lng()
    };
  };

  var sameLatLng = function (LatLng1, LatLng2) {
    if (LatLng1.lat === LatLng2.lat &&
        LatLng1.lng === LatLng2.lng) {
          return true;
        }
    return false;
  };

  var removeMarkers = function (benches, markers) {
    var iArray = [];
    for (i = 0; i < markers.length; i++) {
      var matched = false;
      var markerLatLng = parseLatLng(markers[i]);

      if (benches.length > 0) {
        for (j = 0; j < benches.length; j++) {
          var benchMarker = makeMarker(benches[j]);
          var benchMarkerLatLng = parseLatLng(benchMarker);

          if (sameLatLng(markerLatLng, benchMarkerLatLng)) {
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

  var createMap = function () {
    var map = React.findDOMNode(this.refs.map);

    var mapOptions = {
      center: {lat: 40.7459036, lng: -73.9908681},
      zoom: 12
    };

    var newMap = new google.maps.Map(map, mapOptions);

    newMap.addListener('idle', function () {
      var coords = parseBounds.call(this);

      ApiUtil.fetchBenches(coords);
    });

    this.setState({map: newMap});
  };
})(this);
