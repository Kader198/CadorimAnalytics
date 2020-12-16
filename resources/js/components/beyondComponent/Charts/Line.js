import React,{useState ,useEffect} from 'react';
import { Chart } from 'react-google-charts';

export const Line = () => {

    const [state, setState] = useState({Chart: []})

    useEffect(() => {
        axios.get('http://localhost:8000/api/Ventes')
        .then((response) => {
                    let arrayOfdays = [];
                    let data = {};
                    let arrayOfAmount = [];
                    let arrayOfAll = [];
                    data = response.data.amountsPerDays;
                    arrayOfdays = data.map(ele => ele.days)
                    arrayOfAmount = data.map(ele => ele.payment_amount)
                    arrayOfAll = arrayOfAmount.map((element,index) => {
                        return [element,arrayOfdays[index]]
                    });
                    setState({Chart: arrayOfAll})
                    console.log(state,'chart state ');

                })}
        , [])

    return (
        <Chart
            width={'100%'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={state.Chart}
            options={{
                // Use the same chart area width as the control for axis alignment.
                chartArea: { height: '80%', width: '90%' },
                hAxis: { slantedText: false },
                vAxis: { viewWindow: { min: 0, max: 2000 } },
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
                    range: {
                        start: 1, end: 10000000  },
                    },
                },
                },
            ]}
            />
    )
}
