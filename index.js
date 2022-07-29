const express = require('express');
const colors = require('colors');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const db = require('./models');
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const app = express();
//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));

//HANDLEBARS
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
  })
);
app.set('view engine', 'hbs');

//ROUTE HANDLEBARS  HOME
app.get('/', (req, res) => {
  res.render('home', { layout: 'landing' });
});

//ROUTES GIGS
app.use('/gigs', require('./routes/gigs'));

//STATIC (ca cest aprés les routes)
app.use(express.static(path.join(__dirname, 'public')));

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `App listening on mode ${process.env.PORT} in the port ${process.env.PORT}`.white.inverse
      );
    });
  })
  .catch(err => console.log('Err:' + err));
