import React, { useState, useEffect } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import './Clients.css';
import './CoachUniversal.css';
import '../Dashboard.css';
import './CoachProfile.css';
import Input from '../../Forms/InputFront';
import Button from '../../Buttons/Button';
import ImageUpload from '../../Forms/ImageUpload';
import Axios from 'axios'
import Modal from '../../Modals/Modal';
import LoadingDots from '../../Animations/LoadingDots';

const CoachProfile = ({ navToggle, userId, userRole, fullUserData, updateAll, setPage, setFullUserData}) => {
  const [userData, setUserData] = useState()
  const [age, setAge] = useState()
  const [gender, setGender] = useState()
  const [name, setName] = useState();

  const [image, setImage] = useState();
  const [parentPreview, setParentPreview] = useState([]);
  const [loading, setLoading] = useState(false)
  const [confirmDisplay, setConfirmDisplay] = useState(false);
  const [error, setError] = useState();



  useEffect(() => {
    const getAll = async () => {
      setLoading(true)
      let results;
      try {
        results = await Axios.get(
          `http://localhost:5000/api/users/all/${userId}`
        );
      } catch (err) {
        alert(`couldn't get info from database ${err}`);
        setError("Couldn't fetch from the database");
        setLoading(false)
        return;
      }
      let newData = results.data
      console.log('gotUserData')
      console.log('new data', newData)
      setUserData(newData)
      if (newData.age !== 0) {
        setAge(newData.age)
      }

      if (newData.gender) {
        setGender(newData.gender)
      }

      if(newData.name) {
        setName(newData.name)
      }
      setLoading(false)

      }
      getAll();
  }, [userId]);






  const profileSubmit = () => {

    if(parentPreview.length !== 0) {
      uploadImage(parentPreview)
    }

    if(parentPreview.length === 0) {
      uploadOther()
    }


    console.log(name);
  };


  const uploadOther = async() => {
    setLoading(true)
    let data = {}

    if (name) {
      data.name = name
    }

    if (age) {
      data.age = age
    }

    if (gender) {
      data.gender = gender
    }

    let results
    try {
      results = await Axios.patch(`http://localhost:5000/api/users/${userId}`, data)
    } catch (err) {
      setLoading(false)
      setError(err)
      console.log(err)
    }
    setLoading(false)
    setConfirmDisplay(true)
  }



  const uploadImage = async(base64EncodedImage) => {
    setLoading(true)
    let data = {image: base64EncodedImage}

    if (name) {
      data.name = name
    }

    if (age) {
      data.age = age
    }

    if (gender) {
      data.gender = gender
    }

    console.log(base64EncodedImage)
    let results
    try {
      results = await Axios.patch(`http://localhost:5000/api/users/${userId}`, data)
    } catch (err) {
      setLoading(false)
      setError(err)
      console.log(err)
    }
    setLoading(false)
    setConfirmDisplay(true)
  }

  const returnFunc = () => {
    if (userRole === 'coach') {
      setPage("Clients")
    }
    if (userRole === 'client') {
      setPage('Home')
    }
  }
  return (
    <>
      <Modal
        show={error}
        onCancel={() => setError()}
        children={
          <div className="error-modal-container">
            <h3>{error}</h3>
            <Button
              name="auth-button-primary"
              contents="GOT IT!"
              click={() => setError()}
            />
          </div>
        }
      />

<Modal
        show={confirmDisplay === true}
        onCancel={() => setConfirmDisplay(false)}
        children={
          <div className="error-modal-container">
            <h3>Successfully Updated!</h3>

            <Button
              name="auth-button-secondary button-top-margin-gone "
              contents="CONTINUE"
              click={returnFunc}
            />
          </div>
        }
      />

      {loading && <LoadingDots />}


      <header className="dash-head head-border-bottom">
        <HiOutlineMenuAlt2 className="mobile-menu" onClick={navToggle} />
        <h1>Edit Profile</h1>
        <div className="add-user-mobile"></div>
      </header>

      <div className="desk-center">
        <div className="profile-container">
          <div className="client-desk-menu">
            <h3>Edit Profile</h3>
          </div>

          <div className="absurd-box profile_margin" >
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
            name="check-input-lg input-margin-top-med"
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

      <div className="right-sector-profile">
        <div className="right-bar-profile">
          <div className="analytics-deskHead">
            <h3>Clients</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachProfile;
