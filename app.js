const got=require('got');
const GoogleSpreadsheet=require('google-spreadsheet')
const {promisify}=require('util')
const cred=require('./client_secret_177478103339-0ijdj4ecdvqhqn0e0lhkdk1mlhenktrt.apps.googleusercontent.com.json')
const doc=new GoogleSpreadsheet('1GdcrfdQpPcDp1qMn2dIArJzrG9lyB73nsABKdbj5b9o');
(async()=>{
await promisify(doc.useServiceAccountAuth)(cred);
const info=await promisify(doc.getInfo)();
const sheet=info.worksheets[0];
const rows= await promisify(sheet.getRows)();
const ids= rows.map(r => r.id).join(',');
const response=await got(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ids}&key=${process.env.token}`

);
items=Json.parse(response.body).items;
console.log(items)
})();