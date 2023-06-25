const {Configuration, OpenAIApi} = require('openai');

require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION
});

const openai = new OpenAIApi(configuration);

exports.chatAI = async (req, res, next) => {
    const prompt = req.body.prompt;
    const material = `[
{"no": 1, "question": "Apa yang dimaksud dengan luas permukaan bumi?", "options": ["Penyebaran populasi manusia di
bumi", "Ketebalan lapisan atmosfer bumi", "Permukaan total yang ditempati bumi", "Jumlah negara di dunia"], "answer":
"Permukaan total yang ditempati bumi"},
{"no": 2, "question": "Apa nama simbol untuk unsur Kimia Sulfur?", "options": ["Pb", "Fe", "S", "Cu"], "answer": "S"},
{"no": 3, "question": "Berapakah jari-jari bumi?", "options": ["6.370 km", "1.400 km", "12.742 km", "3.959 km"],
"answer": "6.370 km"},
{"no": 4, "question": "Siapakah yang menemukan teori gravitasi universal?", "options": ["Isaac Newton", "Albert
Einstein", "Charles Darwin", "Stephen Hawking"], "answer": "Isaac Newton"},
{"no": 5, "question": "Siapakah presiden Indonesia ke-4?", "options": ["Gus Dur", "Susilo Bambang Yudhoyono", "BJ
Habibie", "Megawati Soekarnoputri"], "answer": "BJ Habibie"}
]`;

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `format akan selalu sama dengan sebelumnya harap jangan berubah ${prompt} dengan format soal wajib seperti ini ${material}, sekali lagi wajib dengan format seperti itu`,
            temperature: 0.7,
            max_tokens: 1000,
            top_p: 0.9,
            frequency_penalty: 0.2,
            presence_penalty: 0.5
        });
        const dataJSON = {data: response.data.choices[0].text};

        console.log(dataJSON);
        res.send(dataJSON.data)
        req.user = dataJSON.data;
        next();
    } catch (error) {
        return res.status(500).send(error || 'Something went wrong');
    }
};
