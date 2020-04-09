/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=' 
const apiKey = 'cbc502e975454f16bf09dd4d5f7e092a';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'-'+ d.getDate()+'-'+ d.getFullYear();

// async function that GET data from weather API
const weatherData = async(baseURL, zipCode, apiKey) =>{
    const res = await fetch(baseURL + zipCode + '&appid=' + apiKey + '&units=imperial');
    try{
        const data = await res.json();
        return data;
    } catch(error) {
        console.log('error', error);
    };
};

// event listener when generate button is clicked
document.getElementById('generate').addEventListener('click' , actionPerformed);

//function for event listener
function actionPerformed(e){
    e.preventDefault();
    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;

    weatherData(baseURL, zipCode, apiKey)
    .then(function(data){
        postData('/add' , {
            temp: Math.round(data.main.temp), 
            date: newDate , 
            userResponse: userResponse
        });
        appUI('/all');
    });
}


// async function that POST data from weather API
const postData = async ( url = '', data = {})=>{
       const res = await fetch(url, {
       method: 'POST', // *GET, POST, PUT, DELETE, etc.
       credentials: 'same-origin',
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
       },
      // Body data type must match "Content-Type" header        
       body: JSON.stringify(data), 
     });
     
       try {
         const newData = await res.json();
         return newData;
       }catch(error) {
       console.log("error", error);
       // appropriately handle the error
       }
   }

   // async function to retrieve data from app
   const appUI = async( url = '') =>{
       const request = await fetch(url);
       try {
           const addData = await request.json();
           document.getElementById('temp').innerHTML = 'Temperature: ' + addData[0].temp;
           document.getElementById('date').innerHTML = 'Date: ' + addData[0].date;
           document.getElementById('content').innerHTML = "Today's feelings: " +addData[0].userResponse + "!";
       } catch (error) {
        console.log('error', error);
       };
   };