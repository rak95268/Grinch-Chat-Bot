const express = require('express');
const OpenAIApi = require('openai');

const app = express();
const openai = new OpenAIApi({ key: 'YOUR_OPENAI_API_KEY' });

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
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are the grinch." },
                { role: "user", content: userMessage }
            ],
            model: "gpt-3.5-turbo",
        });

        const botReply = completion.choices[0].message.content;
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
