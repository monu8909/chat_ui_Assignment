import "./App.css";
import Chat from "../src/ChatFolder/Chat";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={"/Profile4.png"} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Chat />
    </div>
  );
}

export default App;