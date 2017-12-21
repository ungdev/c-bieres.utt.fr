import React from 'react';

import { Link } from 'react-router-dom';

export default class SidebarItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const isActive = this.props.activeTab === this.props.value;

        return (
            <li className="sidebar__tab">
                <Link className={"nav-link sidebar__tab__link " + (isActive && "active")}
                        onClick={_ => this.props.onSelect(this.props.value)}
                        to={`/dashboard/${this.props.value}`}>
                    <i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;
                    {this.props.text}
                </Link>
            </li>
        );
    }

}
