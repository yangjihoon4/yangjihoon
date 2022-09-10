import React, { useState } from 'react';
import Card from './Card.js';
import AddModal from '../modal/addModal.js';
import Image1 from '../../images/gardening.png';
import './../todolist.scss';
import axios from 'axios';
import { DndProvider, useDrag } from "react-dnd";





function Section({ section, sections, setSections, sectionName, setSectionName, sectionId, tasks, setTasks }) {
  const MovableItem = () => {
    const [{ isDragging }, drag] = useDrag({
      item: { name: 'Any custom name', type: 'Irrelevant, for now' },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const opacity = isDragging ? 0.4 : 1;
  }






  //작업을 추가하는 모달을 여는 state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  //할일의 상태를 결정해주는 state
  const [status, setStatus] = useState();


  const [sectionToggle, setSectionToggle] = useState(false);

  //섹션 삭제기능
  const removeSection = secId => {
    const newSection = sections.filter(li => li.sectionId !== secId)
    setSections(newSection)
    setSectionToggle(false)
    axios.delete('/api/sections/delete?sectionId=' + secId)
      .then((res) => {
        console.log(res.data);
        console.log(sectionId);

      })
      .catch((err) => {
        console.log(sectionId);
      })



      ;
  }


  const addTask = () => {
    //Todo 항목에 할일을 추가하려고 할 때 실행되는 함수
    setIsAddModalOpen(true)
    setStatus(sectionId);
    console.log(sectionId)

  }

  //Rename section 활성화 
  const [editSectionName, setEditSectionName] = useState(false)

  //토글 속 Rename section 버튼
  const openEditSectionName = () => {
    setEditSectionName(true)
    setSectionToggle(!sectionToggle)


  }

  const onEditSectionName =
    (e) => {
      setSectionName(e.target.value);
    };

  //Section rename 인풋 변경 버튼
  const ChangeSectionNameBtn = sectionId => {
    const editedSectionName = sections.map(li => {
      if (li.sectionId === sectionId) {
        return {
          ...li,
          sectionName: sectionName
        };
      } else {
        return {
          ...li
        }
      }
    })
    console.log(sections)
    setSections(editedSectionName)
    console.log(sections)
    setEditSectionName(!editSectionName)
    console.log(sections)
    setSectionName('');


    console.log(sectionName)

    axios.put("/api/sections/edit", {
      sectionName, sectionId
    }
    )
      .then((res) => {
        console.log(res.data);
        console.log('섹션', sectionId);
      })
      .catch((err) => {
      })
  }


  return (
    <div>
      {isAddModalOpen &&
        <AddModal isAddModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
          tasks={tasks}
          setTasks={setTasks}
          status={status}
          sectionId={section.sectionId} />}



      <div className='content-board-wrapper'>
        <div className='content-board-header'>
          {editSectionName
            ?
            <div className='content-board-header-wrapper'>
              <img className="content-Images" src={Image1} alt="" />
              <input className='content-header-input' value={sectionName} onChange={onEditSectionName}></input>
              <button className='content-header-submit' onClick={() => ChangeSectionNameBtn(section.sectionId)}>Submit</button>
            </div>
            : <div className='content-board-header-wrapper'>
              <img className="content-Images" src={Image1} alt="" />
              <div className='content-header-name'>{section.sectionName}</div>
              {sectionToggle ?
                <div className='content-board-header-toggle-wrapper'>
                  <button className='content-board-header-toggle-menu' onClick={() => setSectionToggle(false)}>...</button>
                  <button className='content-board-header-toggle-menu' onClick={() => openEditSectionName(section.sectionId)}>Rename section</button>

                  {section.sectionId === '10' ?
                    <div />
                    : <button className='content-board-header-toggle-menu' onClick={() => removeSection(section.sectionId)}>Delete section</button>}

                </div>
                : <button className='content-board-header-toggle' onClick={() => setSectionToggle(true)}>... </button>}
            </div>

          }

        </div>

        <div className='content-board-list'>


          {tasks.filter(task => task.status === section.sectionId).map(
            (task) => {
              return (<Card

                tasks={tasks}
                setTasks={setTasks}
                task={task}
                status={tasks.status}
                manager={tasks.manager}
                setStatus={setStatus}
                section={section}
                sections={sections}
                sectionId={section.sectionId}
                sectionName={sectionName}
              />)
            })}

          <div style={{
            cursor: 'pointer'
          }} className='content-add-btn' onClick={() => addTask()}> + Add task</div>
        </div>
      </div>
    </div>
  )
}

export default Section;