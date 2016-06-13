import React from 'react';

const Box = ({width, height, x, y}) => {
    return (
        <rect
            width={width}
            height={height}
            x={x}
            y={y}
        />
    );
};

export default Box;
