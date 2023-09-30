import './ProjectDetails.css';
import ProjectDetailsHeader from '../projectDetailsHeader/ProjectDetailsHeader';
import ProjectDetailsBody from '../projectDetailsBody/ProjectDetailsBody';
import ProjectDetailsRest from '../projectDetailsRest/ProjectDetailsRest';
import { Task } from '../../pages/projectView/ProjectView';

type ProjectDetailsType = {
  task: Task;
};

const ProjectDetails = ({ task }: ProjectDetailsType) => {
  console.log(task);
  return (
    <div className='projectDetails'>
      <ProjectDetailsHeader />
      <ProjectDetailsBody task={task} />
      <ProjectDetailsRest />
    </div>
  );
};

export default ProjectDetails;
