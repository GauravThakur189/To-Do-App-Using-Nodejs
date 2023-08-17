const getData = ()=>{
    Fs.readFile(pathtoFile,(err,fileContent)=>{
        if(err){
            return [];
        }
        JSON.parse(fileContent);
    })
}

AFwCKOOj1won4eI5