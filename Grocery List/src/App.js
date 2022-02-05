import React, { useState, useEffect } from "react"
import List from "./List"
import Alert from "./Alert"

function App() {
  const [name, setName] = useState("")
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editID, SetEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      showAlert(true, "danger", "no value entered")
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )
      setName("")
      SetEditID(null)
      setIsEditing(false)
      showAlert(true, "sucess", "You changed a value")
    } else {
      showAlert(true, "success", "you added a grocery to the list")
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName("")
      SetEditID(null)
      setIsEditing(false)
      showAlert(true, "sucess", "You changed a value")
    }
  }
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg })
  }
  const clearList = () => {
    showAlert(true, "danger", "You deleted all the grocery list")
    setList([])
  }
  const removeItem = (id) => {
    showAlert(true, "danger", "An item has been removed")
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((Item) => Item.id === id)
    setIsEditing(true)
    SetEditID(id)
    setName(specificItem.title)
  }
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list />}
        <h3>Grocery List</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  )
}
export default App
