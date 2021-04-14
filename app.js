const {response} = require("express")
const express = require("express")
const https = require("https")

const app = express()

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html")

})




app.post("/", (req, res) => {


    const query = req.body.cityName
    const id = "021a9d2a44c3fbbb251af6e00a09ad64"
    const unit = "metric"

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${id}&units=${unit}`

    https.get(url, (response) => {
        // let data = ""
        // response.on("data", (chunk)=>{
        //     data +=chunk
        //     console.log(response.statusCode);
        // })
        // response.on('end', () => {
        //       console.log(JSON.parse(data));
        //      });

        //      response.on("error", (err) => {
        //        console.log("Error: " + err.message);
        //      });
        response.on("data", (data) => {
            const d = JSON.parse(data)
            // const obj = {
            //     name : "ike",
            //     id : 2
            // }
            // console.log(JSON.stringify(obj));
            const temp = d.main.temp
            const description = d.weather[0].description
            const icon = d.weather[0].icon
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
            // console.log(d);
            console.log(temp);
            console.log(description);
            res.write(`<h1>The temperature in ${query} is ${temp} degree celcius</h1>`)
            res.write(`<h3>The weather in ${query} is ${description} </h3>`)
            res.write(`<img src = ${imageURL}>`)
            res.send()
        })



    })


})






















app.listen(7000, () => {
    console.log("server is listening on port 7000");
})