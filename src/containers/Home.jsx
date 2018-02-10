import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom';

import Beer             from '../components/home/Beer';
import BeerList         from '../components/home/BeerList'
import Banner           from '../components/home/Banner'
import Footer           from '../components/home/Footer'
import ShowOldEvents    from '../components/home/ShowOldEvents';

import { monthToString }    from '../helpers/dateHelper';
import registrationHelper   from '../helpers/localStorage/registrationHelper';
import redirectHelper       from '../helpers/localStorage/redirectHelper';

import EventActions         from '../actions/EventActions';
import AuthActions          from '../actions/AuthActions';

import EventStore           from '../stores/EventStore';
import AuthStore            from '../stores/AuthStore';

import { fetchNextEvent } from '../actions'

import '../scripts/covervid.js';
import '../scripts/main.js';

const mapStateToProps = state => {
  return {
    nextEvent: state.events.items.filter(event => state.events.next === event._id)[0]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchNextEvent: () => dispatch(fetchNextEvent())
  }
}

class Home extends React.Component {

    constructor() {
        super();

        this.state = {
            registration: registrationHelper.get(),
            width: window.innerWidth
        };

        this.handleOldEventsClick = this.handleOldEventsClick.bind(this);
        this._onAuthStoreChange = this._onAuthStoreChange.bind(this);
        this._handleWindowSizeChange = this._handleWindowSizeChange.bind(this);
        this.handleBannerClick = this.handleBannerClick.bind(this);
    }

    componentDidMount() {
        // check if there is an authorization code
       const fullUrl = window.location.href;
       const searchPart = fullUrl.split('?')[1];

       if (searchPart) {
           const parameters = searchPart.split('&');

           const authorization_code = parameters
               .map(p => p.split('='))
               .find(p => p[0] === "authorization_code");

           // if there is an authorization_code, send it to get an access token
           if (authorization_code) {
               let lastAction = redirectHelper.get();
               if (lastAction == "register") {
                   EventActions.register(authorization_code[1]);
               } else if (lastAction == "unregister") {
                   EventActions.unregister({authorization_code: authorization_code[1]});
               } else if (lastAction == "login") {
                   AuthActions.callback(authorization_code[1]);
               }
           }
       }

       // listen stores changes
       AuthStore.addChangeListener(this._onAuthStoreChange);
       // trigger action for the store to load the event
       this.props.fetchNextEvent()

       // window resize listenner
       window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        // remove listeners
        AuthStore.removeChangeListener(this._onAuthStoreChange);
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    _handleWindowSizeChange() {
      this.setState({ width: window.innerWidth });
    }

    _onAuthStoreChange() {
        if (AuthStore.isAdmin) {
            // use pushState to remove the authorization_code from url
            window.history.pushState("yolo", "yolo", "/");
            this.props.history.push('/dashboard/event');
        }
    }

    handleBannerClick() {
      AuthActions.redirect(this.state.registration ? "unregister" : "register")
    }

    handleAdminClick() {
      AuthActions.redirect("login");
    }

    handleOldEventsClick() {
      this.props.history.push("/olds");
    }

    render() {
        const diplayColumn = this.state.width <= 900;

        let nextEventDate = null;
        if (this.props.nextEvent) {
            let when = new Date(this.props.nextEvent.when);
            nextEventDate = `${when.getDate()} ${monthToString(when.getMonth())}`;
        }

        return (
            <div>
              <Banner
                event={this.props.nextEvent}
                date={nextEventDate}
                registration={this.state.registration}
                onClick={this.handleBannerClick} />
              {
                nextEventDate &&
                <BeerList beers={this.props.nextEvent.beers} diplayColumn={diplayColumn} />
              }
              <ShowOldEvents onClick={this.handleOldEventsClick} />
              <Footer onAdminClick={this.handleAdminClick} />
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
