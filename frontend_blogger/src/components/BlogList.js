import React from "react"
import EditableBlog from './EditableBlog'
class BlogList extends React.Component {
    render() {
      console.log(this.props.Blogs, "hiiiiiii")
      const Blogs = this.props.Blogs.map(Blog => (
        <EditableBlog
          key={Blog.id}
          id={Blog.id}
          title={Blog.title}
          author={Blog.author}
          username={Blog.username}
          description={Blog.description}
          authdetails={this.props.authdetails}
          onDeleteClick={this.props.onDeleteClick}
          onUpdateClick={this.props.onUpdateClick}
        ></EditableBlog>
      ));
      return (
        <div>
          {Blogs}
        </div>
      );
    }
  }
  export default BlogList