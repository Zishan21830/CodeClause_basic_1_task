const weatherCondition = document.querySelector(".weather_icon");
const cityInput = document.querySelector(".input_box input");
const searchIcon = document.querySelector(".fa-magnifying-glass");
const currentlocation = document.querySelector(".location");
const country = document.querySelector(".country");
const currentDay = document.querySelector(".day");
const currentMonth = document.querySelector(".month");
const currentDate = document.querySelector(".date");
const currentHours = document.querySelector(".hours");
const currentMinute = document.querySelector(".minutes");
const currentPeriod = document.querySelector(".period");
const mainTemp = document.querySelector(".main_temp");
const maxTemp = document.querySelector(".min_temp");
const minTemp = document.querySelector(".max_temp");
const weatherStatus = "clouds";

// create Date class intance
const d = new Date();

// for get the current day
let getCurrentDay = () => {
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  day = weekday[d.getDay()];
  return day.toLocaleUpperCase();
};

// for get the current month
let getCurrentMonth = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[d.getMonth()];
  return month.toLocaleUpperCase();
};

// for get the current date
const getCurrentDate = () => {
  const currentDate = d.getDate();
  return currentDate;
};

// for get the current hours
const getCurrentHours = () => {
  const currentHour = d.getHours();
  const prefix = "0";
  if (currentHour < 10) {
    return prefix + currentHour;
  } else {
    return currentHour;
  }
};

// for get the current period
const getCurrentPeriod = () => {
  const currentHour = d.getHours();
  let period = "AM";
  if (currentHour > 11) {
    return (period = "PM");
  } else return period;
};

// for get the current minutes
const getCurrentMinutes = () => {
  const currentMinute = d.getMinutes();
  const prefix = "0";
  if (currentMinute < 10) {
    return prefix + currentMinute;
  } else {
    return currentMinute;
  }
  return currentMinute;
};

// convert kelvin to celsius
const kelvinToCelsius = (data) => {
  const celsiusData = data - 273.15;
  return Math.floor(celsiusData);
};

// Set the current day, month, date, hour, minute, and period on the frontend
currentDay.textContent = getCurrentDay();
currentMonth.textContent = getCurrentMonth();
currentDate.textContent = getCurrentDate();
currentHours.textContent = getCurrentHours();
currentMinute.textContent = getCurrentMinutes();
currentPeriod.textContent = getCurrentPeriod();

const weatherIcons = [
  `<ion-icon name="rainy-outline"></ion-icon>`,
  `<ion-icon name="cloud-outline"></ion-icon>`,
  `<ion-icon name="sunny-outline"></ion-icon>`,
  `<i class="fa-solid fa-smog"></i>`,
  `<ion-icon name="water-outline"></ion-icon>`,
  `<ion-icon name="moon-outline"></ion-icon>`,
  `<ion-icon name="snow-outline"></ion-icon>`,
];

let inputResult = "Lucknow";
searchIcon.addEventListener("click", () => {
  inputResult = cityInput.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputResult}&appid=d41392d9a13cd36fa581a22531d677fe`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      currentlocation.textContent = data.name;
      country.textContent = data.sys.country;
      mainTemp.textContent = kelvinToCelsius(data.main.temp);
      minTemp.textContent = kelvinToCelsius(data.main.temp_min);
      maxTemp.textContent = kelvinToCelsius(data.main.temp_max);

      weatherCondition.textContent = "";
      switch (data.weather[0].main) {
        case "Haze":
          weatherCondition.insertAdjacentHTML("afterbegin", weatherIcons[3]);
          break;

        case "Mist":
          weatherCondition.insertAdjacentHTML("afterbegin", weatherIcons[4]);
          break;

        case "Clear":
          if (getCurrentHours() > 19 || getCurrentHours() < 6) {
            weatherCondition.insertAdjacentHTML("afterbegin", weatherIcons[5]);
            break;
          } else {
            weatherCondition.insertAdjacentHTML("afterbegin", weatherIcons[2]);
            break;
          }
        case "Clouds":
          if (data.weather[0].description == "overcast clouds") {
            weatherCondition.insertAdjacentHTML("afterbegin", weatherIcons[0]);
            break;
          } else {
            weatherCondition.insertAdjacentHTML("afterbegin", weatherIcons[1]);
          }
          case "Snow":
            weatherCondition.insertAdjacentHTML("afterbegin", weatherIcons[6]);
            break;
      }
    });
});
