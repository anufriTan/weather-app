import React from 'react';
import './Display.css';

function Display(props) {

  if (!props.data.temp && !props.data.error) return <div className="display__error">Загружаем погоду...</div>;
  if (props.data.error) return <div className="display__error display__error_text">{props.data.error}</div>;

  const iconUrl = "https://openweathermap.org/img/wn/" + props.data.icon + "@2x.png";
  const date = new Date();
  const displayDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  const daysNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const dayOfWeek = daysNames[date.getDay()];

  return (
    <div className="display">
      <h2 className="display__title" >{props.data.city}</h2>
      <p className="display__day">{dayOfWeek}</p>
      <p className="display__date">{displayDate}</p>
      <div className="display__container">
        <img className="display__image" src={iconUrl} alt={props.data.description} />
        <div className="display__weather-container">
          <p className="display__description">{props.data.description.toUpperCase()}</p>
          <div className="display__temp-container">
            <p className="display__temp">{props.data.temp.toFixed(0)}°C</p>
            <div className="display__range-container">
              <p className="display__max-temp">{props.data.maxTemp.toFixed(0)}°C</p>
              <div className="display__line"></div>
              <p className="display__min-temp">{props.data.minTemp.toFixed(0)}°C</p>
            </div>
          </div>
          <p className="display__wind">Скорость ветра: {props.data.wind.toFixed(0)}м/сек</p>
        </div>
      </div>
    </div>
  );
}


export default Display;

