import React, {useState} from 'react';
import { useAuth } from "../util/auth";
import {useQuery, useMutation} from '@apollo/client';
import {LPN} from '../util/queries'

let goodLpn = false;
const FunctionTest = ()=>{
    
    const { isLoggedIn, user } = useAuth();

    const [lpn, changeLpn] = useState({"lpn":""});
    

    const lpnChange = (e) =>{
        e.preventDefault();
        if(e.target.value.substring(0,3) === "LPN" && e.target.value.length >= 13){
            goodLpn = true;
            changeLpn({"lpn": e.target.value})
        } else{
            goodLpn = false;
            changeLpn({"lpn": e.target.value})
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        return false
    };


    return (
        <div>
            <h1>Function Test Module</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <label>LPN:</label>
                <input type="text" name="lpn" onChange={lpnChange}/>                
            </form>
            {goodLpn?<FunctionTestForm value={lpn}/>:<div>Not good LPN</div>}
        </div>
    );
}

const FunctionTestForm = (lpnValue)=>{

    const {user} = useAuth();
    console.log(user);

    const{data, loading, error} = useQuery(LPN,{variables:{lpn:lpnValue.value.lpn}})

    const [functionTest, updateFunctionTest] = useState(
        {
            "lpn": lpnValue.value.lpn,
            "pass": false,
            "test":{
                "User": user._id,
                "StartTime": new Date(),
                "EndTime":null
            }
        }
    )

    if(error){
        return(<div/>)
    }
    if(loading){
        return(<div>Loading...</div>)
    }
    if(data.LPN === null){
        return<div>No data on LPN</div>
    }

    return(
        <div>{console.log(functionTest)}Function Test Item</div>
    )
}

export default FunctionTest;