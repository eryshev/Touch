const marginBetweenBoxes = 10;

let boxId = 0;

const getRandomX = (fieldWidth, boxWidth) => Math.random() * (fieldWidth - boxWidth) + boxWidth / 2;

const checkPathForIntersection = (boxes, boxWidth, x) => {
    return boxes.some(b =>
        Math.abs(b.x - x) < (b.width + boxWidth) / 2 + marginBetweenBoxes
    );
};

const initialBox = (state) => {
    const boxWidth = 175;
    const boxHeight = 175;
    const fieldWidth = state.field.width;
    const boxes = state.boxes;
    let x = getRandomX(fieldWidth, boxWidth);

    while (checkPathForIntersection(boxes, boxWidth, x)) {
        x = getRandomX(fieldWidth, boxWidth);
    }

    const newBox = {
        id: boxId++,
        width: boxWidth,
        height: boxHeight,
        x,
        y: -boxHeight / 2,
        speed: 150 + 200 * Math.random() + (state.time - state.startTime) / 100,
        active: false
    };

    return {
        ...state,
        boxes: [...state.boxes, newBox]
    };
};

export default initialBox;
