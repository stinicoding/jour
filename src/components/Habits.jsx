import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import good from "../pictures/smiley_good.jpg";
import bad from "../pictures/smiley_bad.jpg";
import axios from "axios";
import URL from "../config.js";

function Habits({ goodHabits, setGoodHabits, badHabits, setBadHabits, owner }) {
  const [newHabit, setNewHabit] = useState("");
  const [smiley, setSmiley] = useState("good");
  const [open, setOpen] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState("");
  const [selectedHabitName, setSelectedHabitName] = useState("");

  //console.log(newHabit);
  //console.log(goodHabits);
  //console.log(badHabits);
  //console.log(selectedHabit);

  const handleClickOpen = (hab) => {
    setSelectedHabitId(hab._id);
    setSelectedHabitName(hab.name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getHabits = async () => {
    try {
      const res = await axios.get(`${URL}/habits/${owner}`);
      //console.log(res.data.good);
      setGoodHabits(res.data.good);
      setBadHabits(res.data.bad);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSmiley = () => {
    setSmiley((prev) => (prev === "good" ? "bad" : "good"));
  };

  const saveHabit = async () => {
    try {
      await axios.post(`${URL}/habits/newhabit`, {
        name: newHabit,
        typeofhabit: smiley,
        color: "#ffffff",
        owner: owner,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addNewHabit = async () => {
    await saveHabit();
    await getHabits();
    setNewHabit("");
  };

  const updateHabit = async (id, color) => {
    //console.log(typeof color);
    try {
      await axios.patch(`${URL}/habits/updatehabitcolor`, {
        id: id,
        color: color,
      });
      await getHabits();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHabit = async (hab_id) => {
    //console.log(hab_id);
    try {
      setOpen(false)
      await axios.delete(`${URL}/habits/deletehabit/${hab_id}`);
      await axios.delete(`${URL}/habitlog/deletehabitlogs/${hab_id}`);
      await getHabits();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHabits();
  }, []);

  return (
    <div>
      <section>
        <h3 className="center">add new {smiley} habit</h3>
        <div className="flex">
          <img
            className="habit-smiley clickable"
            src={smiley === "good" ? good : bad}
            onClick={toggleSmiley}
          />
          <input
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <button onClick={addNewHabit}>+ add</button>
        </div>
      </section>
      <section className="habit_list">
        <div>
          <ul className="bold">good habits</ul>
          {goodHabits?.map((hab) => (
            <li key={hab._id}>
              <p>{hab.name}</p>
              <div className="habit_adjustments">
                <input
                  type="color"
                  className="colorpicker"
                  value={hab.color}
                  onChange={(e) => updateHabit(hab._id, e.target.value)}
                />
                <button onClick={() => handleClickOpen(hab)}>x</button>
              </div>
            </li>
          ))}
        </div>
        <div>
          <ul className="bold">bad habits</ul>
          {badHabits?.map((hab) => (
            <li key={hab._id}>
              <p>{hab.name}</p>
              <div className="habit_adjustments">
                <input
                  type="color"
                  className="colorpicker"
                  value={hab.color}
                  onChange={(e) => updateHabit(hab._id, e.target.value)}
                />
                <button onClick={() => handleClickOpen(hab)}>x</button>
              </div>
            </li>
          ))}
        </div>
      </section>
      <Dialog
        open={open}
        onClose={handleClose}
        disableRestoreFocus //prevents aria errors
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${selectedHabitName}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to remove the Habit "{selectedHabitName}" from
            your list and all the belonging logs to it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={() => deleteHabit(selectedHabitId)}>Yes</button>
          <button onClick={handleClose}>No</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Habits;
