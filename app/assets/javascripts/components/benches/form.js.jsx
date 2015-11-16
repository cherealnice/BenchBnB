// (function (root) {
  var BenchForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

    blankAttrs: {
      lat: '',
      long: '',
      description: '',
      seating: 1
    },

    getInitialState: function () {
      return this.blankAttrs;
    },

    createBench: function (e) {
      e.preventDefault();
      var bench = {};
      bench.lng = this.state.long;
      bench.lat = this.state.lat;
      bench.description = this.state.description;
      bench.seating = this.state.seating;
    },

      createPokemon: function (event) {
    event.preventDefault();
    var pokemon = {};
    Object.keys(this.state).forEach(function (key) {
      if(key != "move_1" && key != "move_2") { pokemon[key] = this.state[key]; }
    }.bind(this))
    pokemon.moves = [this.state.move_1, this.state.move_2];
    ApiUtil.createPokemon(pokemon, function (id) {
      this.history.pushState(null, "/pokemon/" + id, {});
    }.bind(this));
    this.setState(this.blankAttrs);
  },

    render: function () {

      return (
        <form className='bench-form' onSubmit={this.createBench}>

          <label htmlFor='bench-lat'>Bench Latitude:</label>
          <br />
          <input type='number' id='bench-lat' step='0.001'
            valueLink={this.linkState('lat')} />
          <br />

          <label htmlFor='bench-long'>Bench Longitude:</label>
          <br />
          <input type='number' id='bench-long'  step='0.001'
            valueLink={this.linkState('long')} />
          <br />

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

// })(this);
