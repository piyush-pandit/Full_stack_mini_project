import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import secureAxios from "../secureAxios";
import { Link } from "react-router-dom";
// import footer from './components/footer'


const style = {
  error: { color: "red" },
  createMargin: {
    width: "30%",
    display: "inline-block"
  }
};

function LoginPage(props) {


  const { register, errors, handleSubmit } = useForm();
  

  const onSubmit = (evt) => {
    console.log(evt);
    const postData = JSON.stringify({
      password: evt.password,
      username: evt.username
    })
    secureAxios
      .post(
        "/api/token/", postData,
        {headers: {
          'Content-Type': 'application/json'}
        }
      )
      .then((response) => {
        const params = JSON.stringify({
          username : evt.username
        })
        secureAxios.get("/getuser",{
          params: {
            "username" :evt.username
        }
        })
        .then((response)=>{
          console.log(response.data)
          props.loginDetails(response.data) 
        }).catch(err=>{
          console.log(err)
        })
        console.log(response.data)
        localStorage.setItem("username", evt.username)
        localStorage.setItem("access", response.data.access)
        localStorage.setItem("refresh", response.data.refresh)
        props.saveToken(response.data)
        props.history.push("/blogPage");
      }).catch(err=>{
        console.log(err)
      })
  };
  // const signUp = () => {
  //   props.history.push("/signUpPage");
  // };

  return (
    <div className="loginPageCss">
      <form onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <br />
        <div>
          <lable style={style.createMargin}> Username : </lable>
          <input
            className="input"
            type="text"
            name="username"
            placeholder="Enter username"
            ref={register({
              required: { value: true, message: " *Username is Required " }
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
          Don't have an account ?
          <Link className="colorLink" to="/signUpPage">
            {" "}
            Register{" "}
          </Link>
        </span>
        <br />
        <br />
        <button className="button" type="submit">
          Login In
        </button>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loginDetails: (val) => dispatch({ type: "LOGIN_DETAILS", payload: val }),
    saveToken: (val) => dispatch({type: "SAVE_TOKEN", payload : val})
  };
};
export default connect(null, mapDispatchToProps)(LoginPage);
