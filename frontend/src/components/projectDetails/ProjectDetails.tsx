import './ProjectDetails.css';
import ProjectDetailsHeader from '../projectDetailsHeader/ProjectDetailsHeader';
import ProjectDetailsTitle from '../projectDetailsTitle/ProjectDetailsTitle';
import ProjectDetailsRest from '../projectDetailsRest/ProjectDetailsRest';

const ProjectDetails = () => {
  return (
    <div className='projectDetails'>
      <ProjectDetailsHeader/>
      <ProjectDetailsTitle/>
      <ProjectDetailsRest/>
    </div>
  )
}

export default ProjectDetails;