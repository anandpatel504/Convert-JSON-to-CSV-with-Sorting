const csvjson = require('csvjson');
const fs = require("fs");

function Jsontocsv(jsonfile,csvfile) {
    fs.readFile(__dirname + jsonfile, (err, data) =>{
        var fileContent = JSON.parse(data)
        if (err){
            console.log(err);
        }else{
            Sortlist(fileContent)
            var csvdata = csvjson.toCSV(fileContent, {headers: 'key'});    
            fs.writeFile(__dirname + csvfile, csvdata, (err) =>{
                if (err){
                    console.log(err);
                }else{
                    console.log("json data converted in csv format successfully!")
                }
            })
        }
    });
}

function Sortlist(dict) {
    let result=[]
    let list=[]
    for (var i of dict){
        list.push(Object.values(i)[0])
    }
    list.sort()
    for(var val of list){
        for(var dic of dict){
            if((Object.values(dic)[0])===val){
                result.push(dic)
            }
        }
    }
    var sort_csvdata = csvjson.toCSV(result, {headers: 'key'});
    fs.writeFile(__dirname + "/sorted.csv", sort_csvdata, (err) =>{
        if (err){
            console.log(err);
        }else{
            console.log("Sorted data converted in csv format successfully!")
        }
    })
}
Jsontocsv("/Main.json","/Maindata.csv")

// // For writing data into json file from csv file...
fs.readFile(__dirname + "/Maindata.csv","utf-8",(err,data)=>{
    console.log(data);
    var csvdata=csvjson.toObject(data)
    fs.writeFile(__dirname+"/Main.json", JSON.stringify(csvdata),(err)=>{
        if (err){
            console.log(err);
        }else{
            console.log("success...");
        }
    })
})
