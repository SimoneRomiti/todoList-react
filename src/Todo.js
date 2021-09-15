import React from 'react'

export default function Todo({todo, toggleItem}) {
   function check(){
      console.log(todo.id);
      toggleItem(todo.id);
   }
   return (
      <div>
         <label>
            {todo.name}
            <input type="checkbox" checked={todo.completed ? true : false} onChange={check}></input>
         </label>
      </div>
   )
}
