import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import secureAxios from "../secureAxios";
const style = {
  error: { color: "red" },
  createMargin: {
    width: "30%",
    display: "inline-block"
  }
};
function SignUpPage(props) {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (evt) => {
    console.log(evt);
    const postData = JSON.stringify({
      password: evt.password,
      username: evt.username,
      email: evt.email
    })
    secureAxios
      .post(
        "/createuser/", postData,
        {headers: {
          'Content-Type': 'application/json'}
        }
      )
      .then((response) => {
        console.log(response.data);
        // props.signUpDetails({
        //   password: evt.password,
        //   username: evt.username,
        //   email: evt.email
        // }) 

        props.history.push("/");
      }).catch(err=>{
        console.log(err)
      })
  };
  return (
    <div className="signUpPageCss">
      <form onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <br />
        <div>
          <lable style={style.createMargin}>UserName : </lable>
          <input
            className="input"
            type="text"
            name="username"
            placeholder="Enter userName"
            ref={register({
              required: { value: true, message: " *Username is Required " }
            })}
          />{" "}
          {errors.fname && (
            <span style={style.error}>{errors.username.message}</span>
          )}
          <br />
          <br />
        </div>
        <div>
          <lable style={style.createMargin}> E-Mail : </lable>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Enter Email Id"
            ref={register({
              required: { value: true, message: " *Email-Id is Required " },
              pattern: {
                value: /^[\w-\.]+@([\w]+\.)+[\w]+$/,
                message: " *email is invalid"
              }
            })}
          />
          {errors.email && (
            <span style={style.error}>{errors.email.message}</span>
          )}
        </div>{" "}
        <br />
        <div>
          <lable style={style.createMargin}>Password : </lable>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Enter password"
            ref={register({
              required: { value: true, message: " *password is required " },
              minLength: {
                value: 4,
                message: " *password should be more than 4 characters "
              }
            })}
          />
          {errors.password && (
            <span style={style.error}>{errors.password.message}</span>
          )}
        </div>{" "}
        <br />
        <span className="highlightme">
          Already have an account ?
          <Link className="colorLink" to="/">
            {" "}
            Login{" "}
          </Link>
        </span>
        <br />
        <br />
        <button className="button" type="submit" >
          Register
        </button>
      </form>
    </div>
  );
}

// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     signUpDetails: (val) => dispatch({ type: "SIGNUP_DETAILS", payload: val })
//   };
// };
export default connect()(SignUpPage);
