
import app from "./app.js";
import Config from "./Config/Config.js";
import { connectDB } from "./Config/db.js";




 function StartServer(){
    try {

        connectDB();

app.listen(Config.PORT, () => {
    console.log(`Server running on port ${Config.PORT}`);
});
        
    } catch (error) {

        console.log(error);
        
    }
}


StartServer();