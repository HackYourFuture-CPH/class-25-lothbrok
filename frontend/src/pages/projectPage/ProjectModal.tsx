import React, { useState } from 'react';
import './ProjectModal.css';
import Rectangle from '../../assets/icons/Rectangle.png';
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
    <div className='modal'>
      <div className='modal-content'>
        <div className='flex_row'>
          <h2>New Project</h2>
          <button className='close-button' onClick={closeModal}>
            <img src={Close} alt='Close' className='close-icon' />
          </button>
        </div>
        <div className='left-content'>
          <label>Thumbnail</label>
          <div className='thumbnail-container'>
            <img src={thumbnail} alt='Thumbnail' className='modal-thumbnail-image' />
          </div>
        </div>
        <div>
          <label>Project name</label>
          <TextField
            variant='outlined'
            value={projectName}
            placeholder='Input Text Here'
            onChange={(e) => setProjectName(e.target.value)}
            className='mui'
            sx={{
              '& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder': {
                color: '#2B283D',
                opacity: 1,
              },
            }}
          />
          <label>Team</label>
          <Select value='Superboard' className='mui'>
            <MenuItem value='Superboard'>Superboard</MenuItem>
          </Select>
          <label>Privacy</label>
          <Select value='Public to team' className='mui last_input'>
            <MenuItem value='Public to team'>Public to team</MenuItem>
          </Select>
        </div>
        <button className='create-button' onClick={() => handleCreateProject(projectName)}>
          Create Project
        </button>
      </div>
    </div>
  );
}

export default ProjectModal;
