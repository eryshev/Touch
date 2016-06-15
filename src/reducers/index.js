import {START_GAME, TIME_TICK, BOX_ACTIVE, BOX_INACTIVE} from '../actions';
import initialBox from './initialBox';

const setFieldScale = (field) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const maxWidth = 500;

    let width = Math.min(windowWidth, maxWidth);
    let height = width / field.ratio;

    if (height < windowHeight) {
        height = windowHeight;
        width = height * field.ratio;
    }

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
        time: Date.now(),
        field: {
            width: 2000,
            height: 0,
            ratio: 6 / 3,
            scale: {
                x: 0,
                y: 0
            }
        },
        maxNumberBoxes: 3,
        boxes: []
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
            return {
                ...state,
                boxes: state.boxes.filter(b => !(b.active && b.id == action.id))
            };

        default:
            return state;
    }
};

const timeTick = state => {
    const now = Date.now();
    const delta = now - state.time;

    const boxes = [...state.boxes];

    if (boxes.length < state.maxNumberBoxes) {
        for (let i = state.boxes.length; i < state.maxNumberBoxes; i++) {
            boxes.push(initialBox(state));
        }
    }

    return {
        ...state,
        time: now,
        boxes: boxes.map(moveBox.bind(null, delta))
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

export default reducer;
