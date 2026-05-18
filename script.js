const addressBox = document.querySelector(".address");

const tempBox = document.querySelector(".temp");

const windspeedBox = document.querySelector(".windspeed");

const descriptionBox = document.querySelector(".description");

const humidityBox = document.querySelector(".humidity");

const conditionsBox = document.querySelector(".conditions");

const searchBar = document.querySelector(".search");

async function getData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=QXAFQFHHMQTNR6HQ9HW47X79H`,
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (err) {
    return err;
  }
}

function getTemp(data) {
  return data.currentConditions.temp;
}

function getConditions(data) {
  return data.currentConditions.conditions;
}

function getHumidity(data) {
  return data.currentConditions.humidity;
}

function getWindspeed(data) {
  return data.currentConditions.windspeed;
}

function getDescription(data) {
  return data.description;
}

function getAddress(data) {
  const addressArray = data.resolvedAddress.split(",");
  return addressArray[0];
}

async function getInformation(location) {
  const data = await getData(location);

  const temp = await getTemp(data);

  const windspeed = await getWindspeed(data);

  const address = await getAddress(data);

  const humidity = await getHumidity(data);

  const conditions = await getConditions(data);

  const description = await getDescription(data);

  return { data, temp, description, conditions, humidity, address, windspeed };
}

async function displayInformation(location) {
  const info = await getInformation(location);
  tempBox.textContent = info.temp;
  windspeedBox.textContent = info.windspeed;
  addressBox.textContent = info.address;
  humidityBox.textContent = info.humidity;
  conditionsBox.textContent = info.conditions;
  descriptionBox.textContent = info.description;
}

const searchFunction = (e) => {
  if (e.key === "Enter") {
    displayInformation(e.target.value);
  }
};

searchBar.addEventListener("keydown", searchFunction);
