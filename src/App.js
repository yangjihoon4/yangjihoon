import React, { Suspense } from 'react';
import TodoList from './pages/todolist';
import { Routes, Route } from 'react-router-dom';

function App() {




  return (
    <div>
      <div>
        <Suspense fallback={(<div>...</div>)}>
          <Routes>
            <Route exact path="/" element={<TodoList />} ></Route>
          </Routes>
        </Suspense>

      </div>
    </div>
  );
}

export default App;

