var mysql = require('./mysql')
var dateTime = require('./datetime')
const readline = require('readline')
const request = require('request-promise')
const {Pool, Client} = require('pg')
const openurl = require('openurl')
var confpool = require('./configs/poolconf.js')
var sql = require('./configs/sql')




      connectionExec = () => {client.connect( (err) => {if (err) throw err;
        dateTime.getCurrentDateTime()
        console.log('Connection to DB established...\n')
        pgcon = true
      })
    }


    async function externalQueryExecutor(input){
        
        dateTime.getCurrentDateTime()
        console.log(`External request has been received for ${input}`+'\n')
        sqlext.values[0] = input
        sqltest.values[0] = input
        var output = client.query(sqltest, (err, res) => { if (err) throw err;
         
            let arrstr2 = new Array();
            let extjsonarr = new Array();  
            return arrstr2 = res.rows.forEach( (el, i, array) => 
              {
              arrstr2[i] = JSON.stringify(array[i])
              extjsonarr[i] = JSON.parse(arrstr2[i])
              console.log(arrstr2[i]+'\n')  
              
              
              return arrstr2
            
              }); 
              //console.log(extjsonarr[0].scheme_name);
           
          });

       return output
    

      }

//success Promise
      function externalQueryExecutorP(input){
        
        dateTime.getCurrentDateTime()
        console.log(`External request has been received for ${input}`+'\n')
        sqlext.values[0] = input
        sqltest.values[0] = input
        return new Promise ((resolve, reject) => {
        client.query(sqlext, (err, res) => { 
            
            if (err) {throw err;}
         
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
       //return output
    

      }



 const poolPostgres = new Pool(confpool.configPostgres)

//Обработка запроса с помощью пула

 function executorPool(input) {
        
    dateTime.getCurrentDateTime()
    console.log(`Request Processor: External request has been received for executorPool for ${input}`+'\n')
    sql.sqlext.values[0] = input
    sql.sqltest.values[0] = input

    
  

    return new Promise ((resolve, reject) => {
/*
        poolPostgres.connect((err, client, release) => {
            if (err) {
              dateTime.getCurrentDateTime()
              return console.error('Request Processor: Error acquiring client', err.stack)
            }
   */         

  poolPostgres.query(sql.sqlext, (err, res) => {
           // release();
            if (err) {throw err;}

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
   //return output


  }
 /* 
  )
}
*/
      

      connectionClose = () => {
/*
        client.end( (err) => {if (err) throw err; 
              dateTime.getCurrentDateTime()
              console.log('Connection to DB closed...\n')
              process.exit(0) 
    
          })
          */
          poolPostgres.end(() => {
            console.log('pool has ended')
          })

         }


    exports.connectionClose = connectionClose;
    exports.externalQueryExecutor = externalQueryExecutor;
    exports.connectionExec = connectionExec;
    exports.sqlext = sqltest;
    exports.externalQueryExecutorP = externalQueryExecutorP;
    exports.executorPool = executorPool;
