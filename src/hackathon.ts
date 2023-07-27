import express from 'express';

const app = express();
const PORT = 3000;

const enum Button {
    plus = "plus",
    minus = "minus"
}
let counterPlus = 0;
let counterMinus = 0;

app.use(express.static('static'))
app.use(express.json())

app.get('/', (req, res) => {
   
  })

app.post('/click', (req, res) => {
    let { button } = req.body;
    if(button === Button.plus){
        counterPlus++;
    } else if (button === Button.minus){
        counterMinus++ 
    }
     res.json({counterPlus, counterMinus});
})

app.listen(PORT, () => {
    console.log('Server started at port ' + PORT)
});

