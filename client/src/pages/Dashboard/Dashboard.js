import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";

class Dashboard extends Component {
    state = {
        data: "",
        currentUser: "",
        loggedIn: false
    };

    getData = () => {
        API.getPoints()
            .then(res =>
                this.setState({
                    data: res.data
                })
            )
            .catch(err => console.log(err));
    }

    handleIncrease = house => {
        API.addPoint(house, this.state.currentUser)
            .then(res => {
                this.getData();
            })
            .catch(err => console.log(err));
    }

    handleDecrease = house => {
        API.subtractPoint(house, this.state.currentUser)
            .then(res => {
                this.getData();
            })
            .catch(err => console.log(err));
    }

    logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        this.setState({loggedIn: false, currentUser: ""});
    }

    componentWillMount() {
        const tokenFromSS = sessionStorage.getItem("token");
        const userFromSS = sessionStorage.getItem("user");
        if(tokenFromSS && userFromSS){
            API.validate(tokenFromSS, userFromSS)
                .then(res => {
                    if(res.data.success === true){
                        this.setState({loggedIn: true, currentUser: userFromSS});
                    }
                    this.getData();
                }).catch(err => console.log(err));
        }
    }

    render() {
        return (
            this.state.loggedIn ? (
                <div className="container-fluid">
                    <div className="row mx-5 my-5">
                        <div className="xx-nav-container">
                            <div className="xx-left"><h1 className="title">GT House Points Dashboard</h1></div> <div className="xx-right"><button type="button" onClick={this.logout} className="btn btn-outline-light">Logout</button></div>
                        </div>
                    </div>
                    <div className="row mx-5 mt-5">
                        {this.state.data ? this.state.data.map(item => (
                            <div className="col-12 col-md-6 col-xl-3 mb-5" key={item.house}>
                                <div className="card">
                                    <div className="card-body">
                                        <p><img className="houseImage" height="200" src={`img/${item.image}`} alt={item.house} /></p>
                                        <h5 className="houseName">{item.house}</h5>
                                        <h6 className="houseMaster mb-2 text-muted">House Master: {item.master}</h6>
                                        <h1 className="housePoints">{item.points}</h1>
                                        <hr />
                                        <p>
                                            <div className="btn-group btn-group-lg">
                                                <button type="button" className="btn btn-secondary" onClick={() => this.handleDecrease(item.house)}>-</button>
                                                <button type="button" className="btn btn-secondary" onClick={() => this.handleIncrease(item.house)}>+</button>
                                            </div>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )) : ""}
                    </div>
                </div>
            ) : (
                <div className="container-fluid">
                    <div className="row mx-5 my-5">
                        <h1 className="title">You need to be logged in to view this page</h1>
                    </div>
                </div>
            )
        );
    }
}

export default Dashboard;
