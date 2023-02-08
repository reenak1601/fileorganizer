const fs=require("fs") ;
const path=require("path") ;


function treFun(dirPath) 
{
    if(dirPath== undefined)
    {
        console.log("Give Valid path");
        return ;
    }
    
    let doesExist=fs.existsSync(dirPath) ;
if (doesExist==true)
{
    treeHelper(dirPath," ") ;
 }   
}

function treeHelper(targetPath,indent)
{

    let isFile=fs.lstatSync(targetPath).isFile() ;

    if(isFile==true)
    {
        let fileName=path.basename(targetPath) ;
        console.log(indent + "├── " + fileName);
        return;
    }

    let dirName=path.basename(targetPath) ;
    console.log(indent + "└──" + dirName);



   let children=fs.readdirSync(targetPath) ;

    for(let i=0;i<children.length; i++)
    {
        let childpath=path.join(targetPath,children[i]) ;
        treeHelper(childpath,indent+"\t") ;
    }
}
// treFun("/Users/bbb/Desktop/Dev/node js/fileorganizer") ;

module.exports = {
    tree:treFun
  };