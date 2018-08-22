import React, { Component } from "react";
import API from "../../utils/API";

class Home extends Component {
    state = {
        data: ""
    };

    getData = () => {
        API.getPoints()
            .then(res => {
                const data = res.data.sort((a,b) => {
                    if (a.points > b.points)
                        return -1;
                    if (a.points < b.points)
                        return 1;
                    return 0;
                });
                console.log(data);
                this.setState({
                    data: data
                });
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
                    <h1 className="title">Georgia Tech Coding Bootcamp House Points</h1>
                </div>
                <div className="row mx-5 mt-5 align-items-center">
                    {this.state.data ? this.state.data.map((item, i) => (
                        <div className="col-12 col-md-6 col-xl-3 mb-5">
                            <div className="card">
                                {i === 0 ? (
                                    <div className="card-header text-center">
                                        <span role="img" aria-label="Trophy">🏆</span> {item.house} is Currently in First Place <span role="img" aria-label="Trophy">🏆</span>
                                    </div>
                                ) : "" }
                                <div className="card-body">
                                    <p><img className="houseImage" height="200" src={`img/${item.image}`} alt={item.house} /></p>
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
