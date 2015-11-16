(function(root){
  root.BenchesMap = React.createClass({

    mixins: [ReactRouter.History],

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

    componentWillUnmount: function () {
      BenchStore.removeChangeListener(this.onBenchIndexChange,
        BenchStore.BENCHES_INDEX_CHANGE_EVENT);
      MarkerStore.removeChangeListener(this.onMarkerDetailChange,
        MarkerStore.INDEX_HOVER_CHANGE_EVENT);
    },

    onMarkerDetailChange: function () {
      removeOldMarker.call(this);
      var newMarker = addNewMarker.call(this);

      this.setState({ detailMarker: newMarker });
    },

    onBenchIndexChange: function () {
      var benches = BenchStore.all() || [];
      var markers = this.state.markers.slice() || [];
      this.destroyMarkers(markers);
      var newMarkers = this.addMarkers(benches);
      this.setState({markers: newMarkers});
    },

    destroyMarkers: function (markers) {
      markers.forEach(function (marker) {
        marker.setMap(null);
      });
    },

    addMarkers: function (benches) {
      newMarkers = [];
      benches.forEach(function (bench) {
        newMarker = makeMarker(bench);
        newMarker.setMap(this.state.map);
        newMarkers.push(newMarker);
      }.bind(this));

      return newMarkers;
    },

    handleMapDblClick: function (e) {
      var lat = e.latLng.lat();
      var lng = e.latLng.lng();
      this.history.pushState(null, "/benches/new", {lat: lat, lng: lng});
    },

    handleIdle: function () {
      var coords = this.parseBounds();

      FilterActions.receiveNewParams({mapBounds: coords});
    },

    render: function () {
      return(
        <div className="map" ref="map">
        </div>
      );
    },

    parseBounds: function () {
      var bounds = this.state.map.getBounds();

      var northEastLat = bounds.getNorthEast().lat();
      var northEastLng = bounds.getNorthEast().lng();
      var southWestLat = bounds.getSouthWest().lat();
      var southWestLng = bounds.getSouthWest().lng();

      return {
        northEast: { lat: northEastLat, lng: northEastLng },
        southWest: { lat: southWestLat, lng: southWestLng }
      };
    }
  });

  var addNewMarker = function () {
    var newMarker = MarkerStore.marker();
    if (newMarker) {
      var targetMarker = findMarker.call(this, newMarker.description);
      targetMarker.setAnimation(google.maps.Animation.BOUNCE);
    }
    return newMarker;
  };

  var removeOldMarker = function () {
    if (this.state.detailMarker) {

      var oldMarker = findMarker.call(this,
        this.state.detailMarker.description);

      oldMarker.setAnimation(null);
    }
  };

  var findMarker = function (description) {
    for (var i = 0; i < this.state.markers.length; i++) {
      if (this.state.markers[i].title === description) {
        return this.state.markers[i];
      }
    }
  };

  var makeMarker = function (bench) {
    var LatLng = { lat: bench.lat, lng: bench.lng };
    return (
      new google.maps.Marker({
        position: LatLng,
        title: bench.description,
        icon: 'http://i.imgur.com/iz2DEMm.png',
        animation: google.maps.Animation.DROP
      })
    );
  };

  var createMap = function () {
    var map = React.findDOMNode(this.refs.map);
    var center = this.props.center;

    var mapOptions = {
      center: center,
      draggable: this.props.draggable,
      zoom: this.props.zoom
    };

    var newMap = new google.maps.Map(map, mapOptions);

    newMap.addListener('idle', this.handleIdle);

    newMap.addListener('dblclick', this.handleMapDblClick);
    this.setState({map: newMap});
  };
})(this);
