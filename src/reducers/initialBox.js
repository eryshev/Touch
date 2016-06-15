let boxId = 0;

const getRandomX = (fieldWidth, boxWidth) => Math.random() * (fieldWidth - boxWidth) + boxWidth / 2;

const checkPathForIntersection = (boxes, x) => {
    return boxes.some(b =>
        b.x - b.width > x && b.x + b.width < x
    );
};

const initialBox = (state) => {
    const boxWidth = 100;
    const fieldWidth = state.field.width;
    const boxes = state.boxes;
    let x = getRandomX(fieldWidth, boxWidth);

    while (checkPathForIntersection(boxes, x)) {
        x = getRandomX(fieldWidth, boxWidth);
    }

    return {
        id: boxId++,
        width: boxWidth,
        height: 100,
        x,
        y: 0,
        speed: 150 + 200 * Math.random(),
        active: false
    };
};

export default initialBox;
