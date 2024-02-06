import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import axios from 'axios';

interface Props {
    title: string;
    start: string;
    end: string;
}

const ScheduleForm = () => {
    const { register, handleSubmit } = useForm<Props>();


    const onSubmit: SubmitHandler<Props> = (data) =>  {
    axios.post('http://localhost:8080/api/schedule/post', {
        title: data.title,
        start: data.start,
        end: data.end,
    })
}    
    
    return (
        

        <form style={{color:"white", display: "flex", flexDirection: "column", width:"50%"}} onSubmit={handleSubmit(onSubmit)}>
            <label>Title:</label>
            <input {...register("title")} />
            <label>Start:</label>
            <input {...register("start")} />
            <label>End:</label>
            <input {...register("end")} />
            <input type="submit" />
        </form>
       
    );
};

export default ScheduleForm;