import React, { useState } from 'react';
import './AddEvents.css';
import { useForm } from "react-hook-form";
import axios from 'axios';

const AddEvents = () => {
    const [ imageUrl , setImageUrl] = useState()
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data =>{
        const eventData = {
            name: data.name,
            imageUrl: imageUrl
        }

        fetch('http://localhost:4200/addImages' ,{
            method:"POST",
            headers:{
                'content-Type': 'application/json'
            },
            body: JSON.stringify(eventData )
        })
        .then(res => console.log(res, 'added'))
        
        
    }


    const handleImageUpload = event =>{
        console.log(event.target.files)
        const imageData = new FormData();
        imageData.set('key', 'b839ce61a3e8fdd61e1e36759838e3f2');
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(response=> {
            setImageUrl(response.data.data.display_url);
          })
          .catch(error=> {
            console.log(error);
          });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
               
                <input name="name" placeholder="set our event" ref={register} />
                <br/>
                <input name="exampleRequired" type="file" onChange={handleImageUpload} />
                <br/>
                <input type="submit" />

            </form>
        </div>
    );
};

export default AddEvents;