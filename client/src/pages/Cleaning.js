import React, {useState} from 'react';
import { useAuth } from "../util/auth";
import {useQuery, useMutation} from '@apollo/client';
import {LPN} from '../util/queries'
import {UPSERT_CLEANING} from '../util/mutations';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

let goodLpn = false;
let submitButton = false;
const Cleaning = ()=>{
    

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
            <h1>Cleaning Module</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <label>LPN:</label>
                <input type="text" name="lpn" onChange={lpnChange}/>                
            </form>
            {goodLpn?<CleaningForm value={lpn}/>:<div></div>}
        </div>
    );
}

const CleaningForm = (lpnValue)=>{

    const history = useHistory();

    const {user} = useAuth();

    const{data, loading, error} = useQuery(LPN,{variables:{lpn:lpnValue.value.lpn}})

    const [upsertCleaning] = useMutation(UPSERT_CLEANING);

    const [cleaning, updateCleaning] = useState(
        {
            "lpn": lpnValue.value.lpn,
            "pass": false,
            "cleaning":{
                "User": user._id,
                "StartTime": new Date(),
                "EndTime":new Date()
            }
        }
    )

    const unitPass = ()=>{
        
        const softCleaning = JSON.parse(JSON.stringify(cleaning));
        softCleaning.pass = true;
        softCleaning.cleaning.EndTime = new Date();
        updateCleaning(JSON.parse(JSON.stringify(softCleaning)));
        submitButton=true;
    
    };

    const unitFail = ()=>{

        const softCleaning = JSON.parse(JSON.stringify(cleaning));
        softCleaning.pass = false;
        softCleaning.cleaning.EndTime = new Date();
        updateCleaning(JSON.parse(JSON.stringify(softCleaning)))
        submitButton=true;
    };

    const submitCleaning = ()=>{
        upsertCleaning({variables:{lpn:cleaning.lpn, pass:cleaning.pass, test:cleaning.test}});
        history.push("/cleaning");

    }
    

    
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
        <div>
            Clean Item
            <div>
                <Button onClick={unitPass}>   Pass   </Button>
                <Button onClick={unitFail}>   Fail   </Button>
            </div>
            {submitButton?<a href="/cleaning"><Button onClick={submitCleaning}>Submit</Button></a>:<div/>}
        </div>
    )
}

export default Cleaning;