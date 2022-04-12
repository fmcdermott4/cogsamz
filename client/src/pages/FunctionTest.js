import React, {useState} from 'react';
import { useAuth } from "../util/auth";
import {useQuery, useMutation} from '@apollo/client';


const FunctionTest = ()=>{
    const { isLoggedIn, user } = useAuth();
    const [lpn, changeLpn] = useState({"lpn":""});

    const lpnChange = (e) =>{
        e.preventDefault();
        // if(e.target.value.substring(0,3) === "LPN" && e.target.value.length >= 13){
        //     goodLpn = true;
        //     changeLpn({"lpn": e.target.value})
        // } else{
        //     goodLpn = false;
        //     changeLpn({"lpn": e.target.value})
        // }
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        return false
    };


    return (
        <div>
        {/* TODO: display logged in user's username */}
            <h1>Function Test Module</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <label>LPN:</label>
                <input type="text" name="lpn" onChange={lpnChange}/>                
            </form>

            {/* {goodLpn?<LPNrender value={lpn}/>:<div></div>} */}
        </div>
    );
}

export default FunctionTest;