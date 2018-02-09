import React from 'react';

import { Switch, Route } from 'react-router-dom';

import OldEventsList    from '../components/olds/OldEventsList';
import OldEvent         from '../components/olds/OldEvent';

export default class OldEvents extends React.Component {

    constructor() {
        super();

        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid old-events__jumbotron">
                    <div className="container">
                        <h1 className="display-3">Anciens évènements</h1>
                        <p className="lead">
                            Tu trouvera ci dessous la liste des anciens évènements du club bières,
                            avec l'ensemble des bières pour chaque évènement.
                        </p>
                        <hr className="my-4" />
                        <p>
                            <button type="button" onClick={this._handleClick} className="btn btn-primary">
                                Retour à la page principal
                            </button>
                        </p>
                    </div>
                </div>

                <Switch>
                    <Route path='/olds/:id' component={OldEvent}/>
                    <Route path='/olds/' component={OldEventsList}/>
                </Switch>
            </div>
        );
    }

}
