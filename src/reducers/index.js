import {START_GAME, TIME_TICK, BOX_ACTIVE, BOX_INACTIVE, WINDOW_RESIZE} from '../actions';
import initialBox from './initialBox';

const setFieldScale = (field) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const maxWidth = 1000;

    let width = Math.min(windowWidth, maxWidth);
    let height = width / field.ratio;
    height = Math.min(windowHeight, height);

    width = height * field.ratio;

    return {
        ...field,
        scale: {
            x: width / field.width,
            y: height / field.height
        }
    };
};

const initialState = () => {
    const state = {
        startTime: Date.now(),
        time: Date.now(),
        field: {
            width: 2000,
            height: 0,
            ratio: 8 / 3,
            scale: {
                x: 0,
                y: 0
            }
        },
        maxNumberBoxes: 3,
        boxes: [],
        score: 0
    };

    state.field.height = state.field.width / state.field.ratio;
    state.field = setFieldScale(state.field);

    return state;
};

const reducer = (state = initialState(), action) => {
    switch (action.type) {
        case START_GAME:
            return state;

        case TIME_TICK:
            return timeTick(state);

        case BOX_ACTIVE:
            return {
                ...state,
                boxes: state.boxes.map(b => {
                    if (b.id != action.id) {
                        return b;
                    }

                    return {...b, active: true};
                })
            };

        case BOX_INACTIVE:
            return boxInactiveReducer(state, action);

        case WINDOW_RESIZE:
            return {
                ...state,
                field: setFieldScale(state.field)
            };

        default:
            return state;
    }
};

const timeTick = state => {
    const now = Date.now();
    const delta = now - state.time;

    if (state.boxes.length < state.maxNumberBoxes) {
        state = initialBox(state);
    }

    state = removeOldBoxes(state);

    return {
        ...state,
        time: now,
        boxes: state.boxes.map(moveBox.bind(null, delta))
    };
};

const moveBox = (delta, box) => {
    if (box.active) {
        return box;
    }

    const y = box.y + delta * box.speed / 1000;

    return {
        ...box,
        y
    };
};

const removeOldBoxes = state => {
    const filteredBoxes = state.boxes.filter(b =>
        b.y - b.height / 2 < state.field.height
    );

    return {
        ...state,
        score: state.score - (state.boxes.length - filteredBoxes.length),
        boxes: filteredBoxes
    };
};

const boxInactiveReducer = (state, action) => {
    const filteredBoxes = state.boxes.filter(b => !(b.active && b.id == action.id));

    return {
        ...state,
        score: state.score + (state.boxes.length - filteredBoxes.length),
        boxes: filteredBoxes
    };
};

export default reducer;
