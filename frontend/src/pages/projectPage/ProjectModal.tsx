import React, { useState } from "react";
import "./ProjectModal.css";
import Rectangle from "../../assets/icons/Rectangle.png";
import Close from "../../assets/icons/x.png";

interface ProjectModalProps {
  closeModal: () => void;
}

function ProjectModal({ closeModal }: ProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [projectThumbnail, setProjectThumbnail] = useState("");
  const [projectDate, setProjectDate] = useState("");
  const [projectTask, setProjectTask] = useState("");

  const handleCreateProject = () => {
    const newProject = {
      title: projectName,
      thumbnail_link: projectThumbnail,
      date_of_creation: projectDate,
      amount_of_tasks: projectTask,
    };
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>New Project</h2>
        <button className="close-button" onClick={closeModal}>
          <img src={Close} alt="Close" className="close-icon" />
        </button>

        <div className="left-content">
          <label>Thumbnail</label>
          <img
            src={Rectangle}
            alt="Thumbnail"
            className="modal-thumbnail-image"
          />
        </div>
        <label>Project name</label>
        <input
          type="text"
          value={projectName}
          placeholder="Input Text Here"
          onChange={(e) => setProjectName(e.target.value)}
        />
        <label>Team</label>
        <input
          type="text"
          value={projectDate}
          placeholder="Superboard"
          onChange={(e) => setProjectName(e.target.value)}
        />
        <label>Privacy</label>
        <input
          type="text"
          value={projectTask}
          placeholder="Public to team"
          onChange={(e) => setProjectName(e.target.value)}
        />
        <button className="create-button" onClick={handleCreateProject}>
          Create Project
        </button>
      </div>
    </div>
  );
}

export default ProjectModal;
