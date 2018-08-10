import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends Component {
    state = {
        password: "",
        loggedIn: false
    }

    handleSubmit = () => {
        if (this.state.password === "youaregay") {
            sessionStorage.setItem("auth", "yes");
            console.log("preformed");
            this.setState({ loggedIn: true });
        }
    }

    handleOnChange = e => {
        this.setState({ password: e.target.value });
    }

    componentWillMount(){
        const authFromSS = sessionStorage.getItem("auth");
        console.log(authFromSS)
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
                                        <input type="password" class="form-control" onChange={this.handleOnChange} value={this.state.password} placeholder="What's the secret passphrase" />
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
