import { Task } from '../../pages/projectView/ProjectView';
import { useState, useEffect } from 'react';
import ListTable from '../listTable/ListTable';

const ProjectListView = ({ tasks }: { tasks: Task[] }) => {
  const [documentation, setDocumentation] = useState<Task[]>([]);
  const [ongoing, setOngoing] = useState<Task[]>([]);
  const [todo, setTodo] = useState<Task[]>([]);
  const [done, setDone] = useState<Task[]>([]);

  console.log(documentation);
  console.log(ongoing);

  useEffect(() => {
    const filterTaskByStatus = (status: string) => {
      return tasks.filter((task) => task.status === status);
    };
    setDocumentation(filterTaskByStatus('documentation'));
    setOngoing(filterTaskByStatus('ongoing'));
    setTodo(filterTaskByStatus('to_do'));
    setDone(filterTaskByStatus('done'));
  }, [tasks]);

  return (
    <>
      <h4>Documentation</h4>
      <ListTable tasks={documentation} setTasks={setDocumentation} />
      <h4>Ongoing</h4>
      <ListTable tasks={ongoing} setTasks={setOngoing} />
      <h4>Pending</h4>
      <ListTable tasks={todo} setTasks={setTodo} />
      <h4>Done</h4>
      <ListTable tasks={done} setTasks={setDone} />
    </>
  );
};

export default ProjectListView;
