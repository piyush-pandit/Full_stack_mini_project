import React from 'react'
import secureAxios from '../secureAxios'
import {FaEdit} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
class Blog extends React.Component {
  constructor(){
    super();
      this.state= {
        authorDetails : null
      }
    

  }
  componentDidMount(){
    const author = {id: this.props.author}
    secureAxios.get("getuser/")
  }
    render() {
      console.log(this.props, "omggg")
      return (
        <div className="card" >
          <div className="card-header d-flex justify-content-between">
            <span>
              <strong>Title: </strong>{this.props.title}
            </span>
            {this.props.author== this.props.authdetails.id ?
            <div>
              <span onClick={this.props.onEditClick} className="mr-2"><FaEdit className="far fa-edit"></FaEdit></span>
              <span onClick={this.props.onDeleteClick}><MdDelete className="fas fa-trash"></MdDelete></span>
            </div>
            :<></>
            }
            <div>
              <span onClick={this.props.onEditClick} className="mr-2"><FaEdit className="far fa-edit"></FaEdit></span>
              <span onClick={this.props.onDeleteClick}><MdDelete className="fas fa-trash"></MdDelete></span>
            </div>
          </div>
          <div className="card-body">
            {this.props.description}
          </div>
          <div className="card-footer">
            <strong>Author:</strong>  {this.props.username}
          </div>
        </div>
      );
    }
  }
export default Blog  