import { configDotenv } from "dotenv";
import express from 'express';
import ViteExpress from 'vite-express';
import session from 'express-session';
import OpenAI from "openai";

import authCtrl from './controller/authCtrl.js'

configDotenv();

// const openai = new OpenAI({ apiKey: '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' });
// const openaiApiKey = process.env.OPENAI_API_KEY;

const app = express();

const PORT = 5173;

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session(
    {
        secret: 'isitasecret',
        saveUninitialized: true,
        resave: false,
        cookie: {
            path: '/',
            httpOnly: false,
            maxAge: 1000 * 60 * 60 * 48
        }
    }
));

// destructure handler/controller functions
const { allUsers, register, login, logout } = authCtrl;

// endpoints below:
app.post('/api/register', register);
app.post('/api/login', login);
app.delete('/api/logout', logout)

// openai endpoints
// async function main() {
//     const completion = await openai.chat.completions.create({
//         messages: [{ role: "system", content: "You are a helpful assistant." }],
//         model: "gpt-3.5-turbo",
//     });

//     console.log(completion.choices[0]);
// }

// main();

// app.get('/api/openai', async (req, res) => {
//     try {
//         // const openaiApiKey = process.env.OPENAI_API_KEY;
//         const response = await axios.post(
//             'https://api.openai.com/v1/chat/completions',  // Replace with the actual OpenAI API endpoint
//             {
//                 data: 'your-request-data',
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${openaiApiKey}`,
//                 },
//             }
//         );

//         // Send the OpenAI API response back to the client
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error making OpenAI API request:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


ViteExpress.listen(app, PORT, () => console.log(`Ready for you on port ${PORT} !!!Head over to http://localhost:${PORT}`))