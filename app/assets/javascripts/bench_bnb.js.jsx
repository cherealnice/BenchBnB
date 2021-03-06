$(function () {
  var root = document.getElementById('content');
  var Route = ReactRouter.Route;
  var Router = ReactRouter.Router;
  var IndexRoute = ReactRouter.IndexRoute;

  var App = React.createClass({
    render: function(){
      return (
          <div>
            {this.props.children}
          </div>
      );
    }
  });

  var routes = (
      <Route path="/" component={App}>
        <IndexRoute component={BenchesSearch} />
        <Route path="benches/new" component={BenchForm} />
        <Route path="benches/:id" component={BenchShow} />
      </Route>
  );
  React.render(<Router>{routes}</Router>, root);
});
