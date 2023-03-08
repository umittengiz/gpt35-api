const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  try {
    // console.log(req.body.messages[0].content);
    let message = {
      role: "user",
    };
    message.content = req.body.message;
    // const { messages } = req.body;
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [message],
    });
    const response = completion.data.choices[0].message;
    // console.log(response.content)
    res.json(response.content.split("\n\n")[1]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 9001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
