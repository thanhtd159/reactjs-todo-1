import React from 'react';
import Sort from "./Sort";
import Search from "./Search";

class Control extends React.Component {
    render() {
        return (
            <div className="row mt-15">
                <Search></Search>
                <Sort></Sort>
            </div>
        );
    }
}
export default Control;
