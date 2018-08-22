import React, { Component } from "react";
import API from "../../utils/API";

class Home extends Component {
    state = {
        data: "",
        challenge: ""
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
                this.setState({
                    data: data
                });
            })
            .catch(err => console.log(err));
    }

    componentWillMount() {
        API.getChallenges()
            .then(res => {
                this.setState({ challenge: res.data.challenge });
            });
        this.getData();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row mx-5 my-5">
                    <h1 className="title"><span className="mr-2"><img className="school-logo-image" src="./img/school-logo.png" alt="Georgia Tech" /></span> Coding Bootcamp House Points</h1>
                </div>
                <div className="row mx-xl-5 mx-sm-1 mt-6 mb-5 align-items-center">
                    {this.state.data ? this.state.data.map((item, i) => (
                        <div className="col-12 col-md-6 col-xl-3 mb-5" key={item.house}>
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
                <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
                    <span className="text-white"><strong><span role="img" aria-label="badge">🎖 Current challenge</span></strong> {this.state.challenge}</span>
                </nav>
            </div>
        );
    }
}

export default Home;
