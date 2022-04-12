import React, {useState} from 'react';
import { useAuth } from "../util/auth";
import {useQuery, useMutation} from '@apollo/client';
import {LPN} from '../util/queries'
import {UPSERT_FUNCTION_TEST} from '../util/mutations';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

let goodLpn = false;
let submitButton = false;
const FunctionTest = ()=>{
    

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

    const history = useHistory();

    const {user} = useAuth();

    const{data, loading, error} = useQuery(LPN,{variables:{lpn:lpnValue.value.lpn}})

    const [upsertFunctionTest] = useMutation(UPSERT_FUNCTION_TEST);

    const [functionTest, updateFunctionTest] = useState(
        {
            "lpn": lpnValue.value.lpn,
            "pass": false,
            "test":{
                "User": user._id,
                "StartTime": new Date(),
                "EndTime":new Date()
            }
        }
    )

    const unitPass = ()=>{
        
        const softFunctionTest = JSON.parse(JSON.stringify(functionTest));
        softFunctionTest.pass = true;
        softFunctionTest.test.EndTime = new Date();
        updateFunctionTest(JSON.parse(JSON.stringify(softFunctionTest)));
        submitButton=true;
    
    };

    const unitFail = ()=>{

        const softFunctionTest = JSON.parse(JSON.stringify(functionTest));
        softFunctionTest.pass = false;
        softFunctionTest.test.EndTime = new Date();
        updateFunctionTest(JSON.parse(JSON.stringify(softFunctionTest)))
        submitButton=true;
    };

    const submitFunctionTest = ()=>{
        upsertFunctionTest({variables:{lpn:functionTest.lpn, pass:functionTest.pass, test:functionTest.test}});
        history.push("/functionTest");

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
            Function Test Item
            <div>
                <Button onClick={unitPass}>   Pass   </Button>
                <Button onClick={unitFail}>   Fail   </Button>
            </div>
            {submitButton?<a href="/functionTest"><Button onClick={submitFunctionTest}>Submit</Button></a>:<div/>}
        </div>
    )
}

export default FunctionTest;