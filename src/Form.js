import React, { Component } from 'react';
import './form.css'
import {getEvents} from './Services';
import { validateFields } from './validateFields';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                email:'',
                name:'',
                currentCity:'',
                currentEvent:'',
            },
            events:{},
            currentCities:[],
            disabled : true,
          }
    }
    async componentDidMount() {
        const events = await getEvents();
        this.setState({events: events})
    }
    handleEventChange = (event) => {
        const {
            events,data
        } = this.state;
        data['currentEvent'] = event.target.value
        this.setState({currentCities:events[event.target.value],disabled:false,data})
    }
    handleInputChange = (input) => {
        const {
            data
        } = this.state;
        data[input.target.name] = input.target.value
        this.setState({data})
    }
    handleSubmit = (e) => {
        const {
            name,
            email
        } = this.state.data
        const errors = validateFields(name,email)
        if(errors)
            {
               window.alert(errors)
               return
            }
        e.preventDefault()
    }
    render() { 
        const {
            events,
            currentCities,
            disabled,
            data
        } = this.state;
        const {
            currentCity,
            currentEvent,
            name,
            email
        } = data
        return ( <div className="form">
            <form onSubmit={this.handleSubmit}>
            <h1> Vote for Next Year's Event </h1><br/>
            Select an event : <span> </span>
             <select name='currentEvent' value={currentEvent} onChange ={this.handleEventChange}>
                 {
                     Object.keys(events).map((event) => <option key={event}>
                         {event}
                     </option>)
                 }
		    </select>
            <br />
            <br />
            Vote for a city : 
            <select name='currentCity' value={currentCity} disabled = {disabled} onChange ={this.handleInputChange}>
                 {
                     currentCities.map((city) => <option key={city}>
                         {city}
                     </option>)
                 }
		    </select>
		<br />
        <br />
            <label>
            Your Name:
            <input type="text" name = 'name' value={name} onChange = {this.handleInputChange} disabled={disabled}/>
            </label>
            <label><br/><br/>
            Your Email:
            <input type="text" name = 'email' value={email} onChange = {this.handleInputChange} disabled={disabled}/>
            </label><br/><br/>
            <input type="submit" value="Submit"/>
            </form>
        </div>);
    }
}
 
export default Form;