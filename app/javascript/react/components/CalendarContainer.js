import React, { useState } from "react"
import Calendar from 'react-calendar'
import 'reactjs-popup/dist/index.css'
import Modal from 'react-modal'
import TaskForm from './TaskForm'
import TaskIndexTile from './TaskIndexTile'

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#app');

const CalendarContainer = (props) => {
  const [value, setValue] = useState(new Date());
  const [modal, setModal] = useState({
    show: false,
    style: {
      overlay: {},
      content: {}
    }
  });

  function onChange(nextValue) {
    setValue(nextValue);
  }


  const onClickDayEvent = (value, event) => {
    setModal({
      ...modal,
      show: true,
      style: {
        ...modal.style,
        content: {
          top: event.target.offsetTop,
          left: event.target.offsetLeft
        }
      }
    })
  }

  const onCloseModal = () => {
    setModal({
      ...modal,
      show: false
    })
  }
  
  const userTaskList = props.tasks.filter((task) => {
    const dateString = `${value.getFullYear()}-${("0"+(value.getMonth()+1)).slice(-2)}-${("0" + value.getDate()).slice(-2)}`
    return task.date === dateString
  }).map((task) => {
    return (
      <TaskIndexTile
      key={task.id}
      task={task}
      />
    )
  })


  return (
    <div className="card cell medium-7 large-7 task-info">
      <div className="card-divider centered">
        <h2 className="form-header">Your Tasks</h2>
      </div>
      <div className="card-section">
        <p>Click on a date to view the day's tasks or to add a new one!</p>
        <Calendar
        onChange={onChange}
        value={value}
        onClickDay={onClickDayEvent}
        />
      </div>
      <Modal 
      isOpen={modal.show}
      style={modal.style}
      contentLabel="onRequestClose Example"
      onRequestClose={onCloseModal}
      className="Modal"
      overlayClassName="Overlay"
      >
        <p className="add-new-task-header">The day's tasks:</p>
        {userTaskList}
        <TaskForm
          date={value}
          postNewTask={props.postNewTask}
        />
        <button className="close-button" onClick={onCloseModal}>X</button>
      </Modal>
    </div>

  )
}

export default CalendarContainer