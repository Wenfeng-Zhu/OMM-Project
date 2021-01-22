var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

//create MongoDB URI
//memes-generate cluster0 database:memes
const mongoURI = 'mongodb+srv://chenke_xie:omm123456@cluster0.y41uj.mongodb.net/memes?retryWrites=true&w=majority';

//create Mongo connection
const conn = mongoose.createConnection(mongoURI);

//Init gfs
let gfs;



/**
 * The following part about how express connects with mongodb, refer to the source:
 * https://github.com/bradtraversy/mongo_file_uploads
 */
conn.once('open', () => {
  //Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('memes_templates');
});

//create store engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if(err){
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'memes_templates'
        };
        resolve(fileInfo);
      });
    });
  }
});

//Init upload memes-template
const upload_template = multer({ storage });



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// @route POST /upload
// @desc  Uploads memes-template to DB
app.post('/upload', upload_template.single('file'), (req, res) => {
  res.redirect('/');
});


// @route GET /templates
// @desc  Display all files in JSON
app.get('/templates', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }
    // Files exist
    return res.json(files);
  });
});


// @route GET /templates/:filename
// @desc Display Image
app.get('/templates/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});



// @route DELETE /templates/:id
// @desc  Delete file
app.delete('/templates/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'memes_template' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }
    res.redirect('/');
  });
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
