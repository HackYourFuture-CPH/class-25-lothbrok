import React, { useState, useEffect } from 'react';
import ProjectModal from './ProjectModal';
import TaskList from './TaskList';
import styles from './ProjectList.module.css';
import image1 from '../../assets/images/Rectangle 2996.jpg';
import image2 from '../../assets/images/Rectangle 2997.jpg';
import image3 from '../../assets/images/Rectangle 2998.jpg';
import image4 from '../../assets/images/Rectangle 2999.jpg';
import { Project } from '../../types/Project';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { User as UserType } from '../../types/User';
import api from '../../api';

function ProjectList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [projects, setProjects] = useState<Project[]>();
  const thumbnails = [image1, image2, image3, image4];

  const getProjects = async () => {
    try {
      if (userId) {
        const req = await api();
        const res = await req.get(`/project/user/${userId}`);
        const projects = await Promise.all(
          res.data.map(async (project: Project, index: number) => {
            const res = await req.get(`/project/${project.id}/tasks/count`);
            const amountOfTasks = await res.data;
            project.thumbnail_link = thumbnails[index % thumbnails.length];
            project.amount_of_tasks = amountOfTasks.total;
            project.amount_of_completed_tasks = amountOfTasks.completed;
            return project;
          }),
        );
        setProjects(projects);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const setUser = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user: User | null) => {
        if (user) {
          setUserId(user.uid);
        }
      });
    };
    setUser();
  }, []);

  useEffect(() => {
    getProjects();
  }, [userId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = async (projectName: string, team: UserType[]) => {
    if (projectName.trim()) {
      const invitedUserUids = team.map((user) => user.uid);
      const project = {
        title: projectName,
        date_of_creation: new Date().toISOString().split('T')[0],
        user_uid: userId,
        thumbnail_link: thumbnails[projects ? projects.length % thumbnails.length : 0],
        uids: invitedUserUids,
      };
      try {
        const req = await api();
        const res = await req.post(`/project`, project);
        const newProject = res.data;
        if (projects) {
          setProjects([...projects, newProject]);
        } else {
          setProjects(newProject);
        }
      } catch (e) {
        console.error(e);
      }
    }
    closeModal();
  };

  return (
    <div className={styles.project_list_container}>
      <div className={styles.right_align}>
        <button className={styles.create_project} onClick={openModal}>
          Create Project
        </button>
      </div>
      {projects ? (
        <>
          <TaskList projects={projects} />
          {isModalOpen && (
            <ProjectModal
              handleCreateProject={handleCreateProject}
              closeModal={closeModal}
              thumbnail={thumbnails[projects ? projects.length % thumbnails.length : 0]}
              userUid={userId}
            />
          )}
        </>
      ) : null}
    </div>
  );
}

export default ProjectList;
