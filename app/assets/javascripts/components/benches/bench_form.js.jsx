(function (root) {
  var BenchForm = root.BenchForm = React.createClass({

    blankAttrs: {
      lat: '',
      long: '',
      description: ''
    },

    getInitialState: function () {
      return this.blankAttrs;
    },

    createBench: function (e) {
      e.preventDefault();
      var bench = {};
    },

    linkState: function () {},

    render: function () {
      return (
        <form className='bench-form' onSubmit={this.createBench}>

          <label htmlFor='bench_lat'>Bench Latitude:</label>
          <br />
          <input type='number' id='bench_lat' step='0.00000001' />
          <br />

          <label htmlFor='bench_long'>Bench Longitude:</label>
          <br />
          <input type='number' id='bench_long'  step='0.00000001' />
          <br />

          <label htmlFor='bench_description'>Bench Description:</label>
          <br />
          <textarea id='bench_description' />
          <br />

          <button>Create Bench</button>
          <br />
        </form>
      );
    }

  });

})(this);
