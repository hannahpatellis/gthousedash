import React, { Component } from "react";

class NoMatch extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row mx-5 my-5">
                    <h1 className="title">Whoops you're looking for a page that doesn't exist</h1>
                </div>
            </div>
        );
    }
}

export default NoMatch;
