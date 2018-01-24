import express from 'express';
import bodyParser from 'body-parser';
import transport_server from './transport_server';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

transport_server(app);

app.listen(3000, () => {
  console.log('transport server running on port 3000!');
});
