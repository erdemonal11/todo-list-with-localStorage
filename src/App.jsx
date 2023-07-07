import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  useEffect(() => {
    const storedItems = localStorage.getItem("todoItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  function addItem() {
    if (!newItem) {
      alert("Please enter a valid Task.");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    setItems((prevItems) => {
      const updatedItems = [...prevItems, item];
      localStorage.setItem("todoItems", JSON.stringify(updatedItems));
      return updatedItems;
    });

    setNewItem("");
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      localStorage.setItem("todoItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  }

  function editItem(id, newText) {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, value: newText } : item
      );
      localStorage.setItem("todoItems", JSON.stringify(updatedItems));
      return updatedItems;
    });

    setShowEdit(-1);
    setUpdatedText("");
  }

  return (
    <>
      <div className="container">
        <h1 className="header">
          <i>ToDo List</i>
        </h1>
        <input
          type="text"
          placeholder="Add a Task..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />

        <button className="button" onClick={() => addItem()}>
          Add{" "}
          <img src="public/images/add-document.png" width={11} height={11} alt="Add" />
        </button>
        <p className="edittext">Click on task to edit the task</p>
        <ul className="listcontainer">
          {items.map((item) => (
            <div  key={item.id}>
              <li onClick={() => setShowEdit(item.id)}>
                {item.value}
                <button
                  className="deletebutton"
                  onClick={() => deleteItem(item.id)}
                >
                  <img
                    src="public/images/trash.png"
                    width={20}
                    height={20}
                    alt="Delete"
                  />
                </button>
              </li>
              {showEdit === item.id && (
                <div className="edit-container">
                  <input
                    type="text"
                    className="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                  <div className="edit-buttons">
                    <button
                      className="button"
                      onClick={() => editItem(item.id, updatedText)}
                    >
                      <img
                        src="public/images/edit.png"
                        width={20}
                        height={20}
                        alt="Edit"
                      />
                    </button>
                    <button
                      className="button"
                      onClick={() => setShowEdit(-1)}
                    >
                      <img
                        src="public/images/cross-circle.png"
                        width={20}
                        height={20}
                        alt="Cancel"
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
