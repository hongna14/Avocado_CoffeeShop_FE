import { useReducer } from 'react';

function reducer(state: { name: any; age: number; }, action: { type: string; nextName: any; }) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      return {
        name: action.nextName,
        age: state.age
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}

const initialState = { name: 'Hồng Na', age: 11 };

export const Counter =() =>{
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleButtonClick() {
    dispatch({
      type: 'incremented_age',
      nextName: undefined
    });
  }

  function handleInputChange(e: { target: { value: any; }; }) {
    dispatch({
      type: 'changed_name',
      nextName: e.target.value
    }); 
  }

  return (
    <>
      <div>
        <input
          value={state.name}
          onChange={handleInputChange}
        />
        <button onClick={handleButtonClick}>
          Increment age
        </button>
        <p>Hello, {state.name}. You are {state.age}.</p>
      </div>
    </>
  );
}
