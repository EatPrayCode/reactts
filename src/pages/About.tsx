import { useLayoutEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { ButtonCounter } from "../components/ButtonCounter";

/**
 * https://stackoverflow.com/questions/71868736/router-does-not-work-with-link-react-router-dom-6
 */

const history = createBrowserHistory();

export default function About() {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);
  const name: string = "Hello React Button";

  const onChildClicked = (e: number) => {
    console.warn("callback from parent triggered", e);
  };
  return (
    <div className="App">
      <h1>About</h1>
      <ButtonCounter name={name} onClicked={e => onChildClicked(e)} />
    </div>
  );
}
