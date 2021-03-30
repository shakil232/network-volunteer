import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import AddEvents from './Components/AddEvents/AddEvents';
import Event from './Components/Event/Event';

function App() {


  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/addEvent"> Add Event</Link>
          </li>
          <li>
            <Link to="/event">Event</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/addEvent">
            <AddEvents/>
          </Route>
          <Route path="/event">
            <Event/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
