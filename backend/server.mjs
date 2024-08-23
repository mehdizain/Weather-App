import {createServer} from "http"
import { request } from "http";
const server=createServer((req,res)=>
{
    if(req.url=="/")
    {
        const api_req=request(`http://api.weatherapi.com/v1/current.json?key=ccfc8afb46ec43289e5161955242308&q=Lahore&aqi=no`,(weatherRes)=>
        {
            let data="";
            weatherRes.on("data",(chunk)=>
        {
            data+=chunk;
        })
        weatherRes.on("end",()=>
        {
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow all origins
                'Access-Control-Allow-Methods': 'GET', // Allow GET method
              });
              res.end(data);
        })
        weatherRes.on('error',()=>
        {
            res.writeHead(500,"Error fetching data");
            res.end("Error 500. Page Not Found!");
        })
        });
        //necessary to end the api_req
        api_req.end();
    }
    else
    {
        res.writeHead(404,{"Content-Type":"text/plain"})
        res.end("Error 404. Page Not Found!");
    }
})
server.listen(8000,"localhost",()=>{
    console.log("Node using port 8000");
})