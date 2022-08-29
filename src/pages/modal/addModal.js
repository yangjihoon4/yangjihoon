import React, { useState, useEffect, useRef } from "react";
import Modal from 'react-modal';

import './addModal.scss';
import axios from 'axios';



function AddModal({ isAddModalOpen, setIsAddModalOpen, section, tasks, setTasks, taskNumber, sectionId, status
}) {
  const customStyles = {
    content: {
      width: '500px',
      height: ' 350px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const [taskName, setTaskName] = useState('');
  const [manager, setManager] = useState('');






  // useEffect => 시작될때 / 변수가 바뀔때 마다 재랜더링을 시키는 변수
  // useEffect(() => {
  //   const taskNumberByStorage = JSON.parse(localStorage.getItem('TaskNumber'))
  //   console.log(taskNumberByStorage)
  //   if (taskNumberByStorage === null) 
  //     setTaskNumber(0);
  //   } else {
  //     setTaskNumber(taskNumberByStorage);
  //   };
  // }, [])






  //모달창을 닫아주는 함수
  function closeModal() {
    setIsAddModalOpen(false);
  }
  //input창 입력값을 저장해주는 함수
  const onTaskName =
    (e) => {
      setTaskName(e.target.value);
    }

  const onManager =
    (e) => setManager(e.target.value);



  //새로운 작업을 추가해주는 함수
  const addTask = () => {
    if (taskName !== '' && manager !== '') {
      let inputData = {
        taskName: taskName,
        manager: manager,
        status: sectionId, // 매개변수로 Section의 고유한 Id를 받아와서 설정
      };



      //inputData: 입력한 taskName, manager값을 오브젝트 형태로 만든것

      const newTasks = tasks.concat([inputData])

      setTasks(newTasks)

      console.log(tasks)
      //새로운 할 일 목록 STATE에 저장 완료
      // localStorage.setItem('Tasks', JSON.stringify(newTasks))
      // localStorage.setItem('TaskNumber', JSON.stringify(taskNumber + 1))
      console.log(newTasks)
      //modal 창 닫기
      setIsAddModalOpen(false)

      //input 입력값 초기화
      setTaskName('');
      setManager('');
    } else {
      alert('작업이름과 관리자를 입력해주세요!');
      setTaskName('');
      setManager('');

    }

    axios.post('/api/tasks/', { status, manager, taskName })
      .then((res) => {
        console.log(res.data);

      })
      .catch((err) => {
      });

    window.location.reload()
  }


  const cancleAdd = () => {
    setIsAddModalOpen(false)
    setTaskName('');
    setManager('');
  }





  return (
    <div>


      <div id="AddModal">

        <Modal
          isOpen={isAddModalOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
        >
          <div className="AddModal-container">
            <div className="AddModal-header-container"><p className='AddModal-header'>새로운 작업의 이름을 입력하세요.</p>
              <input value={taskName} className="AddModal-input" onChange={onTaskName} placeholder='새로운 작업의 이름을 입력해주세요.' />
              <p className="AddModal-header">담당자의 이름을 입력하세요.</p>
              <input value={manager} className="AddModal-input" onChange={onManager} placeholder='담당자의 이름을 입력해주세요.' />
            </div></div>
          <div className="AddModal-btns">

            <button className="AddModal-btn" onClick={addTask}>
              생성
            </button>

            <button className="AddModal-btn" onClick={() => cancleAdd()}>취소</button>
          </div>

        </Modal >
      </div >
    </div>
  );
}

export default AddModal;
