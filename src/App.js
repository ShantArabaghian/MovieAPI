import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./components/home/Home";
import { MovieDetail } from "./components/moviedetail/MovieDetail";
import './App.css'
export function App() {
  return (
    <header>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={MovieDetail} />
      </Switch>
    
    </header>
  );
}

export default App;
