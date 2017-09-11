import React from 'react';

export default class App extends React.Component {

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
                        <button>J'en suis <i className="fa fa-beer"></i></button>
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
