import { useState } from "react";
import Button from "./Button";
import "./ExplainCode.css";

const ExplainCode = () => {
  const [code, setCode] = useState("");
  const [data, setData] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState("");

  const handleCallOpenAIAPI = async () => {
    fetch("http://localhost:8081/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "Explain this code: " + code,
        temperature: 0,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ['"""'],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching");
        }
        return response.json();
      })

      .then((data) => {
        setData(data.choices[0].text);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const handleInput = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className="container">
      <h1>Explain code</h1>
      {loading ? <div>Loading ...</div> : null}
      <input type="text" onChange={handleInput}></input>
      <Button onClick={handleCallOpenAIAPI} disabled={code === ""}></Button>
      {data !== "" ? <p className="data">{data}</p> : null}
      {error ? <p>error</p> : null}
    </div>
  );
};

export default ExplainCode;
