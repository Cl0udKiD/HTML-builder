const src = './06-build-page';
const dest = './06-build-page/project-dist';
const fs = require('fs');
var bufs = []
var compNames = []
var comps = []
var htmlTemp = ''

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

fs.exists(dest,(exists)=>{
    if(!exists)fs.mkdir(dest,(err)=>{
        if(err)console.log(err)
    });
})

fs.readdir(`${src}/styles`, (err, files) => { 
    for (let i in files) {
        let temp = files[i].split('.')
        if(temp[1]==='css'){
            var readCss = fs.createReadStream(`${src}/styles/${files[i]}`, 'utf-8');
            readCss.on('data', (data)=>{
                bufs.push(data)
            });
        }
    };
    readCss.on('end',()=>{
        const writeBundle = fs.createWriteStream(`${dest}/style.css`)
        writeBundle.on('error',err=>{if(err)console.log(err)})
        writeBundle.write(bufs.join('\n'))
        writeBundle.end()
    })
});

fs.readdir(`${src}/components`, (err, files) => { 
    for (let i in files) {
        let temp = files[i].split('.')
        if(temp[1]==='html'){
            compNames.push(temp[0])
            const readComps = fs.createReadStream(`${src}/components/${files[i]}`,'utf-8')
            readComps.on('data',(data)=>{
                comps.push(data)
            })
        }  
    };
    const readTemplate = fs.createReadStream(`${src}/template.html`,'utf-8')
    readTemplate.on('data',(data)=>{
        htmlTemp = data
    })
    readTemplate.on('end',()=>{
        for (let i in compNames){
            htmlTemp = htmlTemp.replace(`{{${compNames[i]}}}`,comps[i])
        }
        const writeHtml = fs.createWriteStream(`${dest}/index.html`)
        writeHtml.on('error',(err)=>{
            if (err) console.log(err)
        })
        writeHtml.write(htmlTemp)
    })
    
});

fs.exists(`${dest}/assets`,(exists)=>{
    if(!exists)fs.mkdir(`${dest}/assets`,(err)=>{
        if(err)console.log(err)
    });
})


fs.readdir(`${src}/assets`, (err, files) => {
    files.forEach(file => {
        var stat = fs.stat(`${src}/assets/${file}`,(error,stat)=>{
            if(stat.isDirectory()){
                copyDir(`${src}/assets/${file}`,`${dest}/assets/${file}`)
            }
        });
    })
});
