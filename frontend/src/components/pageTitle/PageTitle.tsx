import React from 'react';
import { useLocation } from 'react-router-dom';
import './PageTitle.css'

type PathToTitleMapType = {
  [key: string]: string;
};

const pathToTitleMap:PathToTitleMapType = {
  '/': 'Dashboard',
  '/project': 'Project',
  '/mytask': 'My Task',
  '/activity': 'Activity',
  '/team': 'Team',
  '/message': 'Message',
  '/setting': 'Setting',
  '/sign-up': 'Sign Up',
};


const PageTitle = () => {

  const location = useLocation();
  const currentPath = location.pathname;
  console.log(location)

 // Get the title from the pathToTitleMap or use a default if not found
 // pathToTitleMap[currentPath] ==> pathToTitleMap.currentPath
 const pageTitle = pathToTitleMap[currentPath] || 'Page Not Found';

  return (
    <h2>{pageTitle}</h2>
  )
}

export default PageTitle;