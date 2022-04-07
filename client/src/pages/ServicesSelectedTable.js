import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {SUBMITTED_LPNS} from '../util/queries';
import Table from 'react-bootstrap/Table';
import { CSVLink } from "react-csv";
import DatePicker from "react-datepicker";
import {Row, Col, Container} from 'react-bootstrap';

const ServicesSelectedTable = ()=>{
    const currentDate = new Date();

    const [submittedLpnParameters, updateSubmittedLpnParameters] = useState({minDate: new Date(currentDate.getFullYear(), currentDate.getMonth()-1), maxDate: currentDate, subcategory:""})
    


        return(
            <div>
                <Row>
                        <Col>
                            <label>Min Date</label>
                        </Col>
                        <Col>
                            <DatePicker showMonthDropdown showYearDropdown withPortal={true} popperModifiers={{
                    flip: {
                        behavior: ['bottom'] // don't allow it to flip to be above
                    },
                    preventOverflow: {
                        enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                    },
                    hide: {
                        enabled: false // turn off since needs preventOverflow to be enabled
                    }
                }}className="form-control" selected={submittedLpnParameters.minDate} onChange={(date)=>updateSubmittedLpnParameters({...submittedLpnParameters, minDate:date})} />
                            
                        </Col>


                    
                </Row>
                <Row>
                    <Col>
                        <label>Max Date</label>
                    </Col>
                    <Col>
                        <DatePicker className="form-control" selected={submittedLpnParameters.maxDate} onChange={(date) => updateSubmittedLpnParameters({...submittedLpnParameters, maxDate:date})} />
                    </Col>
                </Row>
                
                
                <label>Subcategory</label><br/>
                <input type="text" name="subcategory" value={submittedLpnParameters.subcategory}onChange={(e)=>updateSubmittedLpnParameters({...submittedLpnParameters, subcategory:e.target.value})}/>
                <SelectedTable submittedLpnParameters={submittedLpnParameters}/>
            </div>
        )            
    
}






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



const SelectedTable = (submittedLpnParameters)=>{

    console.log(submittedLpnParameters);
    const {data, loading, error} = useQuery(SUBMITTED_LPNS,{variables:{...submittedLpnParameters.submittedLpnParameters}});
// 
    if(loading){
        return<div>Loading...</div>
    }
    if(error){
        return<div>Query error.</div>
    }

    const headers = [
        {label:"LPN", key:"LPN"},
        {label:"Subcategory", key:"Subcategory"},
        {label:"SubmittedDate", key:"date"},
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

    const lpn = JSON.parse(JSON.stringify(data.submittedLPNs))

    const LpnTable = lpn.map((lpn,index) => LpnRow(lpn,index));

    lpn.map((lpn)=>{
        let submittedDate = new Date(lpn.SubmittedDate);
        let year = submittedDate.getFullYear();
        let month = submittedDate.getMonth();
        let day = submittedDate.getDate();
        const date = year.toString() + "-" + (month<10?"0":"")+month.toString()+"-"+(day<10?"0":"")+day.toString();
        lpn.date = date;
    })

    const csvReport = {
        headers: headers,
        data: lpn,
        filename: 'SubmittedLpnExport.csv'
    };

    const LpnTableHeader =
        <thead className='bgvi'>
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
        </thead>;

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