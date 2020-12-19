import 'react-dates/initialize';
import React,{useEffect , useState,useContext  ,useRef} from 'react';
import ReactDOM from 'react-dom';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import { Container } from './container';
import { BrowserRouter as Router} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Context, ContextProvider } from './beyondComponent/storeRedux/context';
import 'react-dates/lib/theme/DefaultTheme';
import './App.css';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import { DatePicker } from './beyondComponent/DatePicker';
import { Tabs } from 'react-bootstrap';
import { Tab } from 'bootstrap';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { motion } from 'framer-motion'
import { Line } from './beyondComponent/Charts/Line';
import Button from '@material-ui/core/Button'

const App = (props) => {
    // * Elements with references
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const handle = useFullScreenHandle();
    // * End of Elements with references
    // ! State

    const [state, setState] = useState({});
    const [loading, setloading] = useState(true);
    // ! End of State

    // ? Methods
    const getCommonResults = () => {
        axios.get('http://localhost:8000/commonResults')
        .then(response => {
            if (response.status === 200) {
                setloading(true);
                setState(response.data);
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getCommonResults();
        console.log('A date example ',new Date(1997, 1, 9));
    },[]);
    // ? End of Methods

    return (
        <motion.div initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 40
        }} >
        <div className="container bg-white shadow-lg" ref={componentRef}>
            <div className="row bg-info">
                <div className="col text-white text-center mt-2 ">
                    <h3 className="display-5">Analyse des ventes {props.counter} </h3>
                    <p>Des donnes pour vous aider mieux a comprendre et a developper votre societe</p>
                </div>
            </div>
            <div className="row justify-content-between p-2">
                <div className="col text-right">
                    <motion.button whileHover={{ scale: 1.1 }}  whileTap={{ scale: 0.9 }} className='btn  btn-primary mr-2' onClick={handle.enter}><i className="fa fa-desktop"></i></motion.button>
                    <motion.button  whileHover={{ scale: 1.1 }}   whileTap={{ scale: 0.9 }} className="btn btn-primary" onClick={handlePrint}>Imprimez <i className="fa fa-print"></i>  <i className=""></i></motion.button>
                </div>
            </div>
            <FullScreen handle={handle}>
                <div className="nav row-cols-3 bg-white nav-tabs" id="nav-tab" role="tablist">
                  <NavLink activeClassName="active tabO" className="nav-link p-3 with-3d-shadow text-center" to="/cadorim">
                    <h5>Ventes <i className="fa fa-question-circle "></i></h5>
                    <p>Tout les modes de paiement</p>
                    <p><button className="btn btn-danger  rounded-pill"><i className="fa fa-sort-down"></i> -38%</button> { state.sumOfeachAmount } MRU</p>
                  </NavLink>
                  <NavLink activeClassName="active tabO" className="nav-link p-3 text-center" to="/transaction" >
                    <h5>transaction <i className="fa fa-question-circle"></i></h5>
                    <p>Tout les modes de paiement</p>
                    <p><button  className="btn btn-danger ml-3 rounded-pill"><i className="fa fa-sort-down"></i> -20%</button> { state.numOfoperation }</p>
                </NavLink>
                  <NavLink activeClassName="active tabO" className="nav-link p-3 text-center" to="Moyen">
                    <h5>Prix de vente de moyen <i className="fa fa-question-circle"></i></h5>
                    <p>Tout les modes de paiement</p>
                  <p><button className="btn btn-danger ml-3 rounded-pill"><i className="fa fa-sort-down"></i> -25%</button> { state.venteMoyen } MRU </p>
                  </NavLink>
                </div>
                <Container/>
            </FullScreen>
            <div className="row ">
                <Line />
            </div>
        </div>
        </motion.div>
    );
    }




if (document.getElementById('app')) {
    ReactDOM.render(
        <Router>
            <ContextProvider>
                <App/>
            </ContextProvider>
        </Router>
    ,document.getElementById('app'));
}

export default App;
