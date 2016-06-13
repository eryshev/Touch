import {START_GAME, TIME_TICK} from '../actions';
import timeTick from './timeTick';

let boxId = 0;
const createInitialBoxState = (field) => {
    const width = 20;
    const halfWidth = width / 2;
    const x = Math.round(Math.random() * field.width - width) + halfWidth;

    return {
        id: boxId++,
        width,
        height: 20,
        x,
        y: 0,
        speed: 10
    };
};

const initialState = {
    time: Date.now(),
    field: {
        width: 500,
        height: 500
    },
    maxNumberBoxes: 10,
    boxes: []
};
initialState.boxes = Array(initialState.maxNumberBoxes)
    .fill(null).map(createInitialBoxState.bind(null, initialState.field));

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                boxes: Array(state.maxNumberBoxes).fill(null).map(createInitialBoxState)
            };

        case TIME_TICK:
            return timeTick(state);

        default:
            return state;
    }
};

export default reducer;
