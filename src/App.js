import React, { useEffect, useState } from "react";
import { FiSun} from "react-icons/fi";
import { MdLocationOn } from 'react-icons/md';
import axios from "axios";
const App=()=>
{
  const [city,setCity]=useState("#");
  const [country,setCountry]=useState("#");
  const [date,setDate]=useState("#");
  const [temp,setTemp]=useState("#");
  const [cond,setCond]=useState("#");
  useEffect(()=>
  {
    async function getData()
    {
      try
      {
    let res=await axios.get("http://localhost:8000/");
    //the actual data is in res.data
    let actualData=res.data;
    setCity(actualData.location.name);
    setCountry(actualData.location.country);
    setDate(actualData.location.localtime);
    setTemp(actualData.current.temp_c);
    setCond(actualData.current.condition.text);
  }
  catch(err)
  {
    console.log("Error fetching data",err);
  }
    }
    getData();
  },[date]);
  return(
    <React.Fragment>
    <div className="container">
      <div className="wicon">
      <FiSun className="icon"/>
      </div>
      <div className="wdata">
      <MdLocationOn className="pin"/>
      <h3 id="location">{city},{country}</h3>
      <h4 id="date">{date}</h4>
      <h2 id="temp">{temp}°</h2>
      <h4 id="minmax">{cond}</h4>
      </div>
    </div>
    </React.Fragment>
  )
}
export default App;