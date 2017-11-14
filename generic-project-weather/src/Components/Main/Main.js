import React from 'react';
import style from './Main.css';

const Main = ({ weather, location }) => {
  console.log(weather);
  return (
    <div className={`${style.item} ${style.main_container}`}>
      {weather.description}
      <img className={style.image} src={weather.icon} alt={weather.description} />

      {location}
    </div>
  );
};

export default Main;
