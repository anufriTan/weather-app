import React from 'react';
import './App.css';
import Display from './components/Display';
import Form from './components/Form';

const API_KEY = "766e9be79a0a44bb40d8d0694436e7e8";

class App extends React.Component {
  state = {
    location: {
      latitude: null,
      longitude: null,
    },
    currentData: {},   
  };

  componentDidMount() {
    if (navigator.geolocation) {

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      const success = (position) => {
        let currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.setState({ location: currentLocation });

        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.location.latitude}&lon=${this.state.location.longitude}&appid=${API_KEY}&units=metric&lang=ru`;
        fetch(URL).then((res) => {
          return res.json();
        })
          .then((data) => {
            let weatherData = {
              temp: data.main.temp,
              description: data.weather[0].description,
              icon: data.weather[0].icon,
              minTemp: data.main.temp_min,
              maxTemp: data.main.temp_max,
              city: data.name,
              wind: data.wind.speed,
              error: undefined
            }
            this.setState({ currentData: weatherData });
          })
          .catch((err) => {
            console.log(err);
            let message = {
              error: "Не удается установить связь с сервером. Попробуйте проверить подключение к Интернет или открыть приложение через несколько минут"
            };
            this.setState({ currentData: message });
          })
      };

      const error = (err) => {
        console.log(`ERROR(${err.code}): ${err.message}`);
        let message = {
          error: "Чтобы узнать погоду, введите название города"
        };
        this.setState({ currentData: message });
      };

      navigator.geolocation.getCurrentPosition(success, error, options);

    } else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
      let message = {
        error: "Чтобы узнать погоду, введите название города"
      };
      this.setState({ currentData: message });
    }
  }


  findWeather = (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;
    fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let weatherData = {
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          minTemp: data.main.temp_min,
          maxTemp: data.main.temp_max,
          city: data.name,
          wind: data.wind.speed,
          error: undefined
        }
        this.setState({ currentData: weatherData })
      })
      .catch((err) => {
        let message = {
          error: "По вашему запросу ничего не найдено"
        };
        console.log(err);
        this.setState({ currentData: message });
      })
  }

  render() {
    return (
      <div className="App">
        <Form findWeather={this.findWeather} />
        <Display data={this.state.currentData} />
      </div>
    );
  }
}


export default App;

