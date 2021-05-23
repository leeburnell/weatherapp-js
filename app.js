let weather = {
    apiKey: "071a830c0fc3a14a9e3185a9c7d177f9",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },

    //Function to set name of city, icon, weather description, temp and wind and append innertext of html elements
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;

      document.querySelector(".weather-city").innerText = "Weather in " + name;
      document.querySelector(".weather-icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".weather-description").innerText = description;
      document.querySelector(".weather-temp").innerText = temp + "°C";
      document.querySelector(".weather-humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".weather-wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".weather-search__bar").value);
    },
  };
  
  //Event listener for when search button is clicked
  document.querySelector(".weather-search button").addEventListener("click", function () {
    weather.search();
  });
  
  // If enter key is used to search for contents of search bar - it executes the search
  document
    .querySelector(".weather-search__bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  

//Sets default weather location
  weather.fetchWeather("Cardiff");