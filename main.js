let helpFunc = require("./cmd/help");
let orgFunc = require("./cmd/help");
let treeFunc = require("./cmd/tree");
let inputArr=process.argv.slice(2) ;
let cmd= inputArr[0] ;
let path=inputArr[1] ;
switch(cmd)
{
    case "tree" :
        //call tree function 
        // console.log("tree");
        treeFunc.tree(path) ;
        break ;
    case "organize" :
        //call organize function 
        orgFunc.organize(path) ;
        break ;
    case "help" :
        //call help function 
         helpFunc.help() ;
        break ;
        default:
         console.log("command is not recognized");
         break ;   
}