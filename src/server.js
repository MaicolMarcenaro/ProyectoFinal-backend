import app from "./app.js";
import http from 'http';
import { init } from "./db/mongodb.js";

await init();

const serverHttp = http.createServer(app);
const PORT = 8080;

serverHttp.listen(PORT,()=>{
    console.log(`Servidor corriendo en puerto: ${PORT}`);
});
