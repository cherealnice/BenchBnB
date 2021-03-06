(function (root) {
  root.CommentForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    blankAttrs: {
      rating: 3,
      body: '',
    },

    getInitialState: function () {
      return this.blankAttrs;
    },

    createComment: function (e) {
      e.preventDefault();
      var comment = {};
      comment.rating = this.state.rating;
      comment.body = this.state.body;
      ApiUtil.createComment(comment, this.props.benchId);
      this.setState(this.blankAttrs);
    },

    render: function () {
      return (
        <form className="comment-form" onSubmit={this.createComment}>
          <div>
            <label htmlFor='comment-rating'>Rating:</label>
            <input
              type="number"
              id='comment-rating'
              min='1'
              max='5'
              step='1'
              valueLink={this.linkState("rating")} />
            <br />
          </div>

          <div>
            <label htmlFor='comment-body'>Comment Body:</label>
            <textarea
              id='comment-body'
              valueLink={this.linkState("body")}>
                {this.state.body}
            </textarea>
            <br />
          </div>

          <button>Submit</button>
        </form>
      );
    }



  });




}(this));
