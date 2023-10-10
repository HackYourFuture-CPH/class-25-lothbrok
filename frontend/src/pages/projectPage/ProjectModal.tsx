import React, { useState } from 'react';
import './ProjectModal.css';
import Rectangle from '../../assets/icons/Rectangle.png';
import Close from '../../assets/icons/x.png';
import api from '../../api';
import { Project } from '../../types/Project';

interface ProjectModalProps {
  closeModal: () => void;
  userId: string;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[] | undefined>>;
}

function ProjectModal({ closeModal, userId, projects, setProjects }: ProjectModalProps) {
  const [projectName, setProjectName] = useState('');
  const [projectThumbnail, setProjectThumbnail] = useState('');
  const [projectDate, setProjectDate] = useState('');
  const [projectTask, setProjectTask] = useState('');

  const handleCreateProject = async () => {
    if (projectName.trim()) {
      const project = {
        title: projectName,
        date_of_creation: new Date().toISOString().split('T')[0],
        user_uid: userId,
      };
      try {
        const req = await api();
        const res = await req.post(`/dashboard/project`, project);
        const newProject = res.data[0];
        setProjects([...projects, newProject]);
      } catch (e) {
        console.error(e);
      }
    }
    closeModal();
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>New Project</h2>
        <button className='close-button' onClick={closeModal}>
          <img src={Close} alt='Close' className='close-icon' />
        </button>

        <div className='left-content'>
          <label>Thumbnail</label>
          <img src={Rectangle} alt='Thumbnail' className='modal-thumbnail-image' />
        </div>
        <label>Project name</label>
        <input
          type='text'
          value={projectName}
          placeholder='Input Text Here'
          onChange={(e) => setProjectName(e.target.value)}
        />
        <label>Team</label>
        <input type='text' placeholder='Superboard' />
        <label>Privacy</label>
        <input type='text' placeholder='Public to team' />
        <button className='create-button' onClick={handleCreateProject}>
          Create Project
        </button>
      </div>
    </div>
  );
}

export default ProjectModal;
