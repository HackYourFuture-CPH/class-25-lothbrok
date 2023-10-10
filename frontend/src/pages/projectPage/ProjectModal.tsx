import React, { useState } from 'react';
import styles from './ProjectModal.module.css';
import Rectangle from '../../assets/icons/Rectangle.png';
import Close from '../../assets/icons/x.png';

interface ProjectModalProps {
  closeModal: () => void;
}

function ProjectModal({ closeModal }: ProjectModalProps) {
  const [projectName, setProjectName] = useState('');
  const [projectThumbnail, setProjectThumbnail] = useState('');
  const [projectDate, setProjectDate] = useState('');
  const [projectTask, setProjectTask] = useState('');

  const handleCreateProject = () => {
    const newProject = {
      title: projectName,
      thumbnail_link: projectThumbnail,
      date_of_creation: projectDate,
      amount_of_tasks: projectTask,
    };
    closeModal();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <h2>New Project</h2>
        <button className={styles.close_button} onClick={closeModal}>
          <img src={Close} alt='Close' className={styles.close_icon} />
        </button>

        <div className={styles.left_content}>
          <label>Thumbnail</label>
          <img src={Rectangle} alt='Thumbnail' className={styles.modal_thumbnail_image} />
        </div>
        <label>Project name</label>
        <input
          type='text'
          value={projectName}
          placeholder='Input Text Here'
          onChange={(e) => setProjectName(e.target.value)}
        />
        <label>Team</label>
        <input
          type='text'
          value={projectDate}
          placeholder='Superboard'
          onChange={(e) => setProjectName(e.target.value)}
        />
        <label>Privacy</label>
        <input
          type='text'
          value={projectTask}
          placeholder='Public to team'
          onChange={(e) => setProjectName(e.target.value)}
        />
        <button className={styles.create_button} onClick={handleCreateProject}>
          Create Project
        </button>
      </div>
    </div>
  );
}

export default ProjectModal;
