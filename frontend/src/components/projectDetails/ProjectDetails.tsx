import './ProjectDetails.css';
import ProjectDetailsHeader from '../projectDetailsHeader/ProjectDetailsHeader';
import ProjectDetailsBody from '../projectDetailsBody/ProjectDetailsBody';
import ProjectDetailsRest from '../projectDetailsRest/ProjectDetailsRest';
import { Task } from '../../types/Task';

type ProjectDetailsType = {
  task: Task;
};

const ProjectDetails = ({ task }: ProjectDetailsType) => {
  return (
    <div className='projectDetails'>
      <ProjectDetailsHeader />
      <ProjectDetailsBody task={task} />
      <ProjectDetailsRest />
    </div>
  );
};

export default ProjectDetails;
