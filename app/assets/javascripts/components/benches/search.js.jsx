var BenchesSearch = React.createClass({

  getInitialState: function () {
    return ({ detailMarker: null });
  },

  render: function () {
    var key = 0;
    if (this.state.detailMarker) {
      key = this.state.detailMarker.description;
    }
    return (
      <div>
        <section className='map-section group'>
          <BenchesMap detailMarker={this.state.detailMarker}/>
        </section>
        <section className='sidebar group'>
          <header></header>
          <BenchesIndex />
        </section>
      </div>
    );
  }
});
