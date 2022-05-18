import React, { useState, useEffect, useContext } from 'react';
import './CoachUniversal.css';
import './CoachDiets.css';
import DrawerRight from '../../Nav/DrawerRight';
import DrawerBottom from '../../Nav/DrawerBottom';
import Input from '../../Forms/InputFront';
import Button from '../../Buttons/Button';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { GoSearch } from 'react-icons/go';
import { MdOutlinePostAdd } from 'react-icons/md';
import MaterialTable from 'material-table';
import { alpha } from '@material-ui/core/styles';
import DietButton from '../../Buttons/DietButton';
import { columns } from '../../../Data/DietColumns';
import { IoAddSharp, IoTrash } from 'react-icons/io5';
import { IoTrashOutline } from 'react-icons/io5';
import { RiUserShared2Line } from 'react-icons/ri';
import Axios from 'axios';
import DietTable from '../../Tables/DietTable';
import NewDiet from '../../Forms/NewDiet';
import Modal from '../../Modals/Modal';
import LoadingDots from '../../Animations/LoadingDots';
import { AuthContext } from '../../../Context/auth-context';

const CoachDiets = ({
  navToggle,
  fullUserData,
  userId,
  userRole,
  setFullUserData,
  hack,
  setHack,
}) => {
  const auth = useContext(AuthContext);
  const [selectedDiet, setSelectedDiet] = useState(
    fullUserData.diets[0] || null
  );

  const [dietNum, setDietNum] = useState(0);

  const [error, setError] = useState();
  const [current, setCurrent] = useState(true);
  const [add, setAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableData, setTableData] = useState(
    selectedDiet && selectedDiet.food[dietNum].data
      ? selectedDiet.food[dietNum].data
      : null
  );
  const [deleteMode, setDeleteMode] = useState(false);
  const [newMode, setNewMode] = useState(false);
  const [share, setShare] = useState(false);

  const [percent, setPercent] = useState(
    fullUserData.diets.length > 0 ? 100 / fullUserData.diets[0].food.length : 0
  );
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [searchList, setSearchList] = useState();

  const [selectedShare, setSelectedShare] = useState();

  const [dietList, setDietList] = useState();

  console.log('wtf')

  useEffect(() => {
    const getDietsHandler = async () => {
      console.log("getDietsHandler")
      let results;
      try {
        results = await Axios.get(process.env.REACT_APP_BACKEND_URL + `/diets/${userId}`, {
          headers: { Authorization: 'Bearer ' + auth.token },
        });
      } catch (err) {
        setError('Could not fetch diets');
        return;
      }
      setDietList(results.data.diets.reverse());
      setSelectedDiet(results.data.diets[results.data.diets.length - 1]);
      if (results.data.diets.length < 1) {
        setAdd(true);
      }
    };
    getDietsHandler();
  }, [userId,]);

  useEffect(() => {
    console.log('selectDiet')
    if (selectedDiet && selectedDiet.food[0].data) {
      setTableData(selectedDiet.food[dietNum].data);
    }
  }, [selectedDiet, dietNum]);

  useEffect(() => {
    console.log('use effect selected diet')
    if (selectedDiet && selectedDiet.food) {
      setPercent(100 / selectedDiet.food.length);
    }
  }, [selectedDiet]);

  useEffect(() => {
    console.log('query')
    if (dietList && dietList.length > 0 && query) {
      setSearchList(
        dietList.filter((diet) =>
          diet.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [dietList, query]);


  const updateDietsHandler = async () => {
    let results;
    try {
      results = await Axios.get(process.env.REACT_APP_BACKEND_URL + `/diets/${userId}`, {
        headers: { Authorization: 'Bearer ' + auth.token },
      });
    } catch (err) {
      setError('Could not fetch diets');
      return;
    }
    setDietList(results.data.diets.reverse());
  };

  const addDietToggle = () => {
    console.log('add diet handler')
    setAdd(!add);
  };

  const dietDeleteHandler = async () => {
    console.log('diet delete handler')
    let results;
    setDeleteMode(false);
    try {
      results = await Axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/diets/${selectedDiet.id}`,
        { headers: { Authorization: 'Bearer ' + auth.token } }
      );
    } catch (err) {
      setError(err);
      return;
    }
    updateDietsHandler();
    setError('Diet Deleted');
    setSelectedDiet(dietList[0]);
  };

  const shareDietHandler = async (client) => {
    console.log('sharediethandler')
    setShare(false);
    setSelectedShare();
    setLoading(true);

    let results;
    try {
      results = await Axios.patch(
        process.env.REACT_APP_BACKEND_URL + '/diets/send',
        {
          userId: userId,
          clientId: client.id,
          dietId: selectedDiet.id,
        },
        { headers: { Authorization: 'Bearer ' + auth.token } }
      );
    } catch (err) {
      setShare(false);
      setSelectedShare();
      setError(
        'They either already have this diet or something else went wrong!'
      );
      setLoading(false);
      return;
    }
    setLoading(false);
    setError('Successfully shared this diet.');
  };

  const queryHandler = (e) => {
    setQuery(e.target.value);
  };

  const selectHandler = async (diet) => {
    console.log('select handler')
    setLoading(true);
    let newData = fullUserData;
    let result;
    try {
      result = await Axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/users/notifications/${userId}`,
        { diet: diet.id },
        { headers: { Authorization: 'Bearer ' + auth.token } }
      );
    } catch (err) {
      setError(err);
      setLoading(false);
      return;
    }

    newData.notifications.diets = newData.notifications.diets.filter(
      (item) => item !== diet.id
    );
    setSelectedDiet(diet);
    setCurrent(true);
    setFullUserData(newData);
    setQuery('');
    setSearchList();
    setLoading(false);
    setHack(!hack);
    return;
  };

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
      {selectedShare && selectedDiet && (
        <Modal
          show={selectedShare !== null}
          onCancel={() => {
            setSelectedShare();
            setShare(false);
          }}
          children={
            <div className="error-modal-container">
              <h3>{`Send ${selectedDiet.name} to ${selectedShare.name}? `}</h3>
              <Button
                name="auth-button-primary"
                contents="YES"
                click={() => {
                  shareDietHandler(selectedShare);
                }}
              />
              <Button
                name="auth-button-secondary button-top-margin-gone "
                contents="NO"
                click={() => {
                  setSelectedShare();
                  setShare(false);
                }}
              />
            </div>
          }
        />
      )}

      <Modal
        show={deleteMode === true}
        onCancel={() => setDeleteMode(false)}
        children={
          <div className="error-modal-container">
            <h3>Are you sure you want to delete this diet permanently?</h3>
            <Button
              name="auth-button-danger"
              contents="YES"
              click={() => {
                dietDeleteHandler();
              }}
            />
            <Button
              name="auth-button-secondary button-top-margin-gone "
              contents="NO"
              click={() => {
                setDeleteMode(false);
              }}
            />
          </div>
        }
      />

      {dietList && (
        <DrawerRight
          show={current === false}
          name="drawer-right-partial"
          children={dietList.map((diet, index) => (
            <DietButton
              diet={diet}
              notifications={fullUserData.notifications.diets.includes(diet.id)}
              click={selectHandler}
              key={index}
              name={diet.name}
              description={diet.description}
              dateAdded={`${diet.dateAdded.monthString} ${diet.dateAdded.day} ${diet.dateAdded.year}`}
            />
          ))}
        />
      )}

      <DrawerBottom
        show={add === true}
        name="drawer-bottom-partial"
        children={
          <NewDiet
            userId={userId}
            setSelectedDiet={setSelectedDiet}
            setParentError={setError}
            setNewMode={setNewMode}
            addDietToggle={addDietToggle}
            updateDietsHandler={updateDietsHandler}
          />
        }
      />

      <header className="dash-head">
        <HiOutlineMenuAlt2 className="mobile-menu" onClick={navToggle} />
        <h1>Diets</h1>
        <MdOutlinePostAdd className="add-user-mobile" onClick={addDietToggle} />
      </header>
      <div className="mobile-select1">
        <div
          className={current ? 'select1 select-green' : 'select1'}
          onClick={() => setCurrent(true)}
        >
          <p>Edit Diet</p>
        </div>
        <div
          className={current ? 'select2' : 'select2 select-green'}
          onClick={() => setCurrent(false)}
        >
          <p>Existing Diets</p>
        </div>
      </div>

      <div className="desk-center">
        {loading && <LoadingDots />}
        {dietList && dietList.length > 0 ? (
          <div className="mobile-head-option-container onlySmall">
            {userRole === 'coach' && (
              <div
                className={
                  share === true
                    ? 'share-drop-container'
                    : 'share-drop-container share-null'
                }
              >
                {fullUserData.clients.map((client, index) => (
                  <div
                    onClick={() => setSelectedShare(client)}
                    key={index}
                    className={
                      share === true
                        ? 'share-user-select'
                        : 'share-user-select share-null'
                    }
                  >
                    <div className="share-user-image">
                      <img src={client.image} alt="" />
                    </div>
                    <p>{client.name}</p>
                  </div>
                ))}
              </div>
            )}

            {userRole === 'client' && (
              <div
                className={
                  share === true
                    ? 'share-drop-container'
                    : 'share-drop-container share-null'
                }
              >
                <div
                  onClick={() => setSelectedShare(fullUserData.coach)}
                  className={
                    share === true
                      ? 'share-user-select'
                      : 'share-user-select share-null'
                  }
                >
                  <div className="share-user-image">
                    <img src={fullUserData.coach.image} alt="" />
                  </div>
                  <p>{fullUserData.coach.name}</p>
                </div>
              </div>
            )}

            {selectedDiet && selectedDiet.name && (
              <h3 className="mobile-options-title">{selectedDiet.name}</h3>
            )}

            <IoTrashOutline
              className="desk-trash-icon"
              onClick={() => setDeleteMode(!deleteMode)}
            />

            <RiUserShared2Line
              className="share-desk-icon"
              onClick={() => setShare(!share)}
            />
          </div>
        ) : (
          <div></div>
        )}

        <div className="dash-search-container onlyLarge">
          <Input
            name="search-input"
            parentClass="parent-auto"
            placeholder={'Search Diets'}
            onChange={queryHandler}
            value={query}
            clear={() => setQuery('')}
            clearable={true}
          />
          <Button
            name="search-button"
            contents={<GoSearch className="magnify" />}
          />
          {query && query !== '' && searchList && searchList.length > 0 && (
            <div className="search-drop">
              {searchList.map((diet, index) => (
                <DietButton
                  diet={diet}
                  notifications={fullUserData.notifications.diets.includes(
                    diet.id
                  )}
                  click={selectHandler}
                  key={index}
                  name={diet.name}
                  description={diet.description}
                  dateAdded={`${diet.dateAdded.monthString} ${diet.dateAdded.day} ${diet.dateAdded.year}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="client-list-container">
          <div className="client-desk-menu">
            {userRole === 'coach' && (
              <div
                className={
                  share === true
                    ? 'share-drop-container'
                    : 'share-drop-container share-null'
                }
              >
                {fullUserData.clients.map((client, index) => (
                  <div
                    onClick={() => setSelectedShare(client)}
                    key={index}
                    className={
                      share === true
                        ? 'share-user-select'
                        : 'share-user-select share-null'
                    }
                  >
                    <div className="share-user-image">
                      <img src={client.image} alt="" />
                    </div>
                    <p>{client.name}</p>
                  </div>
                ))}
              </div>
            )}

            {userRole === 'client' && (
              <div
                className={
                  share === true
                    ? 'share-drop-container'
                    : 'share-drop-container share-null'
                }
              >
                <div
                  onClick={() => setSelectedShare(fullUserData.coach)}
                  className={
                    share === true
                      ? 'share-user-select'
                      : 'share-user-select share-null'
                  }
                >
                  <div className="share-user-image">
                    <img src={fullUserData.coach.image} alt="" />
                  </div>
                  <p>{fullUserData.coach.name}</p>
                </div>
              </div>
            )}

            {newMode === false && selectedDiet ? (
              <h3>{selectedDiet.name}</h3>
            ) : (
              <h3>Create New Diet</h3>
            )}
            <IoAddSharp
              className="add-desk-icon"
              onClick={() => setNewMode(!newMode)}
            />

            {newMode === false && selectedDiet && (
              <IoTrashOutline
                className="desk-trash-icon"
                onClick={() => setDeleteMode(!deleteMode)}
              />
            )}
            {newMode === false && selectedDiet && (
              <RiUserShared2Line
                className="share-desk-icon"
                onClick={() => setShare(!share)}
              />
            )}
          </div>
          {newMode === false && selectedDiet ? (
            <div className="absurd-box">
              <div className="day-changer-container">
                <div className="day-title-container">
                  {selectedDiet.food.map((w, index) => (
                    <div
                      key={index}
                      style={{
                        color: dietNum === index ? '#00ded1' : '#a5a5a5',
                        width: `${percent}%`,
                      }}
                      onClick={() => setDietNum(index)}
                      className="day-title-box"
                    >{`D${index + 1}`}</div>
                  ))}
                </div>
                <div className="day-change-line">
                  <div
                    className="moving-line"
                    style={{
                      width: `${percent}%`,
                      left: `${percent * dietNum}%`,
                    }}
                  ></div>
                </div>
              </div>
            <div className="list-scroll-container">
              <DietTable
                tableData={tableData}
                selectedDiet={selectedDiet}
                dietNum={dietNum}
                userId={userId}
                setTableData={setTableData}
                setError={setError}
                columns={columns}
                selectedRow={selectedRow}
                setSelectedRow={setSelectedRow}
              />
              </div>
            </div>
          ) : (
            <div className="absurd-box">
              <div className="desktop-only">
                <NewDiet
                  userId={userId}
                  setSelectedDiet={setSelectedDiet}
                  setParentError={setError}
                  setNewMode={setNewMode}
                  addDietToggle={addDietToggle}
                  updateDietsHandler={updateDietsHandler}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="right-sector-desk">
        <div className="right-bar-desk">
          <div className="analytics-deskHead">
            <h3>Diet Library</h3>
          </div>
          <div className="list-scroll-container">
          {dietList && (
            <>
              {dietList.map((diet, index) => (
                <DietButton
                  diet={diet}
                  notifications={fullUserData.notifications.diets.includes(
                    diet.id
                  )}
                  click={selectHandler}
                  key={index}
                  name={diet.name}
                  description={diet.description}
                  dateAdded={`${diet.dateAdded.monthString} ${diet.dateAdded.day} ${diet.dateAdded.year}`}
                />
              ))}
            </>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachDiets;
