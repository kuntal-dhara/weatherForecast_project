import React,{useEffect,useState} from "react";
import axios from "axios";
import "../CSS/my.css";
import humidity_icon from "../assets/Image/humidity.png";
import wind_icon from "../assets/Image/wind.png";
import FiveDayForecast from "./FiveDayForecast";

interface data {
    humidity:number,
    windspeed:number,
    weather:string,
    temparature:number,
    location:string,
    icon:string
}

const Myapp = () => {
    const [city,setCity] = useState<string>("");
    const [info,setInfo] = useState<data>({humidity:0,windspeed:0,weather:"",temparature:0,location:"",icon:""});

    const search = () => {
        if(city === "") {
            alert("Enter city name....");
            return
        }
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&units=metric&appid=b39e955721c7a117b70c2b01d463661e`)
        .then(
            (res) => {setInfo({
                humidity:res.data.main.humidity,
                windspeed:res.data.wind.speed,
                weather:res.data.weather[0].main,
                temparature:Math.floor(res.data.main.temp),
                location:res.data.name,
                icon:res.data.weather[0].icon
            }),
            setCity("");
            }
        ).catch(
            (err) => {alert("Unable to fetch the weather forecast..."),console.log(err)}
        );
      }

    return(
        <>
            <div className="card">
                <div className="search">
                    <input type="search" value={city} placeholder="Enter city name..." name="city" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setCity(e.target.value)} />
                    <button onClick={search}><i className="fa fa-search" aria-hidden="true"></i></button>
                </div> 
                {
                    (info.location.length>0)?<div className="weather">
                    <img src={`https://openweathermap.org/img/wn/${info.icon}@2x.png`} alt="" className="icon"/>
                    <p className="temp">{info.temparature}&deg;C</p>
                    <p className="clear">{info.weather}</p>
                    <p className="loc">{info.location}</p>
                    <div className="data">
                        <div className="col">
                            <img src={humidity_icon} alt="" />
                            <div>
                                <p>{info.humidity} %</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="" />
                            <div>
                                <p>{info.windspeed} km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div> 
                    <FiveDayForecast city={info.location}/>
                    </div>:<h3 className="nodata">No data found!</h3>
                
                }
                
            </div>
        </>
    )
}

export default Myapp;

