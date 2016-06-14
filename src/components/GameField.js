import React, {Component} from 'react';
import Rect from './Rect';
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
        const {page, field, boxes} = store.getState();

        return (
            <svg
                width={500}
                height={500}
            >
                <Rect
                    x={0}
                    y={0}
                    width={500}
                    height={500}
                    fill={"yellow"}
                />
                {boxes.map(box =>
                    <Rect
                        key={box.id}
                        {...box}
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
