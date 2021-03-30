import React from 'react';
import './Event.css'

const Event = (props) => {
    const {name, imageUrl , _id} = props.event

    const deleteEvent =(id)=>{
        console.log(id)
        fetch('http://localhost:4200/deleteEvent/'+id  , {
            method:"DELETE"
        })
        .then(res => res.json())
        .then( result=> {
            console.log(result,'deleted')
        })
    }
    return (
        <div className="col-md-3 ">
            <img className=" image" src={imageUrl} alt="event-image" />
            <h4> {name}</h4>
            <button onClick={()=>deleteEvent(_id)}> delete</button>
        </div>
    );
};

export default Event;