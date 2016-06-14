let boxId = 0;

const initialBox = (field) => {
    const width = 20;
    const halfWidth = width / 2;
    const x = Math.round(Math.random() * (field.width - width)) + halfWidth;

    return {
        id: boxId++,
        width,
        height: 20,
        x,
        y: 0,
        speed: 20,
        isMouseDown: false
    };
};

export default initialBox;
