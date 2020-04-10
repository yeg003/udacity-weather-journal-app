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
            date: newDate , 
            temp: Math.round(data.main.temp), 
            userResponse
        })
        .then(function (newData){
            appUI();
        })
        
    });
};


// async function that POST data from weather API
const postData = async ( url = '', data = {})=>{
       const req = await fetch(url, {
       method: 'POST', // *GET, POST, PUT, DELETE, etc.
       credentials: 'same-origin',
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
       },
      // Body data type must match "Content-Type" header        
      body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        userResponse: data.userResponse
      })

     });
     
       try {
         const newData = await req.json();
         return newData;
       }catch(error) {
         // appropriately handle the error
       console.log("error", error);
      
       }
   }

   // async function to retrieve data from app
   const appUI = async() =>{
       const request = await fetch('/all');
       try {
           const addData = await request.json();
           document.getElementById('date').innerHTML = 'Date: ' + addData.date;
           document.getElementById('temp').innerHTML = 'Temperature: ' + addData.temp;
           document.getElementById('content').innerHTML = "Today's feelings: " + addData.content + "!";
       } catch (error) {
        console.log('error', error);
       };
   };