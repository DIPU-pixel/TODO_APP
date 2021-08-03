import React, { useState ,useEffect} from "react";
import "./style.css";


// get the local storage back
const getLocalData =()=>{
  const lists=localStorage.getItem("myTodoList");
  if (lists){
    return JSON.parse(lists);
  }
  return [];
}

const Todo = () => {
  const [input, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem,setIsEditItem]=useState("");
  const [toggleButton,setToggleButton]=useState(false);

  const addItem=()=>{
    if (!input){
      alert("plz enter some data")

    }else if(input && toggleButton){
      setItems(
        items.map((curElem)=>{
          if (curElem.id === isEditItem){
            return {...curElem, name:input};
          }
          return curElem;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false)
    }
    else{
      const myNewInput ={
        id : new Date().getTime().toString(),
        name:input,
      }
     

      setItems([...items,myNewInput])
      setInputData("");
      }
  };
  // how to edit iteam
  
  const editItem= (index)=>{
    const item_todo_edited =items.find((curElem)=>{
      return curElem.id === index;

    });

     setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true)



  }

  // how to delete iteam

  const deleteItem=(index)=>{
    const updatedItems =items.filter((curElem)=>{
      return curElem.id !== index;
    })
    setItems(updatedItems)
        
  }
  const removeAll =()=>{
    setItems([]);
  }
  //adding local storage
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
   
  },[items])

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./image/todo.svg" alt="Todo" />
            <figcaption>Add your list Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder=" addItems"
              className="form-control"
              value={input}
              onChange={(event) => setInputData(event.target.value)}
            />
            {
              toggleButton ?(
                <i className="far fa-edit add-btn" onClick={addItem}></i>

              ) :(
                <i className="fa fa-plus add-btn" onClick={addItem}></i>
              )
            }
            
          </div>
          {/* show iteams */}
          <div className="showItems">

           {items.map((curElem,index)=>{
             return (
              <div className="eachItem" key={index}>
              <h3>{curElem.name}</h3>
              <div className="todo-btn">
                <i className="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>
                <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>
              </div>
            </div>

             )

           })
           }


            
          </div>

          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="remove" onClick={removeAll}>
              <span>CheckLIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
