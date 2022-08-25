import React, { FC, useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './style.css';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  todos: Todo[];
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
};

const SingleTodo: FC<Props> = ({ todos, todo, setTodos, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isDone: true } : todo))
    );
  };

  const handleDelete = (id: number) => {
    let newTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newTodo);
  };

  const handleEdit = (id: number) => {
    if (!edit && !todo.isDone) {
      setEdit((prev) => !prev);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  return (
    <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
      {(provided,snapshot) => (
        <form
          className={`single_Todo ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleSubmit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {edit ? (
            <input
              ref={inputRef}
              className="todos_single-text input"
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className="todos_single-text dash">{todo.todo}</s>
          ) : (
            <span className="todos_single-text">{todo.todo}</span>
          )}

          <div className="icons">
            <span className="icon" onClick={() => handleEdit(todo.id)}>
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
