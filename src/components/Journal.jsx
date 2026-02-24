import { useState } from "react";
import axios from "axios";
import URL from "../config.js";

function Journal({ owner, today }) {
  const [input, setInput] = useState("");

  //console.log(input);

  const savePost = async () => {
    try {
      const post = await axios.post(`${URL}/journal/newpost`, {
        text: input,
        date: today,
        owner: owner,
      });
      //console.log(post);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="journal">
      <h3>how was your day?</h3>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => savePost()}>save</button>
    </div>
  );
}

export default Journal;
