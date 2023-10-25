const express = require('express');
const axios = require('axios');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/ask', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const openaiResponse = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
            prompt: userMessage,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer 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`,
                'Content-Type': 'application/json'
            }
        });

        const botReply = openaiResponse.data.choices[0].text.trim();
        res.json({ reply: botReply });

    } catch (error) {
        console.error("Error querying OpenAI:", error);
        res.status(500).send("An error occurred while fetching the response.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
