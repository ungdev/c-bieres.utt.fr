import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class'

import { Link } from 'react-router-dom'

import Beer from './Beer'
import BeerList from './BeerList'
import Banner from './Banner'
import Footer from './Footer'
import ShowOldEvents from './ShowOldEvents'

import { toHumanDate, monthToString } from '../helpers/dateHelper'
import redirectHelper from '../helpers/localStorage/redirectHelper'

import '../scripts/covervid.js'
import '../scripts/main.js'

const Home = createReactClass({
  getInitialState() {
    return {
      width: window.innerWidth
    }
  },
  componentDidMount() {
    // check if jwt in localStorage
    this.props.checkExistingJWT()
    // check if already registered to next event
    this.props.checkRegistration()

    // check if there is an authorization code
    const fullUrl = window.location.href;
    const searchPart = fullUrl.split('?')[1];

    if (searchPart) {
      const parameters = searchPart.split('&');

      const authorization_code = parameters
        .map(p => p.split('='))
        .find(p => p[0] === "authorization_code");

      // if there is an authorization_code, auth the user
      if (authorization_code) {
        this.props.sendAuthorizationCode(authorization_code[1])
      }
    }
    // trigger action for the store to load the event
    this.props.fetchNextEvent()
    // window resize listenner
    window.addEventListener('resize', this.handleWindowSizeChange)
  },
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  },
  handleWindowSizeChange() {
    this.setState({ width: window.innerWidth })
  },
  onBannerClick() {
    console.log("jwt", this.props.jwt)
    console.log("jwt", this.props.registration)
    if (this.props.jwt) {
      this.props.registration
        ? this.props.unregister()
        : this.props.register()
    } else {
      this.props.login()
    }
  },
  onDashboardLinkClick() {
    if (this.props.isAdmin) {
      this.props.goDashboard()
    } else {
      this.props.login()
    }
  },
  render() {
    const diplayColumn = this.state.width <= 900;

    let nextEventDate = this.props.nextEvent ? toHumanDate(this.props.nextEvent.when) : null

    return (
      <div>
        <Banner
          event={this.props.nextEvent}
          date={nextEventDate}
          registration={this.props.registration}
          onClick={this.onBannerClick} />
        {
          nextEventDate &&
          <BeerList beers={this.props.nextEvent.beers} diplayColumn={diplayColumn} />
        }
        <ShowOldEvents />
        <Footer onAdminClick={this.onDashboardLinkClick} />
      </div>
    )
  }
})
export default Home
