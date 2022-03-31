import React, { useState } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import './Clients.css';
import './CoachUniversal.css';
import '../Dashboard.css';
import './CoachProfile.css';
import Input from '../../Forms/InputFront';
import Button from '../../Buttons/Button';
import ImageUpload from '../../Forms/ImageUpload';
import Axios from 'axios'

const CoachProfile = ({ navToggle, userId, userRole, fullUserData }) => {
  const [error, setError] = useState('');
  const [age, setAge] = useState(fullUserData.user.age ? fullUserData.user.age : '')
  const [gender, setGender] = useState(fullUserData.user.gender ? fullUserData.user.gender : '')

  const [name, setName] = useState(fullUserData.user.name ? fullUserData.user.name : '');
  const [image, setImage] = useState();
  const [parentPreview, setParentPreview] = useState([]);

  const profileSubmit = () => {

    if(parentPreview.length !== 0) {
      uploadImage(parentPreview)
    }


    console.log(name);
  };

  const uploadImage = async(base64EncodedImage) => {
    console.log(base64EncodedImage)
    let results
    try {
      results = await Axios.patch(`http://localhost:5000/api/users/${userId}`, {name: name, image: base64EncodedImage})
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <header className="dash-head head-border-bottom">
        <HiOutlineMenuAlt2 className="mobile-menu" onClick={navToggle} />
        <h1>Edit Profile</h1>
        <div className="add-user-mobile"></div>
      </header>

      <div className="desk-center">
        <div className="client-list-container extraMargin">
          <div className="client-desk-menu">
            <h3>Edit Profile</h3>
          </div>

          <div className="absurd-box">
            <Input
              name="check-input-lg input-margin-top-med"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <div className="profile-client-extras" style={{width: "100%", minHeight: "4rem"}}>
            {userRole === 'client' &&
            <>
            <Input
            name="check-input-lg input-margin-sm"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            />
            <div className="gender-select-wrapper">
              <p>Select Your Sex</p>
            <div className="gender-button-wrapper">

              <div
          className={
            gender === 1 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setGender(1)}
        >
         MALE
        </div>
        <div
          className={
            gender === 2 ? 'day-box-button day-selected' : 'day-box-button'
          }
          onClick={() => setGender(2)}
        >
          FEMALE
        </div>

            </div>
            </div>

            </>
            }

            </div>

            <ImageUpload
              maxImage={1}
              parentPreview={parentPreview}
              setParentPreview={setParentPreview}
            />
            <Button
              contents="SUBMIT"
              name="auth-button-primary button-margin-sm"
              click={profileSubmit}
              disabled={parentPreview.length === 0 || name.length < 5}
            />
          </div>
        </div>
      </div>

      <div className="right-sector-desk">
        <div className="right-bar-desk">
          <div className="analytics-deskHead">
            <h3>Add Clients</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachProfile;
