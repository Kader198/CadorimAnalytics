import React,{ useEffect , useState }from 'react';
import { Line } from 'react-chartjs-2';
import Loading from 'react-loading';

export const Moyen = () => {
    const [loading, setloading] = useState(false);
    const getMoyen = () => {
        setloading(true);
        axios.get('http://localhost:8000/api/VentesMoyen')
        .then((response) => {
            console.log(response.data);
            setloading(false);
        })
    }
    useEffect(() => {
        window.scrollTo(0, 100);
        getMoyen();
    },[]);

    const data = {
        labels: [12, 19, 3, 5, 2, 3],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
    }
    return (
        <div className="box text-center">
            {loading ? <Loading height={231} width={100} className='load' type='spin' color='red' /> : <Line data={data} width={50} height={14}/>}
        </div>
    )
}
