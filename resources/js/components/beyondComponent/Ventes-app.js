import React,{useEffect ,useContext , useState,useRef} from 'react';
import Loading from 'react-loading';
import ReactTooltip from 'react-tooltip';
import { Line } from 'react-chartjs-2';
import { FullScreen,useFullScreenHandle } from 'react-full-screen';
import axios from 'axios';
import { Context } from './storeRedux/context';
import { DatePicker } from './DatePicker';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';


export class Ventes extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                startDate: moment().subtract(30, 'days'),
                endDate: moment(),
                message:'',
                DatesSelected:false,
                focusedInput: null,
                chartData: {},
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
        axios.get('http://localhost:8000/api/Ventes')
        .then((response) => {
                    let arrayOfdays = [];
                    let data = {};
                    let arrayOfAmount = [];
                    data = response.data.amountsPerDays;
                    console.log(data);
                    arrayOfdays = data.map((amount) => amount.days);
                    arrayOfAmount = data.map((amount) => {
                        return amount.payment_amount === [] ? 0 : amount.payment_amount;
                    });
                    this.setState({chartData:
                        {
                            labels: arrayOfdays,
                            datasets: [{
                                label: 'les ventes ',
                                data: arrayOfAmount,
                                backgroundColor: [
                                    'rgba(230, 255, 253,0.5)',
                                ],
                                borderColor: [
                                    'rgb(8, 32, 252)',
                                ],
                                borderWidth: 2
                            }],
                        },loading:false
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
            axios.post('http://localhost:8000/api/dateVentes',{dateEnd,dateStart})
                .then(response => {
                    if(response.status === 200) {
                        let data = {};
                        let arrayOfdays = [];
                        let arrayOfAmount = [];
                        data = response.data.amountsPerDays;
                        arrayOfdays = data.map((amount) => amount.days);
                        arrayOfAmount = data.map((amount) => {
                            return amount.payment_amount === [] ? 0 : amount.payment_amount;
                        });
                        console.log("the state of posted data ",arrayOfdays,arrayOfAmount);
                        this.setState(
                            {chartData: {
                            labels: arrayOfdays,
                            datasets: [{
                                label: 'les ventes ',
                                data: arrayOfAmount,
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
                            message: `Du ${this.state.startDate.format('LLLL')} a ${this.state.endDate.format('LLLL')}`
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
                                    <p className='txt text-center ml-5 p-2 mt-3 badge-info  text-white shadow-sm'>
                                        {this.state.message}
                                    </p>
                                </div>
                                <div className='col-6 mb-3 pl-5 mt-4' >
                                    <div >
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
                                    {/* <ReactTooltip delayHide={1000} /> */}
                                </div>
                            </div>
                                <Line data={this.state.chartData} width={50} height={14} options={this.state.chartOptions}/>
                            </div>

                }
                    </div>
        )
    }
}







