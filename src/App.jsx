import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 100,
      });
      const generatedText = completion.data.choices[0].text;
      setResult(generatedText);
      setPrompt('');
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <textarea cols="30" rows="10" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="write your prompt" />
      <button onClick={handleClick} disabled={loading || prompt.length === 0}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      <pre>{result}</pre>
    </>
  );
}

export default App;
