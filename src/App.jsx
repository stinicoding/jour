import "./App.css";
import Header from "./components/Header";
import Habits from "./components/Habits";
import Month from "./components/Month";

function App() {
  return (
    <>
      <Header />
      <div className="startpage">
        <Habits />
        <Month />
      </div>
    </>
  );
}

export default App;
