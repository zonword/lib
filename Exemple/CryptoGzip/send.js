"use strict"

const fs     = require('fs');
const zlib   = require('zlib');
const crypto = require('crypto');
const http   = require('http');
const path   = require('path');

const file   = process.argv[2];
const server = process.argv[3];

const options = {
   hostname: server,
   port: 3000,
   path: '/',
   method: 'PUT',
   headers : {
      filename          : path.basename(file),
      'Content-type'    : 'application/octet-stream',
      'Content-Encoding': 'gzip'
   }
};

const req = http.request(options, res => {
   console.log('Server response : ' + res.statusCode);
});

console.log(file);

fs.createReadStream(file)
   .pipe(zlib.createGzip())
   .pipe(crypto.createCipher('aes192', 'a_shared_secret'))
   .pipe(req)
   .on('finish', () => {
      console.log('File successfully sent');
   });
