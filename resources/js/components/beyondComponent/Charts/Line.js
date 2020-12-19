import React,{useState, useContext ,useEffect} from 'react';
import { Chart } from 'react-google-charts';
import Loading from 'react-loading';
import { Context } from '../storeRedux/context';

export const Line = () => {
    // const {state,dispatch} = useContext(Context);
    const [stateChart, setState] = useState({Chart: []});
    const [array, setArray] = useState([]);
    let arrayOfAll = [];
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('http://localhost:8000/api/Ventes')
        .then((response) => {
                    let arrayOfdays = [];
                    let data = {};
                    let arrayOfAmount = [];
                    data = response.data.amountsPerDays;
                    arrayOfAll = data.map((element) =>  {
                        return [new Date(parseInt(element.year),parseInt(element.month)-1,parseInt(element.day)),parseInt(element.payment_amount)]
                    });
                    setArray(arrayOfAll);
                    setState({Chart: arrayOfAll})
                    setLoading(false);
                })}
        , [])
    return (loading ? <Loading height={231} width={100} className='load' type='spin' color='red' /> :
        <Chart
            width={'100%'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={[['Date','Value'],...stateChart.Chart]}
            options={{
                // Use the same chart area width as the control for axis alignment.
                chartArea: { height: '80%', width: '90%' },
                hAxis: { slantedText: false },
                vAxis: { viewWindow: { min: 0, max: 100000 } },
                legend: { position: 'none' },
            }}
            rootProps={{ 'data-testid': '3' }}
            chartPackages={['corechart', 'controls']}
            controls={[
                {
                controlType: 'ChartRangeFilter',
                options: {
                    filterColumnIndex: 0,
                    ui: {
                    chartType: 'LineChart',
                    chartOptions: {
                        chartArea: { width: '90%', height: '50%' },
                        hAxis: { baselineColor: 'none' },
                    },
                    },
                },
                controlPosition: 'bottom',
                controlWrapperParams: {
                    state: {
                    range: { start: new Date(1997, 1, 9), end: new Date(2022, 2, 20) },
                    },
                },
                },
            ]}
/>
    )
}
