import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";

class Login extends Component {
    state = {
        password: "",
        username: "user",
        loggedIn: false
    }

    handleSubmit = e => {
        API.authenticateUser(this.state.username, this.state.password).then(res => {
            if(res.data.success){
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("user", res.data.user);
                this.setState({ loggedIn: true });
            } else {
                alert("That's not the right username or password");
            }
        });
    }

    handleOnChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    }

    componentWillMount(){
        const tokenFromSS = sessionStorage.getItem("token");
        const userFromSS = sessionStorage.getItem("user");
        if(tokenFromSS && userFromSS){
            API.validate(tokenFromSS, userFromSS)
                .then(res => {
                    if(res.data.success === true){
                        this.setState({loggedIn: true});
                    }
                }).catch(err => console.log(err));
        }
    }

    render() {
        return (
            this.state.loggedIn ? (
                <Redirect push to="/dashboard" />
            ) : (
                <div className="container">
                    <div className="row justify-content-center mt-5">
                        <div className="col-xl-5 col-sm-12 mt-5">
                            <div className="card mt-6 mb-5">
                                <div className="card-body">
                                    <span className="d-flex justify-content-center mt-3"><img className="houseImage" height="200" src="img/mern.png" alt="MERNistry of Magic" /></span>
                                    {/* To add individual user name support for logging purposes, just add these lines and change default `username` state to a blank string */}
                                    {/* <div className="input-group mb-3">
                                        <input type="text" className="form-control" onChange={this.handleOnChange} value={this.state.username} name="username" placeholder="Username" />
                                    </div> */}
                                    <div className="input-group mb-3 mt-5">
                                        <input type="password" className="form-control" onChange={this.handleOnChange} onKeyPress={this.handleKeyPress} value={this.state.password} name="password" placeholder="Password" />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" onClick={this.handleSubmit} type="submit">Login</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        );
    }
}

export default Login;
