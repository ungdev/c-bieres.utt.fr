import React from 'react'
import createReactClass from 'create-react-class'
import SidebarItem from './SidebarItem'

const Sidebar = createReactClass({
  getInitialState() {
    return {
      activeTab: this.props.location.pathname.includes('admin') ? 'admin' : 'event',
      // <tab's value>: <text to display>
      items: {
        "event": "Évènements",
        "admin": "Gestion des admins",
      }
    }
  },
  onTabClick(activeTab) {
    this.setState({ activeTab })
  },
  render() {
    return (
      <nav className="sidebar col-sm-3 col-md-2 d-none d-sm-block bg-light">
        <ul className="nav nav-pills flex-column">
          {
            Object.keys(this.state.items).map(key => {
              return <SidebarItem
                        value={key}
                        text={this.state.items[key]}
                        activeTab={this.state.activeTab}
                        isActive={this.state.activeTab === key}
                        onClick={this.onTabClick} />
            })
          }
        </ul>
      </nav>
    )
  }
})

export default Sidebar
