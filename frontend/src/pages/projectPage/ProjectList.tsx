import React, { useState, useEffect } from 'react';
import ProjectModal from './ProjectModal';
import TaskList from './TaskList';
import './ProjectList.css';
import image1 from '../../assets/images/Rectangle 2996.jpg';
import image2 from '../../assets/images/Rectangle 2997.jpg';
import image3 from '../../assets/images/Rectangle 2998.jpg';
import image4 from '../../assets/images/Rectangle 2999.jpg';
import { Project } from '../../types/Project';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import api from '../../api';

function ProjectList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [projects, setProjects] = useState<Project[]>();

  const getProjects = async () => {
    try {
      if (userId) {
        const req = await api();
        const res = await req.get(`/dashboard/projects/${userId}`);
        const projects: Project[] = await res.data.map((project: Project, index: number) => {
          project.thumbnail_link = [image1, image2, image3, image4][index % 4];
          return project;
        });
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

  return (
    <div className='project-list-container'>
      <div>
        <button className='create-project' onClick={openModal}>
          Create Project
        </button>
        {projects ? (
          <>
            <TaskList projects={projects} />
            {isModalOpen && (
              <ProjectModal
                closeModal={closeModal}
                userId={userId}
                projects={projects}
                setProjects={setProjects}
              />
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ProjectList;
