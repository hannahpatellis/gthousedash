import React, { Component } from "react";

class Login extends Component {
    state = {
        password: ""
    }
    
    handleSubmit = () => {
        if(this.state.password === "youaregay"){
            sessionStorage.setItem("auth", "yes");
            // this.props.router.push('/dashboard');
        }
    }

    handleOnChange = e => {
        this.setState({password: e.target.value});
    }
    
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center mt-5">
                        <div className="col-5 ">
                            <div className="card">
                                <div className="card-body">
                                    <p><img className="houseImage" height="200" src="img/mern.png" /></p>
                                    <div class="input-group mb-3">
                                        <input type="password" class="form-control" onChange={this.handleOnChange} value={this.state.password} placeholder="What's the secret passphrase" />
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary" onClick={this.handleSubmit} type="button">Login</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default Login;
