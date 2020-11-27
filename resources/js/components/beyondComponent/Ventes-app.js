import React,{useEffect ,useContext , useState} from 'react';
import Loading from 'react-loading';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Context } from './storeRedux/context';

export const Ventes = () => {
    // ! State
    const [chartData,setChartData] = useState({});
    const [loading, setloading] = useState(true);
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
    useEffect(() => {
        window.scrollTo(0, 100);
        Chart();
    },[]);
    // ? End of Methods

    return (
        <div className="box">
            {loading ? <Loading height={231} width={100} className='load' type='spin' color='red' /> : <Line data={chartData} width={50} height={14}/>}
        </div>
    )
}
