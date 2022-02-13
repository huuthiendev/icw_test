import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home/Home";
import ChatRoom from "./pages/ChatRoom/ChatRoom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/chat-room" component={ChatRoom}></Route>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
