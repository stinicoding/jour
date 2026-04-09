import { useState, useEffect } from "react";
import axios from "axios";
import URL from "../config.js";

function Journal({ owner, today, postsOfMonth, setPostsOfMonth }) {
  const [input, setInput] = useState("");

  //console.log(input);
  //console.log(postsOfMonth);

  const handleJournal = () => {
    const todays_post = postsOfMonth.find((p) => p.date === today);
    if (todays_post) {
      updateJournal(todays_post._id);
    } else {
      saveJournal();
    }
  };

  const saveJournal = async () => {
    try {
      const post = await axios.post(`${URL}/journal/newpost`, {
        text: input,
        date: today,
        owner: owner,
      });
      console.log(post);
      //setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const updateJournal = async (id) => {
    try {
      const response = await axios.patch(`${URL}/journal/updatepost/${id}`, {
        text: input,
      });
      setPostsOfMonth((prev) =>
        prev.map((p) => (p._id === id ? response.data : p)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const todays_post = postsOfMonth.find((p) => p.date === today);
    if (todays_post) {
      setInput(todays_post.text);
    }
  }, [postsOfMonth]); 

  return (
    <div className="journal">
      <h3>how was your day?</h3>
      <textarea
        className="journal-text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => handleJournal()}>save</button>
    </div>
  );
}

export default Journal;
