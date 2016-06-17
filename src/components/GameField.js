import React, {Component} from 'react';
import Box from './Box';
import {timeTick, boxActive, boxInactive, windowResize} from '../actions';

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

        this.windowOnResize = () => {
            store.dispatch(windowResize());
        };

        window.addEventListener('resize', this.windowOnResize);
    }

    componentWillUnmount() {
        this.unsubscribe();
        window.cancelAnimationFrame(this.ticker);
        window.removeEventListener(this.windowOnResize);
    }

    render() {
        const {store} = this.context;
        const {score, field, boxes} = store.getState();

        return (
            <svg
                width={field.width * field.scale.x}
                height={field.height * field.scale.y}
            >
                <text
                    x={5}
                    y={35}
                    fontSize={50}
                >
                    {score}
                </text>
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
                        active={box.active}
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
