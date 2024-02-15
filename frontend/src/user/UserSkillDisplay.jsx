import React, { useState, useEffect } from 'react';
import UserAPI from './UserAPI';
import AlertMessage from '../components/AlertMessage';
import UserSkillForm from '../forms/UserSkillForm';
import noData from "../static/images/no_info_found.jpg";


const UserSkillDisplay = () => {
  const [skills, setSkills] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isAddingNewSkill, setIsAddingNewSkill] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const fetchUserSkills = async () => {
    try {
      const response = await UserAPI.getUserSkills();
      setSkills(response);
    } catch (error) {
      console.log(error.message);
      // setAlertMessage({ type: "danger", message: "Unable to fetch your details." });
    }
  }

  useEffect(() => { fetchUserSkills() }, []);

  const handleEditSkill = (skill) => {
    setSelectedSkill(skill);
    setIsAddingNewSkill(false);
  };

  const handleAddNewSkill = () => {
    setSelectedSkill(null);
    setIsAddingNewSkill(true);
  };

  const handleCancelClick = () => {
    setSelectedSkill(null);
    setIsAddingNewSkill(false);
  }

  const handleCloseAlert = () => {
    setAlertMessage(null);
  }

  const handleDeleteSkill = async (skill) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await UserAPI.deleteUserSkill(skill.id);
        setSkills((prevSkills) =>
          prevSkills.filter((s) => s.id !== skill.id)
        );
        setAlertMessage({ type: "success", message: "Skill deleted successfully." });
      } catch (error) {
        console.log(error.message);
        setAlertMessage({ type: "danger", message: "Unable to delete the skill." });
      }
    }
  };

  return (
    <div className="container mt-3">

      {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleCloseAlert} />}

      {(selectedSkill || isAddingNewSkill) && (
        <UserSkillForm initialFormData={selectedSkill} onSubmit={fetchUserSkills} />
      )}

      {(!isAddingNewSkill && !selectedSkill && skills) ? (
        <div className="row">
          {skills.map((skill, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <p>Skill: {skill.skill_name}</p>
                  <p>Proficiency Level: {skill.proficiency_level}</p>
                  <button
                    className="btn btn-sm btn-primary m-2"
                    onClick={() => handleEditSkill(skill)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger m-2"
                    onClick={() => handleDeleteSkill(skill)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {(!isAddingNewSkill && !selectedSkill && (!skills || skills.length === 0)) ? (
        <div className='container'>
          <img className='m-2' src={noData} alt="No data" />
          <h1 className='m-2'>No skill's information found, Please add...</h1>
        </div>
      ) : null}

      {!isAddingNewSkill && (
        <button
          className="btn btn-sm btn-success m-2"
          onClick={handleAddNewSkill}
        >
          Add New Skill
        </button>
      )}
      {(selectedSkill || isAddingNewSkill) && (
        <button
          className="btn btn-sm btn-secondary m-2"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      )}
    </div >
  );
};

export default UserSkillDisplay;
