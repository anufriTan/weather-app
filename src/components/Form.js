import React from 'react';
import './Form.css';

function Form(props) {
  return(
    <div className="form">
      <h1 className="form__title">Погода сегодня</h1>                
      <form className="form__form" name="searchForm" onSubmit={props.findWeather} >
        <input className="form__input" type="text" name="city" placeholder="Введите город" required />                            
          <button className="form__button">Узнать погоду</button> 
      </form>
    </div>
  )    
}

export default Form;