import React,{useEffect,useState} from "react";
import axios from "axios";
import "../CSS/my.css";

interface location {
    city:string
}


const FiveDayForecast = (props:location) => {
    const [data,setData] = useState<any[]>([]);

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${props.city.toLowerCase()}&units=metric&appid=b39e955721c7a117b70c2b01d463661e`)
        .then(
            (res) => {
                setData(res.data.list);
                // console.log(props.city), 
                // console.log(data);
            }
        ).catch(
            (err) => {console.log(err)}
        );
      },[props.city]);

    const filteredData = data.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

    return(
        <>
            <h4 className="fiveday_h">5 day forecast</h4>
            <div className="fiveday">
                {
                    filteredData.map((v,i) => {
                        return <div className="box" key={i}>
                            <p>{new Date(v.dt_txt).toDateString().split(" ")[0].toUpperCase()}</p>
                            <p><span>{Math.floor(v.main.temp)}&deg;c</span></p>
                            <img src={`https://openweathermap.org/img/wn/${v.weather[0].icon}@2x.png`} alt="" />
                            <p>{v.weather[0].main}</p>
                        </div>
                    })
                }
            </div>
        </>
    )
}
 
export default FiveDayForecast;