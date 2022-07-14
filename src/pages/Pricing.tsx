import { useLayoutEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { ButtonCounter } from "../components/ButtonCounter";
import TodoComponent from "../components/Todo";

/**
 * https://stackoverflow.com/questions/71868736/router-does-not-work-with-link-react-router-dom-6
 */

const history = createBrowserHistory();

export default function Pricing() {
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
      <h1>Pricing</h1>
      <TodoComponent/>
    </div>
  );
}
