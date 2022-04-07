import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {SUBMITTED_LPNS} from '../util/queries';
import Table from 'react-bootstrap/Table';
import { CSVLink } from "react-csv";


const Header = ()=>{
    return (
        <div className="header">
            <h1>Submitted LPNs</h1>
        </div>
    )
};

const LpnRow = (lpn, index)=>{
    let submittedDate = new Date(lpn.SubmittedDate);
    let year = submittedDate.getFullYear();
    let month = submittedDate.getMonth();
    let day = submittedDate.getDate();

    return(
        <tr key = {index} className='even'>
            <td> {index + 1} </td>
            <td>{lpn.LPN}</td>
            <td>{lpn.Subcategory}</td>
            <td>{year}-{month<10?"0":""}{month}-{day<10?"0":""}{day}</td>
            <td>${lpn.Price}</td>
            <td>{lpn.FunctionTestChecked===true?<div>Yes</div>:<div>No</div>}</td>
            <td>{lpn.CleaningChecked===true?<div>Yes</div>:<div>No</div>}</td>
            <td>{lpn.ReboxChecked===true?<div>Yes</div>:<div>No</div>}</td>
            <td>{lpn.KittingChecked===true?<div>Yes</div>:<div>No</div>}</td>
            <td>{lpn.PartsChecked===true?<div>Yes</div>:<div>No</div>}</td>
            <td>${lpn.FunctionTest}</td>
            <td>${lpn.Cleaning}</td>
            <td>${lpn.Rebox}</td>
            <td>${lpn.Kitting}</td>
            <td>${lpn.Parts}</td>
        </tr>
    )

}



const ServicesSelectedTable = ()=>{


const {data, loading, error} = useQuery(SUBMITTED_LPNS);

if(loading){
    return<div>Loading...</div>
}
if(error){
    return<div>Query error.</div>
}
console.log(data.submittedLPNs);

const headers = [
{label:"LPN", key:"LPN"},
{label:"Subcategory", key:"Subcategory"},
{label:"SubmittedDate", key:"SubmittedDate"},
{label:"Cost", key:"Price"},
{label:"FunctionTest", key:"FunctionTestChecked"},
{label:"Cleaning", key:"CleaningChecked"},
{label:"Rebox", key:"ReboxChecked"},
{label:"Manual", key:"KittingChecked"},
{label:"Parts", key:"PartsChecked"},
{label:"FunctionTestCost", key:"FunctionTest"},
{label:"CleaningCost", key:"Cleaning"},
{label:"ReboxCost", key:"Rebox"},
{label:"ManualCost", key:"Kitting"},
{label:"PartsCost", key:"Parts"}
];

const csvReport = {
    headers: headers,
    data: data.submittedLPNs,
    filename: 'SubmittedLpnExport.csv'
}

const lpn = data.submittedLPNs
const LpnTable = lpn.map((lpn,index) => LpnRow(lpn,index));

    const LpnTableHeader = <thead className='bgvi'>
                            <tr>
                                <th>#</th>
                                <th>LPN</th>
                                <th>Subcategory</th>
                                <th>SubmittedDate</th>
                                <th>Cost</th>
                                <th>Function Test</th>
                                <th>Cleaning</th>
                                <th>Rebox</th>
                                <th>Manual</th>
                                <th>Parts</th>
                                <th>Function Test Cost</th>
                                <th>Cleaning Cost</th>
                                <th>Rebox Cost</th>
                                <th>Manual Cost</th>
                                <th>Parts Cost</th>
                            </tr>
                        </thead>

    return(
    <div>
        <Header/>
        <CSVLink {...csvReport}>Export to CSV</CSVLink>
        <Table striped bordered hover>
            {LpnTableHeader}
            <tbody>
                {LpnTable}
            </tbody>

        </Table>
    </div>
        
    )
}

export default ServicesSelectedTable;