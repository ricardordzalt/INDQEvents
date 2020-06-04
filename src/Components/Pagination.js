import React, { Component } from 'react';

class Pagination extends Component {
    render() {
        let pages = [];
        for(let i=1; i<=this.props.pages;i++){
            pages.push(<button key={i+20} value={i} className={this.props.page === i ? "btn btn-dark" : "btn btn-outline-secondary"} onClick={this.props.action}>{i}</button>)
        }
        return (
                <div className="text-center p-5 pagination col-12">
                    { pages }
                </div>
        );
    };
};

export default Pagination;