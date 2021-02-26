import React from "react";
// import axios from 'axios';
class BlogForm extends React.Component {
    state = {
      title: this.props.title || '',
      author: this.props.author || '',
      description: this.props.description || '',
      username: this.props.username || ''
    }
    handleFormSubmit = (evt) => {
      evt.preventDefault();
      this.props.onFormSubmit({...this.state});
      const blog = {
        ...this.state, 
        author: 1,
        username : localStorage.getItem('username')
      }
    //   axios.post('http://localhost:8000/createblogs/', JSON.stringify(blog),{
    //     headers: {
    //             'Content-Type': 'application/json',
    //     },
    // })
    // .then(response => {
    //     response.json()
    //     console.log(response.data)
    //     this.setState({blogs: this.state.blogs.concat([blog])});
    //     this.props.history.push("/mainBlogPage")
    //     window.location.href("/mainBlogPage")
    // }).catch(err => {
    //     console.log(err)
    // })
    }
    handleTitleUpdate = (evt) => {
      this.setState({title: evt.target.value});
    }
    handleAuthorUpdate = (evt) => {
      this.setState({author: evt.target.value});
    }
    handleDescriptionUpdate = (evt) => {
      this.setState({description: evt.target.value});
    }
    render() {
      const buttonText = this.props.id ? 'Update Blog': 'Create Blog';
      return (
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label>
              Title
            </label>
            <input type="text" placeholder="Enter a title"
              value={this.state.title} onChange={this.handleTitleUpdate}
              className="form-control"
            />
          </div>
  
          {/* <div className="form-group">
            <label>
              Author
            </label>
            <input type="text" placeholder="Author's name"
              value={this.state.author} onChange={this.handleAuthorUpdate}
              className="form-control"
            />
          </div> */}

  
          <div className="form-group">
            <label>
              Description
            </label>
            <textarea className="form-control" placeholder="Blog Description"
              rows="5" value={this.state.description}
              onChange={this.handleDescriptionUpdate}
            >
              {this.state.description}
            </textarea>
          </div>
          <div className="form-group d-flex justify-content-between">
            <button type="submit" className="btn-secondary">
              {buttonText}
            </button>
            <button type="button" className="button" onClick={this.props.onCancelClick}>
              Cancel
            </button>
          </div>
        </form>
      )
    }
  }
  export default BlogForm