import React, { Component } from 'react'
import  moment  from 'moment';
import { DateRangePicker } from 'react-dates';


export class DatePicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            focusedInput: this.props.focusedInput,

        }
    }

    componentDidMount(){
        console.log(this.state.startDate.format('Y-m-d'),this.state.endDate.format('Y-m-d'));
    }

    render() {
        return (
            <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate: startDate, endDate: endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput: focusedInput })} // PropTypes.func.isRequired,
                showClearDates={true}
                isOutsideRange={() => false}
            />
        )
    }
}
