/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

const apiKey = "f8bd5edc304a4743a05f4536634bd00c&units=imperial";
// funciton to fetch the temp from the api
const getTemp = async (zip) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`
  );
  try {
    const data = await response.json();
    return data.main.temp;
  } catch (error) {
    console.log("Error", error);
  }
};
//function to post  data to the server
const postData = async (url = "", data = {}) => {
  await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });
  try {
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
//function to update UI
const UpdateUI = async (response) => {
  const date = document.getElementById("date");
  const temp = document.getElementById("temp");
  const feeling = document.getElementById("content");
  date.innerText = `Date: ${response.time}`;
  temp.innerText = `Temp: ${response.temp}`;
  feeling.innerText = `Feeling: ${response.content}`;
};
//function to get data from the server
const getData = async (url = "") => {
  const response = await fetch(url);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
//the function that runs all the Promises in the event listener
function main() {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getTemp(zip)
    .then((response) => {
      console.log(response);
      console.log(newDate);
      console.log(feelings);
      postData("/postData", {
        time: newDate,
        temp: response,
        feel: feelings,
      });
    })
    .then(() => getData("/getData"))
    .then((response) => {
      console.log(response);
      UpdateUI(response);
    });
}
document.getElementById("generate").addEventListener("click", main);
