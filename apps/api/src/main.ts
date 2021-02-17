import * as express from 'express';
import { Message } from '@app/api-interfaces';
import { readFile,FSWatcher, readdir } from 'fs';

const app = express();

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

app.get('/api/files',async (req,res) => {
  // eslint-disable-next-line prefer-const
  let filenames: string[] = [];
  readdir('apps\\api\\src\\assets\\docs', (err,files) => {
    console.log(err);
    files.forEach(file => {
      if(file != undefined || null){
        filenames.push(file)
        console.log(file)
      }
      else{
        filenames.push('file non trovato')
      }
    });
    const response = JSON.stringify(filenames);
    res.send(response);
  });
});

app.get('/api/getFile',(req,res) => {
  console.log(req.query.file);
  const path= 'apps\\api\\src\\assets\\docs'
  res.download(path +'/'+ req.query.file,err => {
    console.log(err);
    res.send(404);
  });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
