
# Dronalivery

This is a web application created for delivery of products using drones as a part of GC webathon'23. This web application is able to request drone pickups their deliveries in real-time. 

The user can choose start and end locations using a map. Corresponding to that the locations get converted to coordinates and  distance is also calculated. 

The application has provided admin with a user-friendly interface to manage and track all delivery requests and ensure timely delivery of packages. Both user and admin are also able to track their history(i.e. package history for user and request history for admin).


## Prerequisites and Technologies Used


### Installations Required:
npm install : run this command to install all dependencies which is stored in my package.json

nodeman app.js / node app.js / npm start: to run the webapp locally.

### Technology Used :    
Frontend : EJS, CSS, BootStrap, Javascript   
Backend : NodeJS, ExpressJS  
Database : Atlas MongoDB

### Dependencies & APIs used:
@mapbox/mapbox-sdk : api used for requesting and tracking order using maps.      

connect-flash : it is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user.         

dotenv : to store the environment variables.        

ejs : to develop the frontend template for the webpage.

express : it is a nodejs framework which is used in backend.                 

express-session : to store session keys such as current user.                  

joi : for schema validation.       

passport : used to hash our passsword and authenticate our user.(Security Purposes)

passport-local-mongoose : to connect passport with mongodb
    
Note : remaining all dependencies are basic and henceforth not mentioned above.
## Authors

- [Yash Dewangan](https://github.com/yashpd6634/)
- [Sravanth Chebrolu](https://github.com/chebro)
- [RB Suraj](https://github.com/R-B-Suraj)
- [Amrit Gaurav Rath](https://github.com/amrit2104)

