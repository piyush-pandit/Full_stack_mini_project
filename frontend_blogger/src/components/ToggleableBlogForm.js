import React from 'react';
import BlogForm from './BlogForm';
import {SiAddthis} from 'react-icons/si'
class ToggleableBlogForm extends React.Component {
    state = {
      inCreateMode: false
    }
    handleCreateClick = () => {
      this.setState({inCreateMode: true});
    }
    leaveCreateMode = () => {
      this.setState({inCreateMode: false});
    }
    handleCancleClick = () => {
      this.leaveCreateMode();
    }
    handleFormSubmit = (Blog) => {
      this.leaveCreateMode();
      this.props.onBlogCreate(Blog);
    }
    render() {
      if (this.state.inCreateMode) {
        return (
          <div className="mb-3 p-4" style={{boxShadow: '0 0 10px #ccc'}} >
            <BlogForm
              onFormSubmit={this.handleFormSubmit}
              onCancelClick={this.handleCancleClick}></BlogForm>
          </div>
  
        )
      }
      return (
        <button onClick={this.handleCreateClick} className="btn btn-secondary">
          <SiAddthis/>
        </button>
      );
    }
  }

export default ToggleableBlogForm 