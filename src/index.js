import express from 'express';
import bodyParser from 'body-parser';
import cars from './routes/car';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

cars(app);

app.listen(3000, () => {
  console.log('server running on port 3000!');
});
