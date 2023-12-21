const {
    crayon,
    crayons,
    axios,
    express,
    httpExpressUtils
} = require('./node'); 
const app = express();

httpExpressUtils.Endpoint(app);

app.listen(3000, () => {
    process.stderr.write(crayon(`http://localhost:3000`));  
});