import React from 'react';
import style from './TopMenu.css';

const TopMenu = ({ profiles, onProfileSelect, onAddProfile, selectedProfile }) => {
  let profilesList = profiles.map((element) => {
    let profile =
      <p key={element.id} value={element.id} onClick={() => onProfileSelect(element.id)} >
        {element.full}
      </p>
    return profile;
  }
  );

  let { full, id, bio, fbprof } = selectedProfile;

  return (
    <div className={style.topMenu}>
      {profilesList}
      <input type="text" name="full-name" value={full} />
      <input type="text" name="full-name" value={bio} />
      <button type="button" onClick={() => onAddProfile({ id, full, bio, fbprof })}>CREATE</button>
    </div>
  );
};

export default TopMenu;
