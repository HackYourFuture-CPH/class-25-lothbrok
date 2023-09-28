import React from 'react';
import './Project.css'
import ProjectDetails from '../../components/projectDetails/ProjectDetails'
const Project = () => {
  return (
    <div className='project'>
      <div className='top-box'>top-box under navigation-bar</div>
      <div className='kristina-task'> Kristina- task</div>
      <ProjectDetails/>
    </div>
  )
}
export default Project;