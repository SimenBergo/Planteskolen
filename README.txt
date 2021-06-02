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
that contains the front end part of the code
NPM dependencies needs to be installed seperatly in both folders for 
the project to work, do this by opening two terminals, one in each folder, 
and running npm install in both of them.

To start the server run 'node server.js' in the server terminal, opened in the server folder location
To start the client run 'npm start' in a terminal in the client folder

The system should then open your browser on the landing page
of the project. From here on you can log in with these provided test
users:

Manager for testing:
 - email: manager@user.com
 - password: Manager123

Gardener for testing:
 - email: gardener@user.com
 - password: Gardener123

The details of these users can be changed however you like.
Trying them both out will show you the areas of the system
you can access with the different levels of authorization.
To be able to test the forgot password functionality,
change the email of your user to one you can actually access.
An email will be sent from our API to this adress with further
info and links to change password.


Regards,
Kristian Teppan, Sandra Smaaberg, Simen Bergo and Embla Johansen