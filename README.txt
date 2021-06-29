Group 5 final project IDG 2671

This is our web based tool for the final exam in this subject. 
The purpose of this tool is to have a plant watering system for staff and students at NTNU.
People can create a user to help water plants and maintain these further. Managers can change and create plants, 
and users. When a new person creates a profile their role will be set to anonymous, which has no more
privileges than people without a user profile. Only managers can change other users role to gardener or 
manager if needed, to keep the system secure. There are overviews of plants and users in the system, 
with much extra functionality to edit details of plants and users. 

Built with
  - MongoDB
  - ExpressJS
  - ReactJS
  - NodeJS

How to use our system:

The main folder is the server folder, which contains everything needed. Within this folder there is a client folder
that contains the front end part of the code.
Open a terminal in the main server folder and run "npm install" to install
all neccesary dependencies for the server.
Do this in the client folder as well, since both the server and client needs npm dependencies to work.

To start the client run 'npm start' in a terminal in the client folder

The system should then open your browser on the landing page
of the project. The front end sends requests to the API that is deployed on heroku.
If you want to change this to test the back end locally as well, go to client/src/api/api.js and replace line
1 to 11 with this:

      import axios from 'axios';

    const all = axios.create({
        baseURL:  'http://localhost:5000/all',
    });
    const gardener = axios.create({
        baseURL: 'http://localhost:5000/gardener',
    });
    const manager = axios.create({
        baseURL: 'http://localhost:5000/manager',
    });

To start the server locally, run "node index.js" in the main folder, after changing
the details above. Run this in a separate terminal window to start both the server and client at
the same time.   

To be able to test the forgot password functionality,
change the email of your user to one you can actually access.
An email will be sent from our API to this adress with further
info and links to change password.


Regards,
Kristian Teppan, Sandra Smaaberg, Simen Bergo and Embla Johansen
