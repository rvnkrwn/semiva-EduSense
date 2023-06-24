const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION
});

const openai = new OpenAIApi(configuration);

exports.chatAI = async (req, res, next) => {
    const prompt = req.body.prompt;
    const material = "['no', 'question', ['options'], 'answer']"
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `format akan selalu sama dengan sebelumnya harap jangan berubah ${prompt} dengan format soal wajib seperti ini ${material}, sekali lagi wajib dengan format seperti itu`,
            temperature: 0.7, // Menggunakan suhu yang lebih tinggi untuk memberikan variasi pada respons.
            max_tokens: 1000, // Mengurangi jumlah token yang dihasilkan agar tidak terlalu panjang.
            top_p: 0.9, // Menggunakan top-p sampling untuk membatasi variasi jawaban.
            frequency_penalty: 0.2,
            presence_penalty: 0.5 // Menambahkan presence penalty untuk mendorong variasi dalam respons.
        });
        req.user = response.data.choices[0].text
        next();

    } catch (error) {
        res.status(500).send(error || 'Something went wrong');
    }
};