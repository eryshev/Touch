import React from 'react';

const Box = ({
    width,
    height,
    x,
    y,
    onMouseDown,
    onMouseUp,
    onMouseOut,
    onTouchStart,
    onTouchEnd,
    active
}) => {
    return (
        <rect
            width={Math.round(width)}
            height={Math.round(height)}
            x={Math.round(x - width / 2)}
            y={Math.round(y - height / 2)}
            rx={5}
            ry={5}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseOut={onMouseOut}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{
                fill: active ? '#eb3d3d' : '#3a75fa'
            }}
        />
    );
};

export default Box;
