import "./styles.css";
import { useLayoutEffect, useState } from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Dogs from "./pages/dogs";
import FetchExample from "./pages/FetchExample";
import BasicTable from "./pages/Table";
import Crud from "./pages/Crud";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AsyncForms from "./components/form";
import Demo from "./components/demo";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

/**
 * https://stackoverflow.com/questions/71868736/router-does-not-work-with-link-react-router-dom-6
 */

const history = createBrowserHistory();

export default function App() {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <div className="App">
      <Router
        location={state.location}
        navigationType={state.action}
        navigator={history}
      >
        <h1>PName</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
          <li>
            <Link to="/dogs">Dogs</Link>
          </li>
          <li>
            <Link to="/fetch">Fetch</Link>
          </li>
          <li>
            <Link to="/table">Table</Link>
          </li>
          <li>
            <Link to="/crud">CRUD</Link>
          </li>
          <li>
            <Link to="/demo">MUI Demo</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/dogs" element={<Dogs />} />
          <Route path="/fetch" element={<FetchExample />} />
          <Route path="/table" element={<BasicTable />} />
          <Route path="/crud" element={<Crud />} />
          <Route path="/demo" element={<AsyncForms/>} />
        </Routes>
      </Router>
    </div>
  );
}
  