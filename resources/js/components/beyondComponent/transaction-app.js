import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Loading from 'react-loading';

export const Transaction = () => {
    const [chartData,setChartData] = useState({});
    const [loading, setloading] = useState(true);
    let data = {};
    let arrayOfdays = [];
    let arrayOftransaction = [];
    const Chart = () => {
        axios.get('http://localhost:8000/api/Transaction')
        .then((response) => {
            if(response.status === 200){
                console.log(response.data);
                data = response.data;
                arrayOfdays = data.days.map((amount) => parseInt(amount));
                arrayOftransaction = data.arrayOftransaction.map((amount) => parseInt(amount));
                setChartData({
                    labels: arrayOfdays,
                    datasets: [{
                        label: 'les transactions',
                        data: arrayOftransaction,
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
                setloading(false);
            }})
            .catch(err => console.log(err));
        }
    useEffect(() => {
        window.scrollTo(0, 100);
        Chart();
    },[]);
    return (
        <div className="box">
            {loading ? <Loading height={231} width={100} className='load' type='spin' color='red' /> : <Line data={chartData} width={50} height={14}/>}
        </div>
    )
}
