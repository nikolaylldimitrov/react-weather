import { useState, useEffect } from "react";

const data = [
  {
    lat: "42.7",
    long: "23.32",
    city: "Sofia",
  },
  {
    lat: "41.39",
    long: "2.16",
    city: "Barcelona",
  },
  {
    lat: "52.52",
    long: "13.41",
    city: "Zürich",
  },
];

export const Weather = () => {
  const [info, setInfo] = useState(data);

  useEffect(() => {
    const weatherInfo = info.map((place, index) => {
      const weatherEndPoint = `https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.long}&current_weather=true`;
      return fetch(weatherEndPoint).then((response) => response.json());
    });
    Promise.all(weatherInfo).then((data) => {
      const newInfo = info.slice();
      data.forEach((weatherData, index) => {
        newInfo[index] = Object.assign({}, info[index], { weatherData });
      });
      setInfo(newInfo);
    });
  }, []);

  console.log(info);
  const weatherBox = (data) => {
    return (
      <div className="box" key={data.city}>
        <p>
          Weather in {data.city} is :{" "}
          {data?.weatherData?.current_weather.temperature}C°
        </p>
        <p>
          {" "}
          {data.city} latitude:{data?.weatherData?.latitude.toFixed(2)}
        </p>
        <p>
          {" "}
          {data.city} longitude:{data?.weatherData?.longitude.toFixed(2)}
        </p>
      </div>
    );
  };
  const weatherBoxes = info.map(d=>weatherBox(d));
  return (
    <div className="container">
      <div className="top">
        <h1> Temperature application </h1>
        <div className="box-container">
        
          {weatherBoxes}
        </div>
      </div>
    </div>
  );
};
