export const Reducer = (state, { type, payload }) => {
    switch (type) {
    case 'simple':
        return {...state, ...payload}

    default:
        return state
    }
}


