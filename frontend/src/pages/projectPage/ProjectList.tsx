import React, { useState } from "react";
import ProjectModal from "./ProjectModal";
import TaskList from "./TaskList";
import "./ProjectList.css";
import image1 from "../../assets/images/Rectangle 2996.jpg";
import image2 from "../../assets/images/Rectangle 2997.jpg";
import image3 from "../../assets/images/Rectangle 2998.jpg";
import image4 from "../../assets/images/Rectangle 2999.jpg";
const projects = [
  {
    id: 1,
    title: "SWYFT",
    thumbnail_link: image1,
    date_of_creation: "2023-09-20",
    amount_of_tasks: 5,
  },
  {
    id: 2,
    title: "Kobil",
    thumbnail_link: image2,
    date_of_creation: "2023-09-21",
    amount_of_tasks: 8,
  },
  {
    id: 3,
    title: "SWYFT",
    thumbnail_link: image3,
    date_of_creation: "2023-09-22",
    amount_of_tasks: 3,
  },
  {
    id: 4,
    title: "Sunstone",
    thumbnail_link: image4,
    date_of_creation: "2023-09-23",
    amount_of_tasks: 7,
  },
  {
    id: 5,
    title: "SWYFT",
    thumbnail_link: image1,
    date_of_creation: "2023-09-24",
    amount_of_tasks: 10,
  },
  {
    id: 6,
    title: "Kobil",
    thumbnail_link: image2,
    date_of_creation: "2023-09-24",
    amount_of_tasks: 9,
  },
];

function ProjectList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className="create-project" onClick={openModal}>
        Create Project
      </button>
      <TaskList projects={projects} />
      {isModalOpen && <ProjectModal closeModal={closeModal} />}
    </div>
  );
}

export default ProjectList;
