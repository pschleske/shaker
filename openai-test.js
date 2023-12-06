import OpenAI from "openai";



async function main() {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }],
            model: "gpt-3.5-turbo",
        });

        console.log(completion.choices[0]);

        // Introduce a delay (e.g., 1 second) between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.log("Rate limit exceeded. Please wait and try again.");
        } else {
            console.error("Error:", error);
        }
    }
}

// Run the function multiple times with a delay
async function runMultipleTimes() {
    for (let i = 0; i < 5; i++) {
        await main();
    }
}

runMultipleTimes();