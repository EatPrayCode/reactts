import React, { useEffect, useState } from "react";

// define types for the data we receive from the REST
type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

type Photo = {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
};

const FetchExample: React.FC = () => {
    // define state to store results from the REST calls
    // note the type of the state: Todo[] | undefined
    // we type it as the data we expect OR undefined;
    // if it's undefined, then we don't have data yet, so we can act accordingly
    const [todos, setTodos] = useState<Todo[] | undefined>();
    const [photos, setPhotos] = useState<Photo[] | undefined>();
    // we'll also add state for more todos we'll never get, in order to
    // demonstrate error handling
    const [badTodos, setBadTodos] = useState<Todo[] | undefined>();
    // in case an error happens during fetch, we need a way to indicate that
    // so we use additional state to record error status for our data
    const [todosError, setTodoError] = useState(false);
    const [photosError, setPhotosError] = useState(false);
    const [badTodosError, setBadTodoError] = useState(false);

    // we put API calls in a useEffect hook (since fetching data happens as a side
    // effect after rendering)
    // if two side effects don't depend on each other at all, it's best to put
    // them in two separate useEffects, so that's what we'll do here
    // effect: fetch todos
    useEffect(() => {
        // (this is not entry-level, but good for quality-of-life)
        // create an AbortController that we'll use to cancel the request if necessary
        // (if we don't do this, then the user could load the component to start
        // the request, then unmount the component, and the request would keep going
        // anyway 👎)
        const abortCtrl = new AbortController();
        // make the request
        fetch("https://jsonplaceholder.typicode.com/todos", {
            // here is where we pass the abort controller's signal so we can abort
            // the request if necessary
            // (don't forget to include this bit!)
            signal: abortCtrl.signal,
        })
            .then((response: Response) => {
                // check response.ok, throw error if not ok
                // YOU ALWAYS NEED TO DO THIS!
                if (!response.ok) {
                    // you could throw a normal Error(), but I like throwing the response
                    // so during error handling you can get the response code and other
                    // info (though I don't think you tend to need this, but it could be
                    // helpful sometimes)
                    throw response;
                }
                // if we're ok, return response.json() so the next .then receives the
                // JSON-parsed response data
                return response.json();
            })
            // you need to explicitly set the type here, otherwise it'll be a useless `any`
            .then((data: Todo[]) => {
                // we have data now, do something with it
                setTodos(data);
            })
            .catch((_err) => {
                // YOU ALWAYS NEED A CATCH (otherwise errors will not be handled)
                // depending on the use case, error handling might be more fancy,
                // but all we'll do here is set todoError to true so we can display am
                // error message
                setTodoError(true);
            });
        // cleanup function: abort the abort controller
        return () => abortCtrl.abort();
    }, []); // ← ← this dependency array is important!!!!
    // without it, we'd be making requests after EVERY RENDER 👎👎

    // effect: fetch photos
    useEffect(() => {
        const abortCtrl = new AbortController();
        fetch("https://jsonplaceholder.typicode.com/photos", {
            signal: abortCtrl.signal,
        })
            .then((response: Response) => {
                if (!response.ok) throw response;
                return response.json();
            })
            .then((data: Photo[]) => {
                setPhotos(data);
            })
            .catch((_err) => {
                setPhotosError(true);
            });
        return () => abortCtrl.abort();
    }, []);

    // effect: fetch bad todos to demo error handling
    useEffect(() => {
        const abortCtrl = new AbortController();
        // here, we purposefully access a URL that doesn't exist
        fetch("https://jsonplaceholder.typicode.com/thisURLwill404", {
            signal: abortCtrl.signal,
        })
            .then((response: Response) => {
                if (!response.ok) throw response;
                return response.json();
            })
            .then((data: Todo[]) => {
                setBadTodos(data);
            })
            .catch((_err) => {
                setBadTodoError(true);
            });
        return () => abortCtrl.abort();
    }, []);

    // with all the useEffects dealt with, now we actually render something
    // involving that data
    // when rendering data involving network requests, you usually have four cases to handle:
    // - data is loading (usu. display loading msg or spinner)
    // - data fetch errored (usu. display err msg and maybe a way to retry)
    // - data fetch finished, but there's no data (you sometimes might want a custom empty message)
    // - data fetch finished and there is data (display it in some way)
    return (
        <div>
            <div className="photo-summary">
                {/* there are better ways to handle all these cases then multiple ternary conditions,
          but this is the fastest way to demonstrate */}
                {photos ? (
                    <p>Number of photos: {photos.length}</p>
                ) : photosError ? (
                    <p>An error occurred fetching photos 😢</p>
                ) : (
                    <p>Loading photos...</p>
                )}
            </div>
            <div className="todos">{todos ? (
                <>
                    <p>Todos (first 20):</p>
                    <ul>
                        {todos.slice(0, 20).map(todo => <li key={todo.id}>{todo.completed ? '✔ ' : ''}{todo.title}</li>)}
                    </ul>
                </>
            ) : todosError ? (
                <p>An error occurred fetching todos 😢</p>
            ) : (
                <p>Loading todos...</p>
            )}</div>
            <div className="todo-failure">
                {badTodos ? (
                    <p>Number of bad todos (wait, really? this shouldn't have worked): {badTodos.length}</p>
                ) : badTodosError ? (
                    <p>An error occurred fetching bad todos (not a surprise though 😎)</p>
                ) : (
                    <p>Loading bad todos...failure imminent...</p>
                )}
            </div>
        </div>
    );
};
export default FetchExample;
