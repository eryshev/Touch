import React, {Component} from 'react';
import Box from './Box';
import {timeTick, boxActive, boxInactive} from '../actions';

class GameField extends Component {
    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );

        const ticker = () => {
            store.dispatch(timeTick());
            this.ticker = window.requestAnimationFrame(ticker);
        };
        ticker();
    }

    componentWillUnmount() {
        this.unsubscribe();
        window.cancelAnimationFrame(this.ticker);
    }

    render() {
        const {store} = this.context;
        const {field, boxes} = store.getState();

        return (
            <svg
                width={field.width * field.scale.x}
                height={field.height * field.scale.y}
            >
                <rect
                    x={0}
                    y={0}
                    width={field.width * field.scale.x}
                    height={field.height * field.scale.y}
                    fill={"yellow"}
                />
                {boxes.map(box =>
                    <Box
                        key={box.id}
                        width={box.width * field.scale.x}
                        height={box.height * field.scale.y}
                        x={box.x * field.scale.x}
                        y={box.y * field.scale.y}
                        onMouseDown={() => {
                            store.dispatch(boxActive(box.id));
                        }}
                        onTouchStart={() => {
                            store.dispatch(boxActive(box.id));
                        }}
                        onTouchEnd={() => {
                            store.dispatch(boxInactive(box.id));
                        }}
                        onMouseUp={() => {
                            store.dispatch(boxInactive(box.id));
                        }}
                        fill={box.active ? 'red' : 'blue'}
                    />
                )}
            </svg>
        );
    };
};

GameField.contextTypes = {
    store: React.PropTypes.object
};

export default GameField;
