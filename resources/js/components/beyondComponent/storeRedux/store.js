export const Reducer = (state, { type, payload }) => {
    switch (type) {
    case 'simple':
        axios.get('http://localhost:8000/api/Ventes')
        .then((response) => {
                    let data = {};
                    let arrayOfAll = [];
                    data = response.data.amountsPerDays;
                    arrayOfAll = data.map((element) =>  [new Date(parseInt(element.year),parseInt(element.month)-1,parseInt(element.day)),parseInt(element.payment_amount)]);
                    console.log('the data related',state.Chart);
            return {...state,arrayOfAll}
        })
    default:
        return state
    }
}


