const folder = './03-files-in-folder/secret-folder';
const fs = require('fs');

fs.readdir(folder, (err, files) => {
  files.forEach(file => {
    var stat = fs.stat(`./03-files-in-folder/secret-folder/${file}`,(error,stat)=>{
        let temp = file.split('.')
        if(stat.isFile())console.log(temp[0]+' - '+temp[1]+' - '+stat.size+' Byte')
    })
  });
});
