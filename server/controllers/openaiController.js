const {Configuration, OpenAIApi} = require('openai');

require('dotenv').config();
//
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// });
//
// const openai = new OpenAIApi(configuration);
//
// exports.chatAI = async (req, res, next) => {
//     const prompt = req.body.prompt;
//     const material = `[
// {"no": 1, "question": "Apa yang dimaksud dengan luas permukaan bumi?", "options": ["Penyebaran populasi manusia di
// bumi", "Ketebalan lapisan atmosfer bumi", "Permukaan total yang ditempati bumi", "Jumlah negara di dunia"], "answer":
// "Permukaan total yang ditempati bumi"},
// {"no": 2, "question": "Apa nama simbol untuk unsur Kimia Sulfur?", "options": ["Pb", "Fe", "S", "Cu"], "answer": "S"},
// {"no": 3, "question": "Berapakah jari-jari bumi?", "options": ["6.370 km", "1.400 km", "12.742 km", "3.959 km"],
// "answer": "6.370 km"},
// {"no": 4, "question": "Siapakah yang menemukan teori gravitasi universal?", "options": ["Isaac Newton", "Albert
// Einstein", "Charles Darwin", "Stephen Hawking"], "answer": "Isaac Newton"},
// {"no": 5, "question": "Siapakah presiden Indonesia ke-4?", "options": ["Gus Dur", "Susilo Bambang Yudhoyono", "BJ
// Habibie", "Megawati Soekarnoputri"], "answer": "BJ Habibie"}
// ]`;
//
//     try {
//         const response = await openai.createCompletion({
//             model: "text-davinci-003",
//             prompt: `format akan selalu sama dengan sebelumnya harap jangan berubah ${prompt} dengan format soal wajib seperti ini ${material}, sekali lagi wajib dengan format seperti itu`,
//             temperature: 0.7,
//             max_tokens: 1000,
//             top_p: 0.9,
//             frequency_penalty: 0.2,
//             presence_penalty: 0.5
//         });
//         const dataJSON = {data: response.data.choices[0].text};
//
//         req.user = dataJSON.data;
//         next();
//     } catch (error) {
//         return res.status(500).send(error || 'Something went wrong');
//     }
// };


const axios = require('axios');
require('dotenv').config();

// exports.chatAI = async (req, res, next) => {
//     const prompt = req.body.prompt;
//     const apiKey = 'sess-b8LHi1ajicz1gnsxmIKQ6h2orBCBJAUaMOA1OKhi';
//
//     const headers = {
//         'Authorization': `Bearer ${apiKey}`,
//         'Content-Type': 'application/json',
//         'Connection': 'keep-alive',
//     };
//
//     const requestData = {
//         model: 'text-davinci-003',
//         prompt: prompt,
//         temperature: 1,
//         max_tokens: 2048,
//     };
//
//     try {
//         const response = await axios.post('https://api.openai.com/v1/moderations', requestData, { headers });
//         const content = response.choices[0].message.content
//         res.send(content);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };


const configuration = new Configuration({
    apiKey: 'sess-b8LHi1ajicz1gnsxmIKQ6h2orBCBJAUaMOA1OKhi'
});
const openai = new OpenAIApi(configuration);

exports.chatAI = async (req, res, next) => {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }

    const prompt = req.body.prompt || '';
    if (prompt.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please enter a valid prompt",
            }
        });
        return;
    }

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(prompt),
            temperature: 0.6,
            max_tokens: 1000
        });
        if (!completion){
            return res.send({msg: 'failed generate questions'})
        }
        const data = completion.data.choices[0].text;
        req.user = data.replace(/\\n/g, '').replace(/\\/g, '');
        next();
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}

function generatePrompt(prompt) {
    const capitalizedprompt =
        prompt[0].toUpperCase() + prompt.slice(1).toLowerCase();
    return ` ${capitalizedprompt} to text format like this [{"no": 1,"question": "What is the capital of France?","options": ["London", "Paris", "Rome", "Berlin"],"answer": "Paris"},{"no": 2,"question": "Who painted the Mona Lisa?","options": ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],"answer": "Leonardo da Vinci"}] please dont make other response`
}
