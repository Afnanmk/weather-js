function getCurrentDate() {
  const currentDate = new Date()
  const dname = currentDate.getDay()
  const month = currentDate.getMonth()
  const day = currentDate.getDate()
  const year = currentDate.getFullYear()

  date.innerHTML = `${week[dname]}, ${day} ${months[month]} ${year}`
}

search_button.addEventListener("click", (e) => {
  getWeather(search_input.value)
  search_input.value = ""
  getCurrentDate()
})

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2c9faa246f26593357441d74d051bdca`,
      { mode: "cors" }
    )

    const data = await response.json()
    console.log(data)

    const { name, visibility, timezone } = data
    const { main, id, icon } = data.weather[0]
    const { temp, feels_like, humidity, pressure, temp_max, temp_min } =
      data.main
    const { speed } = data.wind
    const { country, sunrise, sunset } = data.sys
    const { all } = data.clouds

    if (data.cod == "404") {
      weatherWidget.style.transform = "scale(1)"
      weatherWidget.querySelector(".error").innerText = "City Not Found"
    } else {
      weatherWidget.style.display = "block"
      weatherWidget.style.transform = "scale(1)"

      time.innerHTML = `<p class="time">Sunrise <span class="time_number">${window
        .moment(sunrise * 1000)
        .format("hh:mm a")}</span> | Sunset <span class="time_number">${window
        .moment(sunset * 1000)
        .format("hh:mm a")}</span></p>`
      cityName.innerHTML = `<h3 class="city_name">${name}, ${country}</h3>`
      condition.innerText = main
      temperature.innerHTML = `${Math.floor(
        temp
      )}<span>&#176</span><span class="temp_format">C</span> <small class="real_feel">RealFeel  ${Math.floor(
        feels_like
      )}<span>&#176</span></small></strong>`
      windEl.innerText = `${speed} km/h`
      windGustsEl.innerHTML = `${Math.floor(
        temp_max
      )}<span>&#176</span>C / ${Math.floor(temp_min)}<span>&#176</span>C`
      humidityEl.innerText = `${humidity}%`
      pressureEl.innerText = `${pressure} mb`
      cloudEl.innerText = `${all}%`
      visibilityEl.innerText = `${visibility / 1000} km`

      //FORMULA FOR FAHRENHEIT
      let fahrenheit = (temp * 9) / 5 + 32
      let real_feel_F = (feels_like * 9) / 5 + 32

      if (id < 300 && id >= 200) {
        weatherIcon.src = "./Images/Icons/thunderstorms-200.webp"
      } else if (id < 400 && id >= 300) {
        weatherIcon.src = "./Images/Icons/drizzle-300.webp"
      } else if (id >= 500 && id < 600) {
        weatherIcon.src = "./Images/Icons/rain-500.webp"
      } else if (id >= 600 && id < 700) {
        weatherIcon.src = "./Images/Icons/snow-600.webp"
      } else if (id >= 700 && id < 800) {
        weatherIcon.src = "./Images/Icons/atmosphere-700.webp"
      } else if (id === 800) {
        weatherIcon.src = "./Images/Icons/clear-800.webp"
      } else {
        weatherIcon.src = "./Images/Icons/clouds-801-804.webp"
      }

      // TOGGLE CELCIUS AND FAHRENHEIT
      document.querySelector(".temp").addEventListener("click", () => {
        if (document.querySelector(".temp_format").textContent === "C") {
          document.querySelector(".temp_format").textContent = "F"
          temperature.innerHTML = `${Math.floor(
            fahrenheit
          )}<span>&#176</span><span class="temp_format">F</span> <small class="real_feel">RealFeel  ${Math.floor(
            real_feel_F
          )}<span>&#176</span></small></strong>`
        } else {
          document.querySelector(".temp_format").textContent = "C"
          temperature.innerHTML = `${Math.floor(
            temp
          )}<span>&#176</span><span class="temp_format">C</span> <small class="real_feel">RealFeel  ${Math.floor(
            feels_like
          )}<span>&#176</span></small></strong>`
        }
      })
    }
  } catch {}
}
console.log(weatherIcon)
