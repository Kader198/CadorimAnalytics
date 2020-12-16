import React,{ useEffect, useState ,Component} from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Loading from 'react-loading';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import moment from 'moment';
import { DateRangePicker } from 'react-dates';

export  class Transaction extends Component {
    constructor(props) {
        super(props);
            this.state = {
                startDate: moment().subtract(30, 'days'),
                endDate: moment(),
                DatesSelected:false,
                focusedInput: null,
                chartData: {},
                message: '',
                loading: true,
                chartOptions: {
                    scales:{
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            }
        }

    // ? Methods
    Chartt() {
        axios.get('http://localhost:8000/api/Transaction')
        .then((response) => {
                    let arrayOfdays = [];
                    let data = {};
                    let arrayOftransaction = [];
                    data = response.data.num;
                    console.log(data);
                    arrayOfdays = data.map((element) => element.current_day);
                    arrayOftransaction = data.map((element) => parseInt(element.count));
                    this.setState({chartData:
                        {
                            labels: arrayOfdays,
                            datasets: [{
                                label: 'les transactions ',
                                data: arrayOftransaction,
                                backgroundColor: [
                                    'rgba(230, 255, 253,0.5)',
                                ],
                                borderColor: [
                                    'rgb(8, 32, 252)',
                                ],
                                borderWidth: 2
                            }],
                        }
                        ,loading:false
                        ,DatesSelected:false,
                        message: `Dernieres 30 jours .....`
                    })
        })
    }

    //? End of Methods

    componentDidMount(){
        this.Chartt();
    }

    render() {
        if(this.state.DatesSelected === true && this.state.startDate !== null && this.state.endDate !== null){
            console.log('Work fine for me ');
            let dateStart,dateEnd = '';
            let { startDate,endDate } = this.state;
            dateStart = startDate.format('Y-M-D');
            dateEnd = endDate.format('Y-M-D');
            console.log(dateStart,dateEnd);
            axios.post('http://localhost:8000/api/dateTransaction',{dateEnd,dateStart})
                .then(response => {
                    if(response.status === 200) {
                        let data = {};
                        let arrayOfdays = [];
                        let arrayOftransaction = [];
                        data = response.data.num;
                        arrayOfdays = data.map((element) => element.current_day);
                        arrayOftransaction = data.map((element) => parseInt(element.count));
                        this.setState(
                            {chartData: {
                            labels: arrayOfdays,
                            datasets: [{
                                label: 'les transactions ',
                                data: arrayOftransaction,
                                backgroundColor: [
                                    'rgba(230, 255, 253,0.5)',
                                ],
                                borderColor: [
                                    'rgb(8, 32, 252)',
                                ],
                                borderWidth: 2
                            }]
                            },
                            loading:false ,
                            message: `Du ${this.state.startDate.format('LL')} a ${this.state.endDate.format('LL')}`
                        })
                        }
                })
                .catch(err => console.log(err))

            this.setState({DatesSelected: false})
        }

        return (
            <div className="box text-monospace ">
                {this.state.loading ?
                <Loading height={231} width={100} className='load' type='spin' color='red' />
                :
                            <div className='bg-white'>
                            <div className='row bg-white row-cols-3'>
                            <div className="col-6 p-3 ">
                                    <p className='txt text-center ml-5 p-2 mt-3 badge-info  text-white'>
                                        {this.state.message}
                                    </p>
                                </div>
                                <div className='col-6 mb-3 pl-5 mt-4'>
                                    <DateRangePicker
                                        customInputIcon={<i className='fa fa-calendar text-info'></i>}
                                        startDatePlaceholderText={'Date Debut'}
                                        endDatePlaceholderText={"Date Fin"}
                                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate: startDate, endDate: endDate ,DatesSelected: true})} // PropTypes.func.isRequired,
                                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                        onFocusChange={focusedInput => this.setState({ focusedInput: focusedInput })} // PropTypes.func.isRequired,
                                        showClearDates={true}
                                        isOutsideRange={() => false}
                                    />
                                </div>
                            </div>
                                <Line data={this.state.chartData} width={50} height={14} options={this.state.chartOptions} />
                            </div>

                }
                    </div>
        )
    }
}
