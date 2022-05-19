import React, { useState, useEffect, useContext } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import './Clients.css';
import './CoachUniversal.css';
import '../Dashboard.css';
import './CoachProfile.css';
import Input from '../../Forms/InputFront';
import Button from '../../Buttons/Button';
import ImageUpload from '../../Forms/ImageUpload';
import Axios from 'axios';
import Modal from '../../Modals/Modal';
import LoadingDots from '../../Animations/LoadingDots';
import LineChart from '../../Charts/LineChart';
import ClientCharts from '../../Charts/ClientCharts';
import { AuthContext } from '../../../Context/auth-context';

const CoachProfile = ({
  navToggle,
  userId,
  userRole,
  fullUserData,
  setPage,
  setFullUserData,
  currentClient,
}) => {
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [name, setName] = useState();
  const [parentPreview, setParentPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDisplay, setConfirmDisplay] = useState(false);
  const [error, setError] = useState();
  const [checkinChartData, setCheckinChartData] = useState();
  const [chartSelect, setChartSelect] = useState({
    fatMass: true,
    bodyFat: true,
    leanBodyMass: true,
    weight: true,
    calories: true,
    carbs: true,
    fats: true,
    protein: true,
    workoutQuality: true,
    measurements: true,
    volume: true,
    cardioTime: true,
    cardioCals: true,
    sleepTime: true,
  });

  useEffect(() => {
    const getAll = async () => {
      setLoading(true);
      let results;
      try {
        results = await Axios.get(process.env.REACT_APP_BACKEND_URL + `/users/all/${userId}`, {
          headers: { Authorization: 'Bearer ' + auth.token },
        });
      } catch (err) {
        setError("Couldn't fetch from the database");
        setLoading(false);
        return;
      }
      let newData = results.data;
      setUserData(newData);
      if (newData.age !== 0) {
        setAge(newData.age);
      }

      if (newData.gender) {
        setGender(newData.gender);
      }

      if (newData.name) {
        setName(newData.name);
      }
      setLoading(false);
    };
    if (userId && auth.token) {
      getAll();
    }
  }, [userId, auth.token]);

  useEffect(() => {
    const getClientData = async () => {
      setLoading(true);
      let result;
      try {
        result = await Axios.get(
          process.env.REACT_APP_BACKEND_URL + `/checkins/${currentClient.id}`,
          { headers: { Authorization: 'Bearer ' + auth.token } },
        );
      } catch (err) {
        setError(err);
        setLoading(false);
        return;
      }
      setCheckinChartData(result.data);

      setLoading(false);
    };
    if (userRole === 'client' && currentClient) {
      getClientData();
    }
  }, [currentClient, userRole]);

  const profileSubmit = () => {
    if (parentPreview.length !== 0) {
      uploadImage(parentPreview);
    }

    if (parentPreview.length === 0) {
      uploadOther();
    }
  };

  let fullUpdate = fullUserData;

  const uploadOther = async () => {
    setLoading(true);
    let data = {};

    if (name) {
      data.name = name;
      fullUpdate.name = name;
    }

    if (age) {
      data.age = age;
      fullUpdate.age = age;
    }

    if (gender) {
      data.gender = gender;
      fullUpdate.gender = gender;
    }

    try {
      await Axios.patch(process.env.REACT_APP_BACKEND_URL + `/users/${userId}`, data, {
        headers: { Authorization: 'Bearer ' + auth.token },
      });
    } catch (err) {
      setLoading(false);
      setError(err);
    }
    setFullUserData(fullUpdate);
    setLoading(false);
    setConfirmDisplay(true);
  };

  const uploadImage = async (base64EncodedImage) => {
    setLoading(true);
    let data = { image: base64EncodedImage };

    if (name) {
      data.name = name;
      fullUpdate.name = name;
    }

    if (age) {
      data.age = age;
      fullUpdate.age = age;
    }

    if (gender) {
      data.gender = gender;
      fullUpdate.gender = gender;
    }

    let results;
    try {
      results = await Axios.patch(process.env.REACT_APP_BACKEND_URL + `/users/${userId}`, data, {
        headers: { Authorization: 'Bearer ' + auth.token },
      });
    } catch (err) {
      setLoading(false);
      return setError(err);
    }

    setFullUserData({ ...fullUserData, user: results.data.user });
    setLoading(false);
    setConfirmDisplay(true);
  };

  const returnFunc = () => {
    if (userRole === 'coach') {
      setPage('Clients');
      setConfirmDisplay(false);
    }
    if (userRole === 'client') {
      setPage('Home');
      setConfirmDisplay(false);
    }
  };
  return (
    <>
      <Modal
        show={error}
        onCancel={() => setError()}
        children={
          <div className="error-modal-container">
            <h3>{error}</h3>
            <Button name="auth-button-primary" contents="GOT IT!" click={() => setError()} />
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

          <div className="absurd-box profile_margin">
            <Input
              name="check-input-lg input-margin-top-med"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            {userRole === 'client' && (
              <div className="profile-client-extras" style={{ width: '100%', minHeight: '4rem' }}>
                {userRole === 'client' && (
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
                )}
              </div>
            )}

            <ImageUpload
              maxImage={1}
              parentPreview={parentPreview}
              setParentPreview={setParentPreview}
            />
            <Button
              contents="SUBMIT"
              name="auth-button-primary button-margin-sm profile"
              click={profileSubmit}
              disabled={parentPreview.length === 0 || name.length < 5}
            />
          </div>
        </div>
      </div>

      <div className="right-sector-profile">
        {userRole === 'coach' && fullUserData && (
          <div className="right-bar-profile">
            <div className="analytics-deskHead">
              <h3>Stats</h3>
            </div>
            <LineChart
              data={fullUserData.clientTotals}
              color={'#0ee2d0'}
              background={'#0ee2d044'}
              label={'Clients'}
            />

            <LineChart
              data={fullUserData.checkinTotals}
              color={'#0ee2d0'}
              background={'#0ee2d044'}
              label={'Checkins'}
            />

            <LineChart
              data={fullUserData.workoutTotals}
              color={'#0ee2d0'}
              background={'#0ee2d044'}
              label={'Workouts'}
            />

            <LineChart
              data={fullUserData.dietTotals}
              color={'#0ee2d0'}
              background={'#0ee2d044'}
              label={'Diets'}
            />
          </div>
        )}

        {userRole === 'client' && fullUserData && (
          <div className="right-bar-profile">
            <div className="analytics-deskHead">
              <h3>Stats</h3>
            </div>
            {checkinChartData && (
              <ClientCharts checkinChartData={checkinChartData} chartSelect={chartSelect} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CoachProfile;
