import React, {useState} from 'react';
import { useAuth } from "../util/auth";
import {useQuery} from '@apollo/client';
import {LPN} from '../util/queries';

let goodLpn=false;

const Cogs = () => {
    const { isLoggedIn, user } = useAuth();
    const [lpn, changeLpn] = useState({"lpn":""});

    

    const lpnChange = (e) =>{
        e.preventDefault();
        if(e.target.value.substring(0,3) === "LPN" && e.target.value.length === 14){
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
            <h1>Welcome {isLoggedIn ? user.username : "Guest"}!</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <label>LPN:</label>
                <input type="text" name="lpn" onChange={lpnChange}/>                
            </form>

            {goodLpn?<LPNrender value={lpn}/>:<div>Enter correct valued LPN</div>}
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
    return(
        <ServicesCheckboxes data={data}/>        
    )
}

const ServicesCheckboxes = (lpnData) =>{
    console.log(lpnData.data)

    return(
        <div>Hello</div>
    )
}

export default Cogs;