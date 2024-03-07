// app.ts or index.ts

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
import authRouter from './Routes/auth.ts';
// import profileRouter from './Routes/profile'
const cookieParser=require('cookie-parser');
import {run} from './Models/mongoDBConfig.ts'
import { createCollection } from './Models/mongoDBConfig.ts';


app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
// app.use('/api/profile', profileRouter);

await run();
// Call the function to create the collection
await createCollection("users");
await createCollection("cars");
await createCollection("institutions");
// const Port=process.env.port;
app.listen(3030, () => {

    console.log(`listening on port ${3030}`);
}
)



console.log("Hello via Bun!");