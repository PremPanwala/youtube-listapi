require('dotenv').config();
const { google }=require('googleapis');
const express=require('express');
const app=express();

//console.log(process.env.token)
app.post('/search',(req,response)=>{

    google.youtube('v3').search.list({
        key:process.env.token,
        part:'snippet',
        q:'flying beast',
        maxResults:3
    }).then((res)=>{
        const {data,snippet}=res;
        //console.log(data)
        let title=[];
        
        data.items.forEach(async (item) => {
            //console.log(item.snippet)
        console.log("Channelname :"+item.snippet.channelTitle,
                  "\n title :"     +item.snippet.title,
                      "\n Description :"   +item.snippet.description,
                   "\n published At :"      +item.snippet.publishedAt,
            "\n Thumbnail : "             +item.snippet.thumbnails.default.url)
        });
        
        
    })
    .catch((e)=>{
        console.log(e)
    })

})

app.listen(3000,()=>{
    console.log("Server is up at 3000")
})