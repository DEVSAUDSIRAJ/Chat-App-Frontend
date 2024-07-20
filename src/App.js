import "./App.css";
import {BrowserRouter as Router ,Routes,Route} from "react-router-dom";
import Join from "./component/join/Join.jsx";
import Chat from "./component/Chat/Chat.jsx";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" Component={Join}/>
          <Route path = "/chat" Component={Chat}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
