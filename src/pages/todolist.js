import React, { useState, useEffect, } from 'react';
import './todolist.scss';
import Content from './compontent/Content';
import logoImage from '../images/tree.png';
import { Draggable, Droppable } from 'react-drag-and-drop'

function TodoList() {


  return (
    <div>

      <div id='todolist'>
        <div className='frame'>
          <div className='header'>
            <div className='header-container'>
              <div className='header-name' >
                <img className="header-logoImage" src={logoImage} alt="" />
                TodoList
              </div>
            </div>
          </div>
          <div className='content'>
            <Content />

          </div>
          <div className='footer' />
        </div>
      </div>
    </div>

  );
}



export default TodoList;
