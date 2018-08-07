import React, { Component } from "react";
import API from "../../utils/API";

class Dashboard extends Component {
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

    handleIncrease = house => {
        API.addPoint(house)
            .then(res => {
                this.getData();
            })
            .catch(err => console.log(err));
    }

    handleDecrease = house => {
        API.subtractPoint(house)
            .then(res => {
                this.getData();
            })
            .catch(err => console.log(err));
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row mx-5 my-5">
                    <h1 className="title">GT House Points Dashboard</h1>
                </div>
                <div className="row mx-5 mt-5">
                    {this.state.data ? this.state.data.map(item => (
                        <div className="col-3" key={item.house}>
                            <div className="card">
                                <div className="card-body">
                                    <p><img className="houseImage" height="200" src={`img/${item.image}`} /></p>
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
        );
    }
}

export default Dashboard;
