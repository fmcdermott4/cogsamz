import React, {useState, useEffect} from 'react';
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
        "functionTestChecked": true,
        "cleaningChecked" : false,
        "reboxChecked": false,
        "kittingChecked": false,
        "partsChecked": false,
        "softwareReloadChecked":false
    })

    const billCode = lpnData.data.LPN.Subcategory.substring(0,5).trim();    

    const{data,loading,error} = useQuery(BILL_CODE,{
        variables: {"billCode": billCode}
    })

    const [updateSubmittedLpn] = useMutation(UPSERT_SUBMITTED_LPN);

    useEffect(() => {
       

    })

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
    const softwareReloadCost = parseInt(data.BillCode.SoftwareReload);
    const manualCost = 2;

    let cogsCost = functionTestCost*passFail.functionTestChecked+cleaningCost*passFail.cleaningChecked+reboxCost*passFail.reboxChecked+manualCost*passFail.kittingChecked+partsCost*passFail.partsChecked+softwareReloadCost*passFail.softwareReloadChecked;
    
    const handleCheck = (e)=>{
        const checkBox = e.target.name;
        const value = e.target.checked;
        changePassFail({
            ...passFail,
            [checkBox] : value
        });
        updateSubmittedLpn({
            variables: {
                ...passFail,
                [checkBox]: value,
                "lpn": lpnData.data.LPN._id,
                "user": user._id,
                "functionTest": data.BillCode.FunctionTest,
                "rebox": data.BillCode.Rebox,
                "cleaning": data.BillCode.Cleaning,
                "parts": data.BillCode.Parts,
                "softwareReload": data.BillCode.SoftwareReload
            }
        });  
        console.log(passFail)
        
    }
    // console.log(lpnData.data.LPN._id);
    

    let cogsPassFail = cogsCost <= budget;
    return(
        <div>
            <p>Please select <em><b>all services</b></em> required for this item</p>
            <hr/>
            <form>
                <input type="checkbox" checked disabled/><label>Function test</label>
                <br/>
                
                <input type="checkbox" name="cleaningChecked" onChange={handleCheck}/><label>Cleaning</label>
                <br/>
                
                <input type="checkbox" name="reboxChecked" onChange={handleCheck}/><label>Rebox?</label>
                <br/>
                
                <input type="checkbox" name="kittingChecked" onChange={handleCheck}/><label>Manual?</label>
                <br/>

                <input type="checkbox" name="partsChecked" onChange={handleCheck}/><label>Parts?</label>
                <br />

                <input type="checkbox" name="softwareReloadChecked" onChange={handleCheck}/><label>Software Reload?</label>
                <br />
            </form>
            <hr/>
            {cogsPassFail?<h3>Pass</h3>:<h3>Fail</h3>}
        </div>
    )
}

export default Cogs;