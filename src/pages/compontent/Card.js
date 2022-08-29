import React, { useEffect, useState } from "react";
import './Card.scss';
import CardImage from '../../images/checkmark.png';
import axios from 'axios';



function Card({ task, tasks, setTasks, status, manager, taskName, setTaskName, taskNumber, section, sections, sectionId, sectionName }) {



  const [toggle, setToggle] = useState(false);

  //삭제의 원리 > setTask중에서 해당 매개변수 taskNum과 같지 않은것들만 노출시킨다. 
  // 즉, 삭제된 object는 사라진것이 아닌 보이지 않을 뿐이기 때문에, taskNum과 같은 object를 localStorage
  // 에서 삭제시켜야 한다.

  const onRemove = taskNum => {

    const newTasks = tasks.filter(li => li.taskNumber !== taskNum)
    // const deleteTask = tasks.map(li => li.taskNumber === taskNum)
    // 해당 값과 같은걸 삭제한다.
    setTasks(newTasks)
    // localStorage.setItem('Tasks', JSON.stringify(newTasks))
    setToggle(!toggle)
    console.log('작업', taskNum)

    axios.delete('/api/tasks/delete?taskNumber=' + taskNum)
      .then((res) => {
        console.log(res.data);
        console.log(taskNumber);

      })
      .catch((err) => {
        console.log(taskNumber);
      })



  };


  //taskName 항목을 input 열어주는 버튼
  const [editTaskState, setEditTaskState] = useState(false);



  // 작업을 done단계로 이동시켜주는 함수
  const onNext = taskNumber => {
    console.log(tasks)
    let newTasks = tasks.map(li => {
      if (li.taskNumber === taskNumber) {
        return {
          ...li,
          status: 10
        };
      } else {
        return li;
      }
    })
    setTasks(newTasks);


    axios.put("/api/tasks/edit/done", {
      status: 10, taskNumber: taskNumber
    }
    )
      .then((res) => {
        console.log(res.data);
        console.log('섹션', taskNumber);
      })
      .catch((err) => {

      })

  }


  //다른 항목으로 이동시켜주는 함수
  const goTodo = (sectionId, taskNumber) => {
    let newTask = tasks.map(li => {
      if (li.taskNumber === taskNumber) {
        return {
          ...li,
          status: sectionId
        };
      } else {
        return li;
      }
    });
    setTasks(newTask);
    console.log(tasks)
    setToggle(!toggle);



    axios.put("/api/tasks/edit/status", {
      status: sectionId, taskNumber
    }
    )
      .then((res) => {
        console.log(res.data);
        console.log('섹션', taskNumber);
      })
      .catch((err) => {

      })
  }


  // ...버튼으로 토글을 닫는 함수
  const stay = taskNum => {
    setToggle(!toggle);
  }

  //작업이름 수정기능을 활성화해주는 버튼
  const [editTaskNameBtn, setEditTaskNameBtn] = useState(false);

  const openEditInput = () => {
    setEditTaskNameBtn(!editTaskNameBtn)
    setToggle(!toggle)
  }

  //새로운 작업이름을 관리하는 state
  const [newTaskName, setNewTaskName] = useState('');


  //새로운 taskNmae의 input 입력값
  const onEditTaskName =
    (e) => {
      setNewTaskName(e.target.value);

    };


  //새로운 작업이름의 작업으로 교체해주는 함수
  const onClickSubmitButton = taskNumber => {
    const editedTaskName = tasks.map(li => {

      if (li.taskNumber === taskNumber) {
        return {
          ...li,
          taskName: newTaskName,
        }


      } else {
        return {
          ...li
        }
      }
    })
    // console.log(editedTaskName)
    setTasks(editedTaskName);
    // localStorage.setItem('Tasks', JSON.stringify(newTaskName));
    setEditTaskNameBtn(!editTaskNameBtn);
    // console.log(editTaskNameBtn);
    setNewTaskName('');
    console.log(newTaskName)
    axios.put("/api/tasks/edit", {
      taskName: newTaskName, taskNumber //넘겨주기
    }
    )
      .then((res) => {
        console.log(res.data);
        console.log('섹션', taskNumber);
      })
      .catch((err) => {

      })
  }




  return (
    <div id="Card" >
      <div className='card-list-box'>
        <div className="card-container">

          <div className="card-content-wrapper">
            <img className="check-image" onClick={() => onNext(task.taskNumber)} src={CardImage} alt="" />
            {editTaskNameBtn ?
              <div className="card-name"> <input value={newTaskName} className="AddModal-input" onChange={onEditTaskName} /><button onClick={() => onClickSubmitButton(task.taskNumber)}>입력</button></div>



              : <div className="card-name">{task.taskName}</div>}


            <div className="card-manager"> Manager : {task.manager}
            </div>
          </div>
        </div>
        {toggle ?
          <div>
            <div className="toggle-btn" onClick={() => stay(task.taskNumber)}>...</div>
            {/* 작업이동 토글 추가 */}

            {editTaskState ?
              <div className="toggle-btn-container">
                <div className="toggle-btn" onClick={() => setEditTaskState(!editTaskState)}> Move task</div>
                <div className="toggle-btn-wrapper">

                  {sections.filter(li => li.sectionId !== section.sectionId).map((status) => {
                    return (
                      < div className="toggle-btn" onClick={() => goTodo(status.sectionId, task.taskNumber)}>  go {status.sectionName}  </div>)
                  }

                  )}

                </div>
              </div>
              :
              <button className="toggle-btn" style={{ cursor: 'pointer' }} onClick={() => setEditTaskState(true)} >Move task</button>}
            <div className="toggle-btn" style={{ cursor: 'pointer' }} onClick={openEditInput}>Rename task</div>


            <div className="toggle-btn" style={{ cursor: 'pointer', }} onClick={() => onRemove(task.taskNumber)}
            >Delete task</div>
          </div>
          :
          <button className="toggle-btn" style={{ cursor: 'pointer' }} onClick={() => setToggle(!toggle)} >...</button>}


      </div>


    </div >





  );
}


export default Card;
