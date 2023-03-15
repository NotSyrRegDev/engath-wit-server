// IMPORT PACKAGES 
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import pkg from 'node-wit';
import axios from 'axios';

const {Wit} = pkg;
// APP 


const app = express();


// GET WIT AI TOKEN

const accessToken = process.env.WIT_TOKEN;

// HANDLE MESSAGE

const handleMessage = async message =>{
    try{
        const client = new Wit({accessToken});
        // Send the message to the AI
        const response = await  client.message(message, {});
        // CHECK RESPONSE
        if(response) {
        
            
    let name = undefined;
    let confidence = 0;

    // LOOP

    Array(response).forEach(r => {
        if ( r.intents.length > 0 ){
            name = r.intents[0].name;
            confidence = r.intents[0].confidence;
        }
        console.log(name);
      
    });

    switch(name) {
        
        case 'cases':
            return handleCases();
        
        case 'emergancy':
            return handleEmergancy();
        
        case 'teams':
            return handleTeams();
        
        case 'Paramedics':
            return handleParamedics();
        
        default:
           return handleHello()
        

    }


 

        }

    }catch(error){
        if(error) console.log(error);
    }
}



const handleEmergancy =  async () => {

    return axios({
        method: 'get',
        url: 'http://127.0.0.1:5001/cloudfunctions-1c323/us-central1/app/api/cases', 
        params: {},
    }).then(function (response) {
            // handle success
            
            return response.data;
    }).catch(function (error) {
            // handle error
            console.log(error);
    });
   
}



const handleCases = async () => {

    return axios({
        method: 'get',
        url: 'http://127.0.0.1:5001/cloudfunctions-1c323/us-central1/app/api/cases', 
        params: {},
    }).then(function (response) {
            // handle success
            
            return response.data;
    }).catch(function (error) {
            // handle error
            console.log(error);
    });
}

const handleParamedics = async ( ) => {

    return axios({
        method: 'get',
        url: 'http://127.0.0.1:5001/cloudfunctions-1c323/us-central1/app/api/paramedics', 
        params: {},
    }).then(function (response) {
            // handle success
            
            return response.data;
    }).catch(function (error) {
            // handle error
            console.log(error);
    });

   

}


const handleTeams = async () => {
    
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:5001/cloudfunctions-1c323/us-central1/app/api/teams', 
        params: {},
    }).then(function (response) {
            // handle success
            
            return response.data;
    }).catch(function (error) {
            // handle error
            console.log(error);
    });

  
}

// ROUTES 

app.get('/' , (req , res) => {
    res.send("<h1> SERVER IS RUNNIING </h1>")
});



app.get('/chatbot/:query' , async (req  , res) => {
    
    // QJERY IS : REQ.PARAMS.QUERY
    
    // RESPONSE
    res.set('Access-Control-Allow-Origin', '*');
     res.send(await handleMessage(req.params.query));

 
    
  

});






// SERVER LISTERNER 
app.listen();

app.listen(process.env.PORT , () => {
    console.log(`Server running on port ${process.env.PORT}`)
})