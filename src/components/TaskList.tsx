import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'; // Importing necessary components for drag-and-drop functionality
import { v4 as uuidv4 } from 'uuid'; // Importing UUID to generate unique IDs
import ListMenu from './ListMenu'; // Importing ListMenu component
import EditTask from './EditTask'; // Importing EditTask component

// Define interfaces for task item details and list items
interface itemDetail {
  id: string;
  title: string;
  content: string;
}

interface ListItem {
  id: string;
  showAddForm: boolean;
  title: string;
  items: itemDetail[];
}

const TaskList = () => {
  // State hooks to manage different aspects of the task list
  const [lists, setLists] = useState<ListItem[]>([]); // State for the lists
  const [listTitle, setListTitle] = useState(''); // State for the title of a list
  const [card, setCard] = useState(''); // State for the card content
  const [isOpen, setIsOpen] = useState(false); // State to manage the modal open/close state
  const [initialContent, setInitialContent] = useState<itemDetail>(); // State for initial content
  const [taskId, setTaskId] = useState(''); // State for task ID

  // Function to open a task modal and set initial content
  const onOpenTaskModal = (taskId: string, item: itemDetail) => {
    setTaskId(taskId);
    setInitialContent(item);
    setIsOpen(true);
  };

  // Function to close the task modal
  const onCloseModal = (open: boolean) => {
    setIsOpen(open);
  };

  // Function to save edited task modal content
  const onSaveTaskModal = (taskId: string, cardTaskid: string, content: string) => {
    if (taskId.trim() === '' || cardTaskid.trim() === '' || content.trim() === '') return;

    let temporaryList = [...lists];
    temporaryList.forEach((element) => {
      if (element.id === taskId) {
        element.items.forEach((tasks) => {
          if (tasks.id === cardTaskid) tasks.content = content;
        });
      }
    });
    setLists(temporaryList);
    setTaskId(taskId);
    setInitialContent({ id: '', title: '', content: '' });
    setIsOpen(false);
  };

  // Function to add a new list
  const addList = () => {
    if (listTitle.trim() === '') return;

    let uniqueId = uuidv4();
    let temporaryList = [...lists];
    temporaryList.push({ id: uniqueId, showAddForm: false, title: listTitle, items: [] });
    setLists(temporaryList);
    setListTitle('');
  };

  // Function to add a new card to a list
  const addCard = (id: string) => {
    if (card.trim() === '') return;

    let uniqueId = uuidv4();
    let temporaryList = [...lists];
    temporaryList.forEach((element) => {
      if (element.id == id) element.items.push({ id: uniqueId, title: card, content: '' });
    });
    setLists(temporaryList);
    setCard('');
    showForm(id);
  };

  // Function to remove a card from a list
  const removeCardList = (id: string) => {
    let temporaryList = [...lists];
    temporaryList = temporaryList.filter((item) => item.id !== id);
    setLists(temporaryList);
  };

  // Function to show/hide the form for adding a new card
  const showForm = (id: string) => {
    let temporaryList = [...lists];
    temporaryList.forEach((element) => {
      if (element.id == id) element.showAddForm = !element.showAddForm;
    });
    setLists(temporaryList);
  };

  // Function to handle input change for list title
  const handleInputChange = (event: any) => {
    setListTitle(event.target.value);
  };

  // Function called when a drag-and-drop operation ends
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceList = lists.find((list) => list.id === source.droppableId);
    const destList = lists.find((list) => list.id === destination.droppableId);

    if (!sourceList || !destList || source.droppableId === destination.droppableId) return;

    const sourceItems = [...sourceList.items];
    const destItems = [...destList.items];

    const draggedItem = sourceItems.find((item) => item.id === draggableId);

    if (!draggedItem) return;

    sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, draggedItem);

    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === sourceList.id) {
          return { ...list, items: sourceItems };
        }
        if (list.id === destList.id) {
          return { ...list, items: destItems };
        }
        return list;
      })
    );
  };

  return (
    <>
    <DragDropContext onDragEnd={handleDragEnd}>
      <section className="lists-container">
        {lists.map((list, index) => (
          <Droppable key={list.id} droppableId={list.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef} >
                <div className="list">
                  <div className='menu-card-button'>
                    <h3 className="list-title">{list.title}</h3>
                    <ListMenu id={list.id} removeList={() => removeCardList(list.id)}/>
                  </div>
                  <ul className="list-items">
                      {list.items.map((item: itemDetail , itemIndex: number) => (
                        <Draggable key={item.id} draggableId={item.id} index={itemIndex}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                            <li onClick={() => onOpenTaskModal(list.id, item)}>{item.title}</li>  
                            </div>
                          )}
                        </Draggable>
                      ))} 
                  </ul>
                {provided.placeholder}
                {list.showAddForm ?
                <div>
                  <div className='input-card'>
                    <textarea className='text-area-card' value={card} onChange={(e) => setCard(e.target.value)} />
                  </div>
                  <div className='list-buttons'>
                    <button className="add-card-btn btn" onClick={()=> { addCard(list.id)} }>Add Card</button>
                    <button className="remove-list-btn btn" onClick={()=> { showForm(list.id)} }>X</button>
                  </div>
                </div>: ''
                }
                <button className="add-new-card-btn btn" onClick={()=> { showForm(list.id)} }>+ Add a card</button>
                </div>
              </div>
            )}
          </Droppable>
        ))}
          <div className="board-search">
            <input type="text" value={listTitle} onChange={handleInputChange} placeholder='Enter list title...' className="board-add-list-input" aria-label="List title"/>
            <button className="add-list-btn btn" onClick={addList}>Add List</button>
          </div>
         
      </section>
    </DragDropContext> 
    {isOpen ?
        <EditTask isOpen={isOpen} taskId={taskId} initialContent={initialContent} onSave={(taskId: string ,cardTaskid: string, content: string ) => onSaveTaskModal(taskId, cardTaskid, content) } onClose={ () => onCloseModal(false)} /> 
        : ''
    }
    </>
  );
};

export default TaskList;
