(function (root) {

  root.CommentsIndex = React.createClass({
    getInitialState: function () {
      return this.getComments(parseInt(this.props.benchId));
    },

    getComments: function (benchId) {
      var bench = BenchStore.find(benchId, 'id');
      return ({bench: bench});
    },

    componentWillRecieveProps: function (newProps) {
      this.getComments(newProps.benchId);
    },

    render: function () {
      return (
        <div>
          {this.state.comments}
        </div>
      );
    }
  });


}(this));
