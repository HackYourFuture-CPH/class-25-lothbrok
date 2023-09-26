import React from 'react';
import './ProjectDetails.css';
import ProjectDetailsHeader from '../projectDetailsHeader/ProjectDetailsHeader';
import ProjectDetailsTitle from '../projectDetailsTitle/ProjectDetailsTitle';
import OtherDetails from '../otherDetails/OtherDetails';

const ProjectDetails = () => {
  return (
    <div className='projectDetails'>
      <ProjectDetailsHeader/>
      <ProjectDetailsTitle/>
      <OtherDetails/>
    </div>
  )
}

export default ProjectDetails;