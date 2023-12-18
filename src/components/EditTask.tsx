import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

interface itemDetail {
  id: string, 
  title: string,
  content:string,
}


interface EditTaskProps {
  isOpen: boolean;
  initialContent?: itemDetail;
  taskId: string;
  onClose: () => void;
  onSave: (taskId: string, cardTaskid:string, content: string) => void;
}

const EditTask = ({ isOpen, initialContent, taskId, onClose, onSave }: EditTaskProps) => {
  const [content, setContent] = useState(initialContent?.content);

  const handleChange = (value: string) => {
    setContent(value);
  };

  const handleSave = () => {  
    if (content?.trim() === '')
      return;

    onSave(taskId, initialContent?.id || '', content || '');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{initialContent?.title}</h2>
        <QuillEditor value={content} onChange={handleChange} />
        <div className='btn-editor'>
          <button className='add-list-btn-editor btn' onClick={handleSave}>Save</button>
          <button className='close-list-btn-editor btn' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
