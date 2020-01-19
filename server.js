const express = require('express')
var dateTime = require('./datetime')
var rp = require('./RequestProcessor')
var http = require('http')
var https = require('https')
const pgpr = require('pg-promise')
const sequelize = require('sequelize')
const reqprom = require('request-promise')
const {Pool, Client} = require('pg')
const app = express()
const port = 8440

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

app.use(express.json());

app.use(express.urlencoded());

var isConnectionMade = false;


 function DataCollector(input){
        
    dateTime.getCurrentDateTime()
    console.log(`External request has been received for ${input}`+'\n')
    //sqlext.values[0] = input
    sqltest.values[0] = input
    return new Promise ((resolve, reject) => {
        client.query(sqltest, (err, res) => { if (err) {throw err;}
     
        let arrstr2 = new Array();
        let extjsonarr = new Array();  
        res.rows.forEach( (el, i, array) => 
          {
          arrstr2[i] = JSON.stringify(array[i])
          extjsonarr[i] = JSON.parse(arrstr2[i])
          console.log(arrstr2[i]+'\n')  
          
          
          return arrstr2
         
        
          }); 
          //console.log(extjsonarr[0].scheme_name);
          resolve(arrstr2) 
      });

      })
    }

app.set('view engine', 'ejs');

app.set('trust proxy', true)

var server = http.createServer();

app.get('/', (req, res) => {

    var ip = req.headers['x-real-ip']
    dateTime.getCurrentDateTime()
    console.log(`Server: Request event on start page`+'\n')
    console.log(`Server: IP address of client is: ${ip} ${req.connection.remoteAddress}`+'\n')
    res.send('Start page')
}) 

app.get('/stop', (req, res) => {
    process.exit(0) 
}) 

app.get('/process/:scheme/:id', (req, res) => {
    dateTime.getCurrentDateTime()
    console.log(`Server: Received GET-request with parameters: ${req.params.scheme}, ${req.params.id}`+'\n')

    

 


    res.send(`Target page with parameters`)

})


app.get('/search/:type/:time', (req, res) => {
    dateTime.getCurrentDateTime()
    console.log(`Server: Received GET-request for search with parameters: ${req.params.type}`+'\n')

    if (req.params.type == 'issue' && req.params.time !== null)

    { 
        res.render('Search_issue', {time: req.params.time, type: req.params.type})
    }
    if (req.params.type == 'issue' && (req.params.time === null) || (req.params.time === undefined))
    {  
        res.send(`Вы не задали временной интервал поиска`)
    }

    if (req.params.type == 'documents' && req.params.time !== null)

    { 
        res.render('Search_issue', {time: req.params.time, type: req.params.type})
    }

    if (req.params.type == 'documents' && (req.params.time === null) || (req.params.time === undefined))

    {
    
        res.send(`Вы не задали временной интервал поиска`)

    }

 
})

app.get('/search', (req, res) => {
    dateTime.getCurrentDateTime()
    console.log(`Server: Main search page requested`+'\n')

    res.render('Search')

})



app.post('/process/retrytaskexecution/:id', (req, res) => {
    dateTime.getCurrentDateTime()
    console.log(`Server: Received POST-request with parameters: ${Object.keys(req.body)[0]} ${req.body.id}, ${req.body.retrytask}`+'\n')


    res.json({status: "good"})
})


app.get('/retrytask/process/:processid', (req, res) => {
    dateTime.getCurrentDateTime()
    console.log(`Server: Received GET-request for retrytask process with id ${req.params.processid}`)


    var options = {
        method: 'POST',
        uri: `http://localhost:8440/process/retrytaskexecution/${req.params.processid}`,
        body: {
            id: `"${req.params.processid}"`,
            retrytask: "true"

        },
        json: true // Automatically stringifies the body to JSON
    };




      reqprom(options)
        .then(parsed => {
          dateTime.getCurrentDateTime()
          console.log(`POST-request has been successfully completed status ${parsed.status}`+'\n')
          res.send(`Запрос успешно обработан`)
        })
        .catch(err => {
          dateTime.getCurrentDateTime()
          console.log('Unexpected error '+err+'\n')
         })



   
})







app.get('/info/:appnum', (req, res) => {
    
  //  if (isConnectionMade == false) {rp.connectionExec(); isConnectionMade=true}

    var ip = req.headers['x-forwarded-for']
    dateTime.getCurrentDateTime()
    console.log(`Server: Request for data collection of application has been received`+'\n')
    console.log(`Server: IP address of client is: ${ip}`+'\n')

    dateTime.getCurrentDateTime()
    console.log(`Server: Sending request to Pool to process`+'\n')


   //вызываем промис из подключенного модуля

    rp.executorPool(req.params.appnum).then((arrstr2) => { 

        dateTime.getCurrentDateTime()
        console.log(`Server: Response is ${arrstr2}`+'\n')
        let jarr = [];
        arrstr2.forEach( (el, i, array) => {
            
            jarr[i] = JSON.parse(arrstr2[i]); 
            return jarr
        })
        //let jarrjs = JSON.parse(jarr);
        //let jsonres = JSON.parse(arrstr2);
        let keysobj = []
        keysobj = Object.keys(jarr[0])
        console.log(`keys is ${keysobj}`+'\n')
        console.log(`First key is ${keysobj[0]} and the value is ${jarr[0][keysobj[0]]}`+'\n')
        console.log(`Server: Scheme_name is ${jarr[jarr.length-1].scheme_name}`+'\n')
        console.log(`Server: Actual state is ${jarr[jarr.length-1].task_state_}`+'\n')
        /*res.render('Application_data', {appnum: jarr[jarr.length-1].value_, scheme_name: jarr[jarr.length-1].scheme_name, task_name: jarr[jarr.length-1].task_name_, start_time: jarr[jarr.length-1].start_time_, task_state: jarr[jarr.length-1].task_state_, process_id: jarr[jarr.length-1].id_, obj: jarr})*/
        res.render('Application_loop', {obj: jarr, keyo: keysobj})

            const nDate = new Date().toLocaleString('en-GB', {
            timeZone: 'Europe/Moscow'
          });
          
          console.log(nDate);
        console.log(`Server: Listening ${port}`+'\n')
        //res.json(arrstr2)
    }).catch((err) => {throw err;})

    

})


/*
    async function getData() { 
    var output = await rp.externalQueryExecutor(req.params.appnum);
      return output
    }

    (async function() {
        try {
            var resp = await getData();
            dateTime.getCurrentDateTime()
            console.log(`Server: Response is ${resp}`+'\n')
        }
        catch (err) {
    
            console.log(err);
        }
    })();
   */

    /*
    var output = rp.externalQueryExecutor(req.params.appnum)
    dateTime.getCurrentDateTime()
    console.log(`Server: Response is ${arrstr2}`+'\n')
    res.json(output)
    */
    //var jout = JSON.parse(output);
    //res.render('Application_data', {appnum: req.params.appnum, scheme_name: jout[0].scheme_name})



server.on('request', (req, res) => {
    dateTime.getCurrentDateTime()
    console.log(`: Request method: ${req.method}`+'\n')
    console.log(req.headers);
    console.log(req.url);
    
})


app.listen(port, (err) => {
    if (err) {
        return console.log('Error', err)        
    }    
    console.log(`server is listening on ${port}`)
})

