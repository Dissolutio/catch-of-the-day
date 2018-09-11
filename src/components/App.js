import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from '../base';
class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount(){
        const { params } = this.props.match;
        // first reinstate our localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef)} )
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }
    componentDidUpdate() {
        const order = this.state.order ;
        const storeId = this.props.match.params.storeId;
        localStorage.setItem(storeId, JSON.stringify(order));
    }
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    addFish = fish => {
        // 1. Take a copy of existing state
        const fishes = {...this.state.fishes};
        // 2. Add new fish to fishes    
        fishes[`fish${Date.now()}`] = fish;
        // 3. Set new the new fishes object to state
        this.setState({
            fishes: fishes
        });
    };
    updateFish = (key, updatedFish) => {
        // 1. Take a copy of the current fish
        const fishes = {...this.state.fishes};
        // 2. Update that state
        fishes[key] = updatedFish;
        // 3. Set that to State
        this.setState({ fishes: fishes });
    }
    addToOrder = (key) => {
        // 1. Take a copy of state
        const order = {...this.state.order};
        // 2. Either add to the order, or update the quantity in the order
        order[key] = order[key] + 1 || 1 ;
            // 3. Call setState to update our state object
        this.setState({ order });
    }
    removeFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({order});
    }
    loadSampleFishes = fish => {
        this.setState({ fishes: sampleFishes });
    };
    deleteFish = (key) => {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({fishes:fishes});
    }
    render(){
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                        <Fish 
                        key={key}
                        index={key}
                        details={this.state.fishes[key]} 
                        addToOrder={this.addToOrder} 
                        />
                        ))}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} removeFromOrder={this.removeFromOrder} order={this.state.order} /> 
                <Inventory 
                addFish={this.addFish} 
                deleteFish={this.deleteFish} 
                updateFish={this.updateFish} 
                loadSampleFishes={this.loadSampleFishes} 
                fishes={this.state.fishes} 
                storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}
export default App;