import React from 'react';

import { Link } from 'react-router-dom';

import Beer             from '../home/Beer';
import BeerList         from '../home/BeerList'
import Banner           from '../home/Banner'
import Footer           from '../home/Footer'
import ShowOldEvents    from '../home/ShowOldEvents';

import { monthToString }    from '../../helpers/dateHelper';
import registrationHelper   from '../../helpers/localStorage/registrationHelper';
import redirectHelper       from '../../helpers/localStorage/redirectHelper';

import EventActions         from '../../actions/EventActions';
import AuthActions          from '../../actions/AuthActions';

import EventStore           from '../../stores/EventStore';
import AuthStore            from '../../stores/AuthStore';

import '../../scripts/covervid.js';
import '../../scripts/main.js';

export default class Home extends React.Component {

    constructor() {
        super();

        this.state = {
            nextEvent: null,
            registration: registrationHelper.get(),
            width: window.innerWidth
        };

        this._onEventStoreChange = this._onEventStoreChange.bind(this);
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
       EventStore.addChangeListener(this._onEventStoreChange);
       AuthStore.addChangeListener(this._onAuthStoreChange);
       // trigger action for the store to load the event
       EventActions.getNextEvent();

       // window resize listenner
       window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        // remove listeners
        EventStore.removeChangeListener(this._onEventStoreChange);
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

    _onEventStoreChange() {
        this.setState({
            nextEvent: EventStore.getNext(),
            registration: registrationHelper.get()
        });
    }

    handleBannerClick() {
      AuthActions.redirect(this.state.registration ? "unregister" : "register")
    }

    handleAdminClick() {
      AuthActions.redirect("login");
    }

    render() {
        const diplayColumn = this.state.width <= 900;

        let nextEventDate = null;
        if (this.state.nextEvent) {
            let when = new Date(this.state.nextEvent.when);
            nextEventDate = `${when.getDate()} ${monthToString(when.getMonth())}`;
        }

        return (
            <div>
              <Banner
                event={this.state.nextEvent}
                date={nextEventDate}
                registration={this.state.registration}
                onClick={this.handleBannerClick} />
              {
                nextEventDate &&
                <BeerList beers={this.state.nextEvent.beers} diplayColumn={diplayColumn} />
              }
              <ShowOldEvents history={this.props.history} />
              <Footer onAdminClick={this.handleAdminClick} />
            </div>
        );
    }

}
