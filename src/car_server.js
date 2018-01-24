import express from 'express';
import bodyParser from 'body-parser';
import cars from './routes/car';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/cars');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

cars(app);

app.listen(3002, () => {
  console.log('cars server running on port 3002!');
});
