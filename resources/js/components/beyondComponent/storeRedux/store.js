

export const Reducer = (state, { type, payload }) => {
    switch (type) {
    case 'typeName':
        return { ...state, ...payload }

    default:
        return state
    }
}


