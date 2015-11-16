(function (root) {
  root.BenchForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

    getInitialState: function () {
      return {
        lat: this.props.location.query.lat,
        lng: this.props.location.query.lng,
        description: '',
        seating: 1
      };
    },

    createBench: function (e) {
      e.preventDefault();
      var bench = {};
      bench.lng = this.state.lng;
      bench.lat = this.state.lat;
      bench.description = this.state.description;
      bench.seating = this.state.seating;
      ApiUtil.createBench(bench, function (id) {
        this.history.pushState(null, "/", {});
      }.bind(this));
    },

    render: function () {

      return (
        <form className='bench-form' onSubmit={this.createBench}>

          <label htmlFor='bench-description'>Bench Description:</label>
          <br />
          <textarea id='bench-description'
            valueLink={this.linkState('description')} />
          <br />

          <label htmlFor='bench-seating'>Seating:</label>
          <br />
         <input type="range" id='bench-seating' defaultValue={1}
            min={1} max={20} step={1} valueLink={this.linkState('seating')} />
          <br />
         <output htmlFor="bench-seating" id="seating-output">{this.state.seating}</output>
         <br />

          <button>Create Bench</button>
          <br />
        </form>
      );
    }

  });

})(this);
