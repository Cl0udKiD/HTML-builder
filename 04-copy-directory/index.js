const fs = require('fs')
const src = './04-copy-directory/files'
const dest = './04-copy-directory/files-copy'



function copyDir(src,dest){
    fs.exists(dest,(exists)=>{
        if(!exists){
            fs.mkdir(dest,{recursive: true},(err)=>{
                if (err) console.log(err)
            })
            fs.readdir(src, (err, files) => {
                files.forEach(file => {
                    fs.copyFile(`${src}/${file}`,`${dest}/${file}`,(err)=>{
                        if(err)console.log(err)
                    })
                })
            })
        }else{
            fs.readdir(dest,(err,files)=>{
                files.forEach(file=>{
                    fs.unlink(`${dest}/${file}`,(err)=>{
                        if(err) console.log(err)
                    })
                })
                fs.readdir(src, (err, files) => {
                    files.forEach(file => {
                        fs.copyFile(`${src}/${file}`,`${dest}/${file}`,(err)=>{
                            if(err)console.log(err)
                        })
                    })
                })
            })
        }
    })
}

copyDir(src, dest)
