import React,{useEffect , useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Container } from './container';
import { BrowserRouter as Router} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const App = (props) => {
    const [state, setState] = useState();
    useEffect(() => {
        axios.get('http://localhost:8000/Ventes')
        .then(response => {
            if (response.status === 200) {
                console.log(response.data);
            }
        })
    },[]);
    return (
        <div className="container bg-white">
            <div className="row">
                <div className="col text-info text-center mt-2">
                    <h3 className="display-4">Analyse des ventes </h3>
                    <p>Des donnes pour vous aider mieux a comprendre et a developper votre societe</p>
                </div>
            </div>
            <div className="row justify-content-between p-2">
                <div className="col">
                    <div className="col">
                        <input type="date" className="date form-control-sm border-info" />
                    </div>
                </div>
                <div className="col text-right">
                    <a href="" className="btn btn-outline-info">Imprimez <i className="fa fa-print"></i>  <i className=""></i> </a>
                </div>
            </div>
            <nav>
                <div className="nav row-cols-3 nav-tabs" id="nav-tab" role="tablist">
                  <NavLink activeClassName="active" className="nav-link text-center" to="/cadorim">
                    <h5>Ventes <i className="fa fa-question-circle "></i></h5>
                    <p>Tout les modes de paiement</p>
                    <p><button className="btn btn-danger ml-3 rounded-pill"><i className="fa fa-sort-down"></i> -68%</button></p>
                  </NavLink>
                  <NavLink activeClassName="active" className="nav-link text-center" to="/transaction" >
                    <h5>transaction <i className="fa fa-question-circle"></i></h5>
                    <p>Tout les modes de paiement</p>
                  <p><button   className="btn btn-danger ml-3 rounded-pill"><i className="fa fa-sort-down"></i> -68%</button></p>
                </NavLink>
                  <NavLink activeClassName="active" className="nav-link text-center" to="Moyen">
                    <h5>Prix de vente de moyen <i className="fa fa-question-circle"></i></h5>
                    <p>Tout les modes de paiement</p>
                  <p><button className="btn btn-danger ml-3 rounded-pill"><i className="fa fa-sort-down"></i> -68%</button> </p>
                  </NavLink>
                </div>
              </nav>
            <Container/>
        </div>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
        <Router>
            <App/>
        </Router>
    , document.getElementById('app'));
}
