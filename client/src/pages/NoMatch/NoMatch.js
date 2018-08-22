import React, { Component } from "react";
import { Link } from "react-router-dom";

class NoMatch extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row mx-5 my-5">
                    <h1 className="title">Whoops you're looking for a page that doesn't exist</h1>
                </div>
                <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
                    <Link to="/"><button type="button" className="btn btn-light mr-3">Scoreboard</button></Link>
                    <Link to="/login"><button type="button" className="btn btn-outline-light">Login</button></Link>
                </nav>
            </div>
        );
    }
}

export default NoMatch;
