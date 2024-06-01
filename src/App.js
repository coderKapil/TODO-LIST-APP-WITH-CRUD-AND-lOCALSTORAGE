import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
// this will get the items from the local storage and show us if item exist in storage and on refresh data will not lost
  const getItems = ()=>{
    let list = localStorage.getItem("list")
    if(list){
      return JSON.parse(list)
    }
    else{
      return []
    }
  }
  const [newItem, setNewItem] = useState("");
  // jo bhi items ko hum add karenge wo ek empty array ke andar add karenge
  const [items, setItems] = useState(getItems);
  //  this state is created to handle if there is a an item exist in todo or not if exist them we can edit it else we cant edit it 
  const [showEdit, setShowEdit] = useState(-1);
  // this state is created to uddate the task in the todo list 
  const [updatedText, setUpdatedText] = useState("");

  // create
  const handleClick = () => {
    if (!newItem) {
      alert("Please add some task ");
      return;
    }
    // jo bhi new task hum add karenge uski ek id hogi aur uski ek value hogi jis se hum usko detect kar payenge
    // using this to generate random Id
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };
    // purani value oldList may aajayengoi aur items may new values aajayengi jo ab user add karega oldlist ek variable hai jisme sara old data rahega
    setItems((oldList) => [...oldList, item]);
    // task ke add hojaneke baad input fild empty hojayegi
    setNewItem("");
  };

  // update
  
  const editItem = (id,newText)=>{
     const currItem = items.filter((item)=> item.id === id)
    //  ab jo naya item banega iski ek nayi value aur id hogi to iske liye object banega
     const newItem = {
      id : currItem.id,
      value : newText
     }
  //  delete item id ke basis par hi ho
     deleteItem(id)
    //  purani value to rahe hi saath may jo naya update hua hai wo bhi add up hojaye
     setItems((oldList)=> [...oldList,newItem])
    //  update hojane ke baad field blank hojaye
     setUpdatedText("")
    //  and edit button bhi gayab hojaye
     setShowEdit(-1)
  }

  const deleteItem = (id) => {
    // as we are deleting only a specific item so i will create a new array for this
    const newarray = items.filter((item) => item.id !== id);
    setItems(newarray);
  };

  const deleteAllItems = () => {
    setItems([]);
  };

  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(items))
  },[items])
  return (
    <>
      <h1 className="header" align="center">TO DO LIST APP</h1>
      <div align="center">
        <input
          type="text"
          placeholder="Enter Your Task"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
      </div>
      <div align="center">
        <button className="btn" onClick={handleClick}>Add Task</button>
      </div>

      <ol>
        <div align="center">
          {items.map((item) => {
            return (
              <div>
                <li className="listing" key={item.id} onClick={()=>setShowEdit(item.id)}>
                  {item.value}{" "}
                  <button className="remove" onClick={() => deleteItem(item.id)}>✖ Remove</button>
                </li>
                {showEdit === item.id ? (
                  <div>
                    <input type="text" value={updatedText} onChange={(e)=> setUpdatedText(e.target.value)} />
                  {/* item.id ke basis par update karnege aur updated text ke andar rakhenge update karne ke baad */}
                    <button className="update" onClick={()=>editItem(item.id,updatedText)}>Update Task</button>
                  </div>
                )  : null}
              </div>
            );
          })}
        </div>
      </ol>

      <div align="center">
        <button className="deleteAll" onClick={deleteAllItems}>Delete All</button>
      </div>
    </>
  );
}

export default App;
