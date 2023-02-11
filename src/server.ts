import "module-alias/register";
import * as dotenv from 'dotenv'
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3333;

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);

});