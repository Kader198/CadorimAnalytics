import React,{useEffect ,useContext , useState} from 'react';
import Loading from 'react-loading';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Context } from './storeRedux/context';

export const Ventes = () => {
    // ! State
    const [chartData,setChartData] = useState({});
    const [loading, setloading] = useState(true);
    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();
    let data = {};
    let arrayOfAmount = [];
    let arrayOfdays = [];
    const {state,dispatch} = useContext(Context);
    // ! End of State

    // ? Methods
    const Chart = () => {
        console.log(state,dispatch);
        axios.get('http://localhost:8000/api/Ventes')
        .then((response) => {
            if(response.status === 200) {
                console.log(response.data);
                data = response.data;
                setloading(false);
                arrayOfdays = data.days.map((amount) => parseInt(amount));
                arrayOfAmount = data.eachAmount.map((amount) => parseInt(amount.payment_amount));
                setChartData({
                    labels: arrayOfdays,
                    datasets: [{
                        label: 'les ventes ',
                        data: arrayOfAmount,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                })
            }
        })
    }
    const loadDates = () => {
        axios.post('http://localhost:8000/api/dateVentes',{dateEnd,dateStart})
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        Chart();
    },[]);
    // ? End of Methods

    return (
        <div className="box text-monospace">
            <div className='col mt-1'>
            <label className='badge-info p-2 shadow-sm  rounded-pill text-white'>Date de debut</label>{' '}
                <input type="date" className="date form-control-sm" onChange={(e) => setDateStart(e.target.value)}/>{' '}{' '}
            <label className=' badge-info p-2 shadow-sm  rounded-pill text-white mr-2'> Date fin</label>{' '}
                <input type="date" className="date form-control-sm " onChange={(e) => setDateEnd(e.target.value)}/>
                <button className='btn btn-outline-info float-right' onClick={loadDates}>Charger les dates :</button>
            </div>
            {loading ? <Loading height={231} width={100} className='load' type='spin' color='red' /> : <Line data={chartData} width={50} height={14}/>}
        </div>
    )
}
