import React, { useState, useEffect } from 'react';
import Section from './Section.js';
import './../todolist.scss';
import axios from 'axios';
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import io from 'socket.io-client';






function Content() {
  // const socket = io.connect("http://localhost:4000", { transports: ["websocket"] });

  // socket.on("connection", () => {
  //   console.log("connection server");


  // })
  // socket.emit("message", "핑")
  // socket.on("message", function (req) {
  //   console.log(req);
  // })

  // socket.emit('message', ({ sectionName }))
  // console.log('주는 sectionName:', sectionName)
  // socket.on('message', ({ sectionName, sectionId }))
  // console.log('받는 sectionName:', sectionId, sectionName)

  // socket.on('sections', ({ sectionId, sectionName }) => {
  //   console.log(sections)
  //   setSections([...sections, { sectionId, sectionName }])
  //   console.log('socket')
  //   socket.emit('sections', ({ sectionId, sectionName }))
  // })

  const MovableItem = () => {
    const [{ isDragging }, drag] = useDrag({
      item: { name: 'Any custom name', type: 'Irrelevant, for now' },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
      <div ref={drag} className='movable-item' style={{ opacity }}>
        We will move this item
      </div>
    )
  }


  //섹션을 관리하는 state`
  const [sections, setSections] = useState([]);



  //작업을 관리하는 state
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/api/sections')
      .then((res) => {
        setSections([...sections, ...res.data]);
        console.log(res.data);
        console.log('작업들어옴')
      })
      .catch((err) => {
      })

    axios.get('/api/tasks')
      .then((res) => {
        setTasks([...tasks, ...res.data]);
        console.log(res.data);
        console.log('작업들어옴')
      })
      .catch((err) => {
      })
  }, []);

  // useEffect(() => {
  //   socket.emit('sections', ({ sectionId, sectionName }))
  //   console.log('보냄', { sectionId, sectionName })
  //   socket.on('sections', ({ sectionId, sectionName }) => {
  //     console.log(sections)
  //     setSections([...sections, { sectionId, sectionName }])
  //     console.log('끝까지 옴')
  //   })
  // }, [])


  //section을 관리하는 함수들
  const [sectionName, setSectionName] = useState('');
  const [sectionId, setSectionId] = useState();
  const [inputSection, setInputSection] = useState(false);

  // useEffect(() => {
  //   socket.emit("sections", { sectionName, sectionId })
  //   socket.on("sections", ({ sectionName, sectionId }) => {
  //     setSections([...sections, { sectionName, sectionId }])
  //   })
  // }, []);


  const addSection = () => {
    if (sectionName !== '') {
      let inputSectionData = {
        sectionName: sectionName,
      }

      const newSection = sections.concat([inputSectionData])
      setSections(newSection)
      setInputSection(false)
      setSectionName('')



      axios.post('/api/sections', {
        sectionName
      }
      )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
        })
      axios.get('/api/sections')
        .then((res) => {
          setSections([...sections, ...res.data]);
          console.log(res.data);
          window.location.reload()
        })
        .catch((err) => {
        })



    } else {
      alert('Please enter section name.')
      setInputSection(false)
    }


  }





  return (
    <div>

      <div className='content-container'>

        {sections.map(
          section =>
            <DndProvider backend={HTML5Backend}>
              <Section
                section={section}
                sections={sections}
                setSections={setSections}
                sectionName={sectionName}
                setSectionName={setSectionName}
                sectionId={section.sectionId}
                tasks={tasks}
                setTasks={setTasks}
              />
            </DndProvider>

        )
        }

        <div className='content-board-wrapper'>
          <div className='content-board-header'>
            {inputSection ?
              <div>
                <input className='content-header-input' value={sectionName} onChange={(e) => setSectionName(e.target.value)} placeholder='section name' />
                <button className='content-header-submit' onClick={addSection}>submit</button>
              </div>
              :
              <button className="content-add-btn" onClick={() => setInputSection(true)}>+ Add Section</button>}
          </div>

        </div>

      </div>




    </div>

  );
}

export default Content;