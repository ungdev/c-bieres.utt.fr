import React from 'react';

import { monthToString } from '../../helpers/dateHelper';

import { Link } from 'react-router-dom';
import Beer from '../home/Beer.jsx';

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
            nextEvent: null
        };

        this.takePart = this.takePart.bind(this);
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
               EventActions.register(authorization_code[1]);
           }
       }

       // listen the store change
       EventStore.addChangeListener(this._onEventStoreChange.bind(this));
       // trigger action for the store to load the event
       EventActions.getNextEvent();

    }

    componentWillUnmount() {
        EventStore.removeChangeListener(this._onEventStoreChange);
    }

    _onEventStoreChange() {
        this.setState({ nextEvent: EventStore.getNext() })
    }

    takePart() {
        AuthActions.redirect();
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
                        <h1>Club bières</h1><br />
                        {
                            nextEventDate
                            ?
                                <div>
                                    <p>Prochaine dégustation le {nextEventDate}.</p>
                                    <button onClick={this.takePart}>J'en suis <i className="fa fa-beer"></i></button>
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
                                this.state.nextEvent.beers.map((beer, i) => <Beer key={i} left={i%2 === 0} beer={beer} />)
                            }
                        </div>
                    </section>
                }

                <footer className="footer" role="contentinfo">
                    <ul className="footer-social">
                        <li><a href="mailto:club-bieres@utt.fr"><i className="fa fa-envelope"></i></a></li>
                        <li><a href="https://www.facebook.com/groups/806374509420087/?fref=ts"><i className="fa fa-facebook"></i></a></li>
                    </ul>
                    <span className="dashboard-link">
                        <Link to={'dashboard/event'}>Admin</Link>
                    </span>
                </footer>
            </div>
        );
    }

}
