import React from 'react';

import AuthService from '../services/AuthService';

export default class App extends React.Component {

    constructor() {
        super();

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
               AuthService.sendAuthorizationCode(authorization_code[1])
                    .then(response => console.log(response))
                    .catch(err => console.log(err));
           }
       }

    }

    takePart() {
        AuthService.getRedirectLink()
            .then(response => window.location.replace(response.data.redirectUri))
            .catch(err => console.log(err));
    }y

    render() {
        return (
            <div>
                <section className="banner">
                    <video className="banner-video" autoPlay>
                        <source src="assets/videos/banner.mp4" type="video/mp4"/>
                        <img src="assets/images/banner.png" alt=""/>
                    </video>
                    <div className="banner-inner">
                        <h1>Club bières</h1><br />
                        <p>Prochaine dégustation le 17 mars.</p>
                        <button onClick={this.takePart}>J'en suis <i className="fa fa-beer"></i></button>
                    </div>
                </section>

                <section>
                    <div id="beers" className="content">
                        <h1>Les bières</h1>

                        <div className="side-image">
                            <div className="images-wrapper"></div>
                            <div className="side-image-content">
                                <h4>Mystère</h4>
                                <h1>Inconnue</h1>
                                <p>Pas encore révélée ! Probablement meilleur qu'une Koenigs.</p>
                            </div>
                        </div>
                        <div className="side-image">
                            <div className="side-image-content">
                                <h4>Mystère</h4>
                                <h1>Inconnue</h1>
                                <p>Pas encore révélée ! Probablement meilleur qu'une Koenigs.</p>
                            </div>
                            <div className="images-wrapper"></div>
                        </div>
                        <div className="side-image">
                            <div className="images-wrapper"></div>
                            <div className="side-image-content">
                                <h4>Mystère</h4>
                                <h1>Inconnue</h1>
                                <p>Pas encore révélée ! Probablement meilleur qu'une Koenigs.</p>
                            </div>
                        </div>
                        <div className="side-image">
                            <div className="side-image-content">
                                <h4>Mystère</h4>
                                <h1>Inconnue</h1>
                                <p>Pas encore révélée ! Probablement meilleur qu'une Koenigs.</p>
                            </div>
                            <div className="images-wrapper"></div>
                        </div>
                    </div>
                </section>

                <footer className="footer" role="contentinfo">
                    <ul className="footer-social">
                        <li><a href="mailto:club-bieres@utt.fr"><i className="fa fa-envelope"></i></a></li>
                        <li><a href="https://www.facebook.com/groups/806374509420087/?fref=ts"><i className="fa fa-facebook"></i></a></li>
                    </ul>
                </footer>
            </div>
        );
    }

}
