import React from 'react';
import './Profile.css';
import ProfileComponent from "./ProfileComponent";

const Profile = ({match}) => {
  return <ProfileComponent username={ match.params.id }/>
}

export default Profile;
