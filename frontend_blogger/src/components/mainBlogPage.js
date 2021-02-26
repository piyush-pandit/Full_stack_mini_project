import React from "react";
import BlogList from './BlogList';
import secureAxios from '../secureAxios';
import ToggleableBlogForm from './ToggleableBlogForm';
import {connect} from "react-redux"
class MainBlogPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            authdetails : {}
            
        }

        
    }
    componentDidMount() {
        const username = localStorage.getItem("username")
        if (username == null ){
            this.props.history.push('/')
        }
        else {
        secureAxios.get('/totalblogs/', {
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem("access")}`
              }
        })
            .then(response => {
                this.setState({blogs: response.data, authdetails: this.props.authCredentials});
                console.log(response.data)
            })
            .catch(err=>{
                console.log(err)
              })
            }   
    }

   
       
    createNewBlog = (blog) => {
        console.log(localStorage.getItem("username"), "localstorage")
        const postblog = {...blog, username : localStorage.getItem("username"), author : 1}
        console.log(postblog)
        secureAxios.post('/createblogs/', JSON.stringify(postblog),{
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("access")}`
            },
        })
        .then(response => {
            // response.json()
            console.log(response.data, "comment")
            this.setState({blogs: this.state.blogs.concat([response.data])});
        }).catch(err => {
            console.log(err)
        })
    }
  
    updateBlog = (newBlog) => {
        secureAxios.put(`/updateblogs/${newBlog.id}/`, JSON.stringify(newBlog), {
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("access")}`
            },
        }).then(response => {
            console.log(response.data)
            const newBlogs = this.state.blogs.map(blog => {
                if(blog.id === newBlog.id) {
                    return Object.assign({}, newBlog)
                } else {
                    return blog;
                }
            });
            this.setState({blogs: newBlogs});
        }).catch(err => {
            console.log(err)
        })
    }

    deleteBlog = (blogId) => {
        secureAxios.delete(`/deleteblogs/${blogId}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            },
        })
        .then((response) => {
            console.log(response.data)
            this.setState({blogs: this.state.blogs.filter(blog => blog.id !== blogId)})
        }).catch(err => {
            console.log(err)
        })
    }

    render(){
        return(
        <div>
             <main className="d-flex justify-content-center my-4">
              <div  className="col-5">
                  <BlogList
                      Blogs={this.state.blogs}
                      authdetails = {this.state.authdetails}
                      onDeleteClick={this.deleteBlog}
                      onUpdateClick={this.updateBlog}
                  />
                  <ToggleableBlogForm
                      onBlogCreate={this.createNewBlog}
                  />
              </div>
          </main>
        </div>
        );
       
    }
}

const mapStateToProps = (state,props) => {
    return{
        authCredentials: state.authCredentials
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
      loginDetails: (val) => dispatch({ type: "LOGIN_DETAILS", payload: val }),
      saveToken: (val) => dispatch({type: "SAVE_TOKEN", payload : val})
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(MainBlogPage);