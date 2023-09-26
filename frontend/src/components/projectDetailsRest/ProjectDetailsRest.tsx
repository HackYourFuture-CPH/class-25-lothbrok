import React from 'react';
import './ProjectDetailsRest.css';
import {Add, CheckCircleRounded, RadioButtonUnchecked} from '@mui/icons-material/';
import { Divider } from '@mui/material';

const ProjectDetailsRest = () => {
  return (
    <div className='other-details'>
        <div className='single-detail'>
            <div className='single-header'>
                <p className='single-title'>Attachment</p>
                <Add className='details-icon'/>
            </div>
            <div className='attachment-files'>
                <img src='https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' alt='attachment'/>
                <img src='https://images.unsplash.com/photo-1612442058361-178007e5e498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fG1vYmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='attachment'/>
            </div>
        </div>
        <div className='single-detail'>
            <div className='single-header'>
                <p className='single-title'>Objective</p>
                <Add className='details-icon'/>
            </div>
            <div className='objects'>
                <div className='object'>
                  <CheckCircleRounded id="small-check" />
                  <p>Project Kanban/Cards*Trello</p>
                </div>
                <Divider/>
                <div className='object'>
                  <CheckCircleRounded id="small-check" />
                  <p>Activity/Inbox*with advance filter</p>
                </div>
                <Divider/>
                <div className='object'>
                  <RadioButtonUnchecked id="small-circle" />
                  <p>Project List *Asana</p>
                </div>
                <Divider/>
            </div>
            <textarea className="question" >Ask question or post an update</textarea>
        </div>
    </div>
  )
}

export default ProjectDetailsRest;