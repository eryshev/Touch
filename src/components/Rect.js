import React from 'react';

const Rect = ({
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
            width={width}
            height={height}
            x={x}
            y={y}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseOut={onMouseOut}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            fill={fill}
        />
    );
};

export default Rect;
