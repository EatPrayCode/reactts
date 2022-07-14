import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';


const TodosContext = createContext({ name: 'First Last', age: 28 });


const TodoComponent = () => {

  const context = useContext(TodosContext);

  return (
    <div>
      <div>Name: {context.name}</div>
      <div>Age: {context.age}</div>
    </div>
  );
}

export default TodoComponent;