import React from 'react';

import SidebarItem from './SidebarItem';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.location.pathname.includes('admin') ? 'admin' : 'event',
            // for each items, the key is the tab's value and
            // the value is the text to display
            items: {
                "event": "Évènements",
                "admin": "Gestion des admins",
            }
        };

        this._handleNavChange = this._handleNavChange.bind(this);
    }

    _handleNavChange(activeTab) {
        this.setState({ activeTab });
    }

    render() {
        return (
            <nav className="sidebar col-sm-3 col-md-2 d-none d-sm-block bg-light">
                <ul className="nav nav-pills flex-column">
                    {
                        Object.keys(this.state.items).map(itemKey => {
                            return <SidebarItem
                                        value={itemKey}
                                        text={this.state.items[itemKey]}
                                        activeTab={this.state.activeTab}
                                        isActive={this.state.activeTab === itemKey}
                                        onClick={this._handleNavChange} />
                        })
                    }
                </ul>
            </nav>
        );
    }

}
