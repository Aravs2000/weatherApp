const { json } = require("express");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const https = require("https");


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    //res.send("Server is in hot run");
});
app.post("/", function(req, res) {
    console.log(req.body.city);
    const apiKey = "58460f29d363d4ccadf8dc00bc820c14";
    const query = req.body.city;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDes = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>the weather is " + weatherDes + "</p>");
            res.write("<h1>Temperature in" + query + " is " + temp + " degree celsius<h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });

});


// const apiKey = "58460f29d363d4ccadf8dc00bc820c14";
//     const query = "San Jose";
//     const unit = "metric";
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
//     https.get(url, function(response) {
//         console.log(response.statusCode);
//         response.on("data", function(data) {
//             const weatherData = JSON.parse(data);
//             const temp = weatherData.main.temp;
//             const weatherDes = weatherData.weather[0].description;
//             const icon = weatherData.weather[0].icon;
//             const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
//             res.write("<p>the weather is " + weatherDes + "</p>");
//             res.write("<h1>Temperature in San Jose " + temp + " degree celsius<h1>");
//             res.write("<img src=" + imageURL + ">");
//             res.send();
//         });
//     });
// res.on("data", function(data) {
//    console.log(data);
// });






app.listen(process.env.PORT || 3000, function() {
    console.log("server started at port 3000");
});