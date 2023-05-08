const readline = require("readline");
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Write data: '
  });
const writeStream = fs.createWriteStream('./02-write-file/text.txt')

writeStream.on('error',  (error) => {
    console.log('An error occured');
});

rl.prompt()

rl.on('line',(line)=>{
   switch(line.trim()){
    case 'exit':
        rl.close()
        writeStream.end(()=>{
            console.log('Data input was terminated')
        })
        break
    default:
        writeStream.write(line)

   }
})

rl.on('SIGINT', () => {
    console.log('Data input was terminated')
    process.exit()
})
