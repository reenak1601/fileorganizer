let fs=require("fs") ;
let path=require("path") ;

let types = {
    media: ["mp4", "mkv", "mp3","mov"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex',"csv",'json'],
    app: ['exe', 'dmg', 'pkg', "deb","apk"],
    images: ['png','jpg','jpeg']
}


function organize(scrPath) 
{
    if(scrPath==undefined)
    {
        console.log(scrPath);
        scrPath=process.cwd() //The process.cwd() method returns the current working directory of the Node.js process.
        console.log(scrPath);
    }



    //2. to create a directory
       
let organizedFile=path.join(scrPath,"organized_file") ;
console.log(organizedFile);

if(fs.existsSync(organizedFile)==false)
{
    fs.mkdirSync(organizedFile) ;
}

else {
    console.log("file already exist");
}



// 3. scan the files

let allFiles=fs.readdirSync(scrPath) ;
console.log(allFiles);
    

 //4.trvaerse over all the files and classify them on the basis of their extension (.pdf , .mp3)
    for(let i=0 ; i<allFiles.length ; i++)
    {
        let ext=allFiles[i] ;
        // console.log(ext);
        //extname returns the extension of the file
        let fullPathOfFile=path.join(scrPath,allFiles[i])
        console.log(fullPathOfFile);

        //1. check if it is a file or folder
//lstatsync gives the information regarding the link provided ,
  let isThisAFile=fs.lstatSync(fullPathOfFile).isFile() ; // true if it is a file or false if it is a folder
  console.log(allFiles[i]+ " is " +isThisAFile);
    if(isThisAFile)
    {
        //1.1 get ext name 
        let ext=path.extname(allFiles[i]).split(".")[1] ;
        console.log(ext);
         //1.2 get folder name from extension
        let folderName=getFolderName(ext) ;
        console.log(folderName);
         //1.3 copy from src folder (srcPath) and paste in dest folder (folder_name e.g. document, media etc)

         copyfileToDest(scrPath,fullPathOfFile,folderName)
    }
    }

}

  function getFolderName(ext)
  {
      for(let key in types)
      {
          for(let i=0 ; i<types[key].length ; i++)
          {
              if(types[key][i]==ext)
              {
                  return key ;
              }
          }
      }
         return "miscellaneous"
  }

  function copyfileToDest(scrPath,fullPathOfFile,folderName)

  {
      //folderpath

      let destfolderPath=path.join(scrPath,"organized_file",folderName)

      // check folder exist or not ,if it is not exist then make it

      if(!fs.existsSync(destfolderPath))
      {
          fs.mkdirSync(destfolderPath)
      }

       //3. copy file from src folder to dest folder

  // Returns the last portion of a path


   let fileName=path.basename(fullPathOfFile) //abc.zip
   let destfileName=path.join(destfolderPath,fileName)

                      //scr           //dest
   fs.copyFileSync(fullPathOfFile, destfileName);

  }



// let scrpath="/Users/bbb/Desktop/Dev/node js/fileorganizer/downloads" ;
// organize(scrpath)


module.exports = {
    organize:organize
  }



