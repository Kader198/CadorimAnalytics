import React from 'react';
import { Line } from 'react-chartjs-2';
export const LineA = (props) => {
    console.log(props.arrayOfAmount,props.days)
    const data = {
            labels: props.arrayOfAmount,
            datasets: [{
                label: 'les ventes ',
                data: props.days,
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
        <Line data={data} width={50} height={14}/>
    )
}
