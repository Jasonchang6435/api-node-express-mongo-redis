import express from 'express';
import bodyParser from 'body-parser';
import flights from './routes/flight';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/flights');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

flights(app);

app.listen(3001, () => {
  console.log('flights server running on port 3001!');
});
