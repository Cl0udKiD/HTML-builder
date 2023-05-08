const src = './05-merge-styles/styles';
const dest = './05-merge-styles/project-dist/bundle.css';
const fs = require('fs');
var bufs = []
fs.readdir(src, (err, files) => { 
    for (let i in files) {
        let temp = files[i].split('.')
        if(temp[1]==='css'){
            var readStream = fs.createReadStream(`${src}/${files[i]}`, 'utf-8');
            readStream.on('data', (data)=>{
                bufs.push(data)
            });
        }
    };
    readStream.on('end',()=>{
        const writeStream = fs.createWriteStream(dest)
        writeStream.on('error',err=>{if(err)console.log(err)})
        writeStream.write(bufs.join('\n'))
        writeStream.end()
    })
});






