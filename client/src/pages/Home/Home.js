import React, { Component } from "react";
import API from "../../utils/API";

class Home extends Component {
    state = {
        data: ""
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

    componentWillMount() {
        this.getData();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row mx-5 my-5">
                    <h1 className="title">Georgia Tech Coding Bootcamp House Points</h1>
                </div>
                <div className="row mx-5 mt-5">
                    {this.state.data ? this.state.data.map(item => (
                        <div className="col-12 col-md-6 col-xl-3 mb-5">
                            <div className="card">
                                <div className="card-body">
                                    <p><img className="houseImage" height="200" src={`img/${item.image}`} /></p>
                                    <h5 className="houseName">{item.house}</h5>
                                    <h6 className="houseMaster mb-2 text-muted">House Master: {item.master}</h6>
                                    <h1 className="housePoints">{item.points}</h1>
                                </div>
                            </div>
                        </div>
                    )) : ""}
                </div>
            </div>
        );
    }
}

export default Home;
