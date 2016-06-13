const moveBox = (delta, box) => {
    const y = box.y + delta * box.speed / 1000;

    return {
        ...box,
        y
    };
};

const timeTick = state => {
    const now = Date.now();
    const delta = now - state.time;

    return {
        ...state,
        time: now,
        boxes: state.boxes.map(moveBox.bind(null, delta))
    };
};

export default timeTick;
