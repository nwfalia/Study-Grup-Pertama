const express = require('express');
const app = express();
const port = 5000;

//data buatan
let courses = [
    {
        id: 1,
        title: 'Machine Learning',
        price: 67000
    },
    {
        id: 2,
        title: 'Web Programming',
        price: 55000
    },
    {
        id: 3,
        title: 'Android',
        price: 78000
    }
]

//set parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res, next) => {
    res.status(200).send('Hi from me!');
});

//show all data
app.get('/api/course', (req, res, next) => {
    res.status(200).json(courses);
});

//show single data
app.get('/api/course/:idCourse', (req, res, next) => {
    // courses.find(data => {
    //     if(data.id == req.params.idCourse) {
    //         return res.status(200).json(data);
    //     }     
    // });

    var dataFix = courses.find(data => data.id == req.params.idCourse);
    if(!dataFix) {
        return res.status(404).json({message: `ID ${req.params.id} Tidak ditemukan`});
    }

    res.status(200).json(dataFix);
});

//insert data
app.post('/api/course', (req, res, next) => {
    // const title = req.body.title;
    // const price = req.body.price;
    //console.log(`${title}, ${price}`);

    const { title, price } = req.body;

    var data = {
        id: courses.length + 1,
        title,
        price
    };

    courses.push(data);
    req.status(200).json(courses);
});

//update data
app.put('/api/course/', (req, res, next) => {
    var dataFix = courses.findIndex(data => data.id == req.body.idCourse);
    
    if(!dataFix) {
        return res.status(404).json({message: `ID ${req.params.id} Tidak ditemukan`});
    }
    
    if(!req.body.title || !req.body.price){
        return res.status(404).json({message: `tittle dan price tidak boleh kosong`});
    }

    courses[dataFix].title = req.body.title
    courses[dataFix].price = req.body.price
    var dataFixValue = courses[dataFix];
    
    res.status(200).json(dataFixValue);
});

app.delete('/api/course/', (req, res, next) => {
    var dataFix = courses.findIndex(data => data.id == req.body.idCourse);
    var dataFixValue = courses[dataFix];
    if(!dataFix) {
        return res.status(404).json({message: `ID ${req.params.id} Tidak ditemukan`});
    }
    courses.splice(dataFix, 1)
    
    res.status(200).json(dataFixValue);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
