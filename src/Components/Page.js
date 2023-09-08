import './Comp.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";

const Table = ()=> {
  useEffect(()=>{
    gettable();
  }, []);
const [task, settask] = useState([]);
const [name, setname] = useState("");
const [email, setemail] = useState("");
const [branch, setbranch] = useState("");
const [roll, setroll] = useState("");
const [phone, setphone] = useState("");
const [comp, setcomp] = useState("");
const [date, setdate] = useState("");


// create
const handlecreate = async()=>{
  if(comp.trim()===""){
  return alert("Please provide your complaint")
  }else if (roll.trim()==="") {
    alert("Provide your rRoll number")
  }
setcomp("")
setroll("")
const response = await axios.post("/api/create", {
name, email, branch,  roll, date, phone, comp
});
// console.log(response);
if(response.data.success){
  gettable();
}else(
  alert("Somthing went wrong")
)}

//read
const gettable = async ()=>{
  const response = await axios.get("/api/read");
  if (response.data.success){
    // console.log(response.data.table);
    settask(response.data.read);
  }else{
    alert( "Somthing went wrong");
  }
}
//update
const handleupdate = (index, newcomp)=>{
  const oldtask = [...task];
  // olddata[index].name= newname;
  // olddata[index].email= newemail;
  // olddata[index].branch= newbranch;
  // olddata[index].roll= newroll;
  // olddata[index].date= newdate;
  // olddata[index].phone= newphone;
  oldtask[index].comp= newcomp;
  settask(oldtask);
}

// delete
const handledelete = async (taskid)=>{
  let response = await axios.delete(`/delete/${taskid}`);
  if (response.data.success){
    gettable();
  }else{
    alert("Somthing went wrong")
  }
}
return(
  <>
  <div className='heading'><h1> Complaint Station of MMMUT Gorakhpur </h1></div>
  <div className="main">
  <div className="col-md-6">
    <label  className="form-label">Name</label>
    <input type="text" className="form-control"
    placeholder='Enter your name'
    value={name}
    // for= "name"
    onChange={(e)=>setname(e.target.value)}
    // required
    />
  </div>
  <div className="col-md-6">
    <label  className="form-label">Email</label>
    <input type="email" className="form-control"
    placeholder='Enter your email'
    value={email}
    // for= "email"
    onChange={(e)=>setemail(e.target.value)}
    />
  </div>
  <div className="col-md-6">
    <label  className="form-label">Branch</label>
    <input type="text" className="form-control" 
    placeholder='Enter your branch'
    value={branch}
    // for = "branch"
    // required
    onChange={(e)=>setbranch(e.target.value)}
    />
  </div>
  <div className="col-md-6">
    <label className="form-label">Roll no.</label>
    <input type="number" className="form-control" 
    placeholder='Enter your roll no.'
    value={roll}
    // for = "roll"
    // required
    onChange={(e)=>setroll(e.target.value)}
    />
  </div>
  <div className="col-md-6">
    <label className="form-label">Date</label>
    <input type="date" className="form-control" 
      placeholder="Enter date"
      value={date}
      // for= "date"
      // required
    onChange={(e)=>setdate(e.target.value)}
    />
  </div><div className="col-md-6">
    <label className="form-label">Phone number</label>
    <input type="number" className="form-control"
      placeholder="Enter your number"
      value={phone}
    onChange={(e)=>setphone(e.target.value)}
    // for = "phone"
    // required
    />
  </div>
  <div className="col-10">
    <label  className="form-label">Complaint </label>
    <input type="text" className="form-control"
      placeholder="What's your complaint"
      value={comp}
    onChange={(e)=>setcomp(e.target.value)}
    // for= "comp"
    // required
    />
  </div>
  <button
    type='button'
    className="btn btn-primary"
    onClick={()=>handlecreate()}> 
    Submit </button>
</div>


{task.map((v, i )=>{
  return(
      <div className='main'>
      <h3>Complaints:</h3>
        <ul
        key={i}
      id='table'>
          <li>Name : {v.name}</li>
          <li>Email : {v.email}</li>
          <li>Branch : {v.branch}</li>
          <li>Roll no : {v.roll}</li>
          <li> Date : {v.date}</li>
          <li>Phone no. : {v.phone}</li>
          <li>Complaint : {v.comp}</li>
          </ul>
                <button
                  onClick={() => {
                    handleupdate(v._id);
                  }}
                  className="btn btn-primary">
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    handledelete(v._id);
                  }}
                  className="btn btn-primary"
                >
                  Delete
                </button>
                </div>

  )
})}
  </>
)
}
export default Table;
