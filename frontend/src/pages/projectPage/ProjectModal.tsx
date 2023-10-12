import React, { useState } from 'react';
import styles from './ProjectModal.module.css';
import Close from '../../assets/icons/x.png';
import api from '../../api';
import { Project } from '../../types/Project';
import { InputLabel, MenuItem, NativeSelect, Select, TextField } from '@mui/material';

interface ProjectModalProps {
  closeModal: () => void;
  handleCreateProject: any;
  thumbnail: string;
}

function ProjectModal({ closeModal, handleCreateProject, thumbnail }: ProjectModalProps) {
  const [projectName, setProjectName] = useState('');

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.flex_row}>
          <h2>New Project</h2>
          <button className={styles.close_button} onClick={closeModal}>
            <img src={Close} alt='Close' className={styles.close_icon} />
          </button>
        </div>
        <div className={styles.left_content}>
          <label>Thumbnail</label>
          <div className={styles.thumbnail_container}>
            <img src={thumbnail} alt='Thumbnail' className={styles.modal_thumbnail_image} />
          </div>
        </div>
        <div>
          <label>Project name</label>
          <TextField
            variant='outlined'
            value={projectName}
            placeholder='Input Text Here'
            onChange={(e) => setProjectName(e.target.value)}
            className={styles.mui}
            sx={{
              '& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder': {
                color: '#2B283D',
                opacity: 1,
              },
            }}
          />
          <label>Team</label>
          <Select value='Superboard' className={styles.mui}>
            <MenuItem value='Superboard'>Superboard</MenuItem>
          </Select>
          <label>Privacy</label>
          <Select value='Public to team' className={`${styles.mui} ${styles.last_input}`}>
            <MenuItem value='Public to team'>Public to team</MenuItem>
          </Select>
        </div>
        <button className={styles.create_button} onClick={() => handleCreateProject(projectName)}>
          Create Project
        </button>
      </div>
    </div>
  );
}

export default ProjectModal;
