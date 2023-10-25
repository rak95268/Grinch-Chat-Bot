async function main() {
  const completion = await openai.chat.completions.create({
    messages: 
    [{ 
        //The system message, with the role "system," is used to set the initial context or behavior for the model.
        role: "system", 
        content: "You are a poet." 
    },
    {   //The user message, with the role "user," represents the message or query from the user. 
        role: "user", 
        content: "Hi,How are you?" 
    }],
    // the model we used
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message.content);
}

//call the main() function
main();
