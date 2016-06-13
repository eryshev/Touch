import React, {Component} from 'react';
import Box from './Box';
import {timeTick} from '../actions';

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
        const {boxes} = store.getState();

        return (
            <svg
                width={500}
                height={500}
            >
                {boxes.map(box =>
                    <Box
                        key={box.id}
                        {...box}
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
