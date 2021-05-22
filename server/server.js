const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const PORT = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended : true}))

let equationData = [];

function solution(response) {
    if (response.modifier == '+') {
        response.solution = (parseFloat(response.num1) + parseFloat(response.num2));
    } else if (response.modifier == '-') {
        response.solution = (parseFloat(response.num1) - parseFloat(response.num2));
    } else if (response.modifier == '*') {
        response.solution = (parseFloat(response.num1) * parseFloat(response.num2));
    } else if (response.modifier == '/') {
        response.solution = (parseFloat(response.num1) / parseFloat(response.num2));
    }
};

app.post('/equations',(req,res) => {
    console.log(req.body);

    

   

    solution(req.body);
    console.log('line 34 server',solution(req.body));

    equationData.push(req.body);

    res.sendStatus(201);
})

app.get('/equations', (req, res) => {
    console.log('got to /equations');



    res.send(equationData);
})

// start listening for connections
app.listen(PORT, () => {
    console.log('RUNNING ON PORT:', PORT)
});