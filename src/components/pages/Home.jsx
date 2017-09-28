import React from 'react';

import { monthToString } from '../../helpers/dateHelper';
import { Link } from 'react-router-dom';
import Beer from '../home/Beer.jsx';

import registrationHelper from '../../helpers/localStorage/registrationHelper';
import redirectHelper from '../../helpers/localStorage/redirectHelper';
import EventActions from '../../actions/EventActions';
import EventStore from '../../stores/EventStore';
import AuthActions from '../../actions/AuthActions';
import AuthStore from '../../stores/AuthStore';

import '../../../assets/js/vendor/covervid.js';
import '../../../assets/js/main.js';

export default class Home extends React.Component {

    constructor() {
        super();

        this.state = {
            nextEvent: null,
            registration: registrationHelper.get()
        };

        this.takePart = this.takePart.bind(this);
        this._loginDashboard = this._loginDashboard.bind(this);
        this._onEventStoreChange = this._onEventStoreChange.bind(this);
        this._onAuthStoreChange = this._onAuthStoreChange.bind(this);
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
    }

    componentWillUnmount() {
        // remove listeners
        EventStore.removeChangeListener(this._onEventStoreChange);
        AuthStore.removeChangeListener(this._onAuthStoreChange);
    }

    _onAuthStoreChange() {
        if (AuthStore.isAdmin)
            this.props.history.push('/dashboard/event');
    }

    _onEventStoreChange() {
        this.setState({
            nextEvent: EventStore.getNext(),
            registration: registrationHelper.get()
        });
    }

    takePart() {
        AuthActions.redirect("register");
    }

    unRegister() {
        AuthActions.redirect("unregister");
    }

    _loginDashboard() {
        AuthActions.redirect("login");
    }

    render() {

        let nextEventDate = null;
        if (this.state.nextEvent) {
            let when = new Date(this.state.nextEvent.when);
            nextEventDate = `${when.getDate()} ${monthToString(when.getMonth())}`;
        }

        return (
            <div>
                <section className="banner">
                    <video className="banner-video" autoPlay>
                        <source src="assets/videos/banner.mp4" type="video/mp4"/>
                        <img src="assets/images/banner.png" alt=""/>
                    </video>
                    <div className="banner-inner">
                        <h1>Club bières</h1>
                        {
                            nextEventDate
                            ?
                                <div>
                                    <p>Prochaine dégustation le {nextEventDate}.</p>
                                    {
                                        this.state.registration == this.state.nextEvent._id
                                        ?
                                            <button type="button" className="btn btn-danger btn-lg" onClick={this.unRegister}>Me désinscrire</button>
                                        :
                                            <button type="button" className="btn btn-primary btn-lg" onClick={this.takePart}>J'en suis <i className="fa fa-beer"></i></button>
                                    }
                                </div>
                            :
                                <p>
                                    Aucun évènement prévu pour le moment.
                                </p>
                        }
                    </div>
                </section>

                {
                    nextEventDate &&
                    <section>
                        <div id="beers" className="content">
                            <h1>Les bières</h1>
                            {
                                this.state.nextEvent.beers.length
                                ?
                                    this.state.nextEvent.beers.map((beer, i) => <Beer key={i} left={i%2 === 0} beer={beer} />)
                                :
                                    <div className="no-beer-message">
                                        Les bières seront ajoutées prochainement.
                                    </div>
                            }
                        </div>
                    </section>
                }

                <footer className="footer" role="contentinfo">
                    <ul className="footer-social">
                        <li><a href="mailto:club-bieres@utt.fr"><i className="fa fa-envelope"></i></a></li>
                        <li><a href="https://www.facebook.com/groups/806374509420087/?fref=ts"><i className="fa fa-facebook"></i></a></li>
                        <li className="dashboard-link">
                            <button type="button" onClick={this._loginDashboard} className="btn btn-link">Admin</button>
                        </li>
                    </ul>
                </footer>
            </div>
        );
    }

}
