import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";

class Login extends Component {
    state = {
        password: "",
        loggedIn: false
    }

    handleSubmit = () => {
        API.comparePassword(this.state.password).then(res => {
            if(res.data.success){
                sessionStorage.setItem("auth", "yes");
                this.setState({ loggedIn: true });
            } else {
                alert("That's not the right password");
            }
        });
    }

    handleOnChange = e => {
        this.setState({ password: e.target.value });
    }

    componentWillMount(){
        const authFromSS = sessionStorage.getItem("auth");
        if(authFromSS === "yes"){
            this.setState({loggedIn:true});
        }
    }

    render() {
        return (
            this.state.loggedIn ? (
                <Redirect push to="/dashboard" />
            ) : (
                <div className="container">
                    <div className="row justify-content-center mt-5">
                        <div className="col-5 ">
                            <div className="card">
                                <div className="card-body">
                                    <p><img className="houseImage" height="200" src="img/mern.png" /></p>
                                    <div class="input-group mb-3">
                                        <input type="password" className="form-control" onChange={this.handleOnChange} value={this.state.password} placeholder="What's the secret passphrase" />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" onClick={this.handleSubmit} type="button">Login</button>
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
