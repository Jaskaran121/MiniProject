import React, { Component } from 'react';
import './form.css'
import {getEvents,postEvents} from './Services';
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
            totalData:[]
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
   handleSubmit =  async (e) => {
        e.preventDefault()
        const {
            name,
            email,
        } = this.state.data
        const currentErrors = validateFields(name,email)
        if(currentErrors){
            return
        }
        const totalData = await postEvents(this.state.data);
        console.log(totalData)
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
            email,
            totalData
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
            <input type="submit" value="Submit" disabled={disabled}/>
            </form>
            {totalData && <textarea>
                {totalData}
            </textarea>}
        </div>);
    }
}
 
export default Form;
