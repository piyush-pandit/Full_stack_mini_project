import React from 'react'
import BlogForm from './BlogForm'
import Blog from './Blog'
class EditableBlog extends React.Component {
    state = {
      inEditMode: false
    };
    enterEditMode = () => {
      this.setState({inEditMode: true});
    }
    leaveEditMode = () => {
      this.setState({inEditMode: false});
    }
    handleDelete = () => {
      this.props.onDeleteClick(this.props.id);
    }
    handleUpdate = (Blog) => {
      this.leaveEditMode()
      Blog.id = this.props.id;
      this.props.onUpdateClick(Blog);
    }
    render() {
      const component = () => {
        if(this.state.inEditMode) {
          return (
            <BlogForm
              id={this.props.id}
              title={this.props.title}
              author={this.props.author}
              username = {this.props.username}
              description={this.props.description}
              onCancelClick={this.leaveEditMode}
              onFormSubmit={this.handleUpdate}
            />
          );
        }
        return (
          <Blog
            title={this.props.title}
            author={this.props.author}
            username={this.props.username}
            description={this.props.description}
            authdetails={this.props.authdetails}
            onEditClick={this.enterEditMode}
            onDeleteClick={this.handleDelete}
          />
        )
      }
      return (
        <div className="mb-3 p-4" style={{boxShadow: '0 0 10px #ccc'}} >
          {component()}
        </div>
      )
    }
  }

export default EditableBlog