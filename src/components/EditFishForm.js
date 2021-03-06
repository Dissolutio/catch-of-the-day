import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from "../helpers";
class EditFishForm extends React.Component {
    static propTypes = {
        fish: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
         index: PropTypes.string,
         updateFish: PropTypes.func,
         deleteFish: PropTypes.func
    };
    handleChange = (event) => {
        console.log(event.currentTarget.value);
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.props.updateFish(this.props.index, updatedFish);
    }
    render() {
        return (
        <div className="edit-fish">
            <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name} />
            <input type="text" name="price" onChange={this.handleChange} value={formatPrice(this.props.fish.price)} />
            <select type="text" name="status" onChange={this.handleChange} value={this.props.fish.status}>
                <option value="available">Fresh!</option> 
                <option value="unavailable">Sold out!</option> 
            </select>
            <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc} />
            <input type="text" onChange={this.handleChange} value={this.props.fish.text} name="image"/>
            <button onClick={()=> this.props.deleteFish(this.props.index)}>Remove Fish</button>
        </div>
        )
    }
}

export default EditFishForm;