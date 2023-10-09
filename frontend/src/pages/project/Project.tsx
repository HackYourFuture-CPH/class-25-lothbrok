import React from 'react';
import './Project.css';
import ProjectView from '../projectView/ProjectView';
const Project = () => {
  return (
    <div className='project'>
      <div className='top-box'>top-box under navigation-bar</div>
      <ProjectView />
    </div>
  );
};
export default Project;
