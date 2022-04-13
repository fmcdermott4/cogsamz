import React, {useState} from 'react';
import { useAuth } from "../util/auth";
import {useQuery, useMutation} from '@apollo/client';
import {LPN, BILL_CODE} from '../util/queries';
import {UPSERT_SUBMITTED_LPN} from '../util/mutations';

const budgetPercent = .36;
let goodLpn=false;


const Cogs = () => {
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
        {/* TODO: display logged in user's username */}
            <h1>COGS Module</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <label>LPN:</label>
                <input type="text" name="lpn" onChange={lpnChange}/>                
            </form>

            {goodLpn?<LPNrender value={lpn}/>:<div></div>}
        </div>
    );
};

const LPNrender = (lpnValue) =>{

    const{data,loading,error} = useQuery(LPN,{
        variables: {"lpn": lpnValue.value.lpn}
    })


    if(error){
        return(<div/>)
    }
    if(loading){
        return(<div>Loading...</div>)
    }
    if(data.LPN === null){
        return<div>No data on LPN</div>
    }
    // add info for if there is no billing info here
    return(
    <ServicesCheckboxes data={data}/>        
    )
}

const ServicesCheckboxes = (lpnData) =>{

    const { user } = useAuth();

    const budget = parseInt(lpnData.data.LPN.Price) * budgetPercent;
    
    const [passFail, changePassFail] = useState({
        "functionTest": true,
        "cleaning" : false,
        "rebox": false,
        "manual": false,
        "parts": false
    })

    const billCode = lpnData.data.LPN.Subcategory.substring(0,5).trim();    

    const{data,loading,error} = useQuery(BILL_CODE,{
        variables: {"billCode": billCode}
    })

    const [updateSubmittedLpn] = useMutation(UPSERT_SUBMITTED_LPN);

    if(error){
        return<div/>
    }
    if(loading){
        return<div>Loading...</div>
    }
    if(isNaN(budget)){
        return<div>Item cost not a number</div>
    }
    if(data.BillCode === null){
        return<div>No billing data for bill code</div>
    }
    
    const functionTestCost = parseInt(data.BillCode.FunctionTest);
    const cleaningCost = parseInt(data.BillCode.Cleaning);
    const reboxCost = parseInt(data.BillCode.Rebox);
    const partsCost = parseInt(data.BillCode.Parts);
    const manualCost = 2;

    let cogsCost = functionTestCost*passFail.functionTest+cleaningCost*passFail.cleaning+reboxCost*passFail.rebox+manualCost*passFail.manual+partsCost*passFail.parts;
    
    const handleCheck = (e)=>{
        const checkBox = e.target.name;
        const value = e.target.checked;
        changePassFail({
            ...passFail,
            [checkBox] : value
        });
        
    }
    // console.log(lpnData.data.LPN._id);
    updateSubmittedLpn({variables:{
        "lpn": lpnData.data.LPN._id,
        "user": user._id,
        "functionTestChecked": passFail.functionTest,
        "cleaningChecked": passFail.cleaning,
        "reboxChecked": passFail.rebox,
        "kittingChecked": passFail.manual,
        "partsChecked": passFail.parts,
        "functionTest": data.BillCode.FunctionTest,
        "rebox": data.BillCode.Rebox,
        "cleaning": data.BillCode.Cleaning,
        "parts": data.BillCode.Parts
}});

    let cogsPassFail = cogsCost <= budget;
    return(
        <div>
            <p>Please select <em><b>all services</b></em> required for this item</p>
            <hr/>
            <form>
                <input type="checkbox" checked disabled/><label>Function test</label>
                <br/>
                
                <input type="checkbox" name="cleaning" onChange={handleCheck}/><label>Cleaning</label>
                <br/>
                
                <input type="checkbox" name="rebox" onChange={handleCheck}/><label>Rebox?</label>
                <br/>
                
                <input type="checkbox" name="manual" onChange={handleCheck}/><label>Manual?</label>
                <br/>

                <input type="checkbox" name="parts" onChange={handleCheck}/><label>Parts?</label>
                <br/>
            </form>
            <hr/>
            {cogsPassFail?<h3>Pass</h3>:<h3>Fail</h3>}
        </div>
    )
}

export default Cogs;