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
    fill
}) => {
    return (
        <rect
            width={Math.round(width)}
            height={Math.round(height)}
            x={Math.round(x - width / 2)}
            y={Math.round(y - height / 2)}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseOut={onMouseOut}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            fill={fill}
        />
    );
};

export default Box;
