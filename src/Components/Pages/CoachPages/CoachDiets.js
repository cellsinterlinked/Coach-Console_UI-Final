import React, { useState, useEffect } from 'react';
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
import { alpha } from '@material-ui/core/styles'
import DietButton from '../../Buttons/DietButton';
import {columns} from '../../../Data/DietColumns';
import { IoAddSharp, IoTrash } from 'react-icons/io5';
import { IoTrashOutline } from 'react-icons/io5';
import { RiUserShared2Line } from 'react-icons/ri'
import Axios from 'axios';
import DietTable from '../../Tables/DietTable';
import NewDiet from '../../Forms/NewDiet';
import Modal from '../../Modals/Modal';



const CoachDiets = ({ navToggle, fullUserData, userId }) => {
  const [selectedDiet, setSelectedDiet] = useState(fullUserData.diets[0])

  const [dietNum, setDietNum] = useState(0)

  const [error, setError] = useState();
  const [current, setCurrent] = useState(true);
  const [add, setAdd] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableData, setTableData] = useState(fullUserData.diets[0].food[0].data);
  const [deleteMode, setDeleteMode] = useState(false)
  const [newMode, setNewMode] = useState(false)
  const [share, setShare] = useState(false);

  const [selectedShare, setSelectedShare] = useState()


useEffect(() => {
  setTableData(selectedDiet.food[0].data)
  console.log(tableData)
},[selectedDiet])



  const addDietToggle = () => {
    setAdd(!add);
  };

  const dietDeleteHandler = async () => {
    let results;
    setDeleteMode(false)
    try {
      results = await Axios.delete(`http://localhost:5000/api/diets/${selectedDiet.id}`)
    } catch(err) {
      setError(err)
      return
    }
    alert('Diet Deleted')
  }

  const shareDietHandler = async(client) => {
    setShare(false)

    let results
    try {
      results = await Axios.patch('http://localhost:5000/api/diet/send', {userId: userId, clientId:client.id, workoutId: selectedDiet.id })
    } catch (err) {
      setShare(false)
      setSelectedShare()
      setError("They either already have this diet or something else went wrong!")


      return
    }
    setSelectedShare()
    setShare(false)
    alert("success!")
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
    {selectedShare && <Modal
        show={selectedShare}
        onCancel={() => {
          setSelectedShare()
          setShare(false)
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
                setShare(false)
              }}
            />
          </div>
        }
      />}



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
           dietDeleteHandler()

          }}
        />
        <Button
          name="auth-button-secondary button-top-margin-gone "
          contents="NO"
          click={() => {
            setDeleteMode(false)
          }}
        />
        </div>
      }

    />

      <DrawerRight
        show={current === false}
        name="drawer-right-partial"
        children={fullUserData.diets.map((diet, index) => (
          <DietButton
            click={() => {
              setSelectedDiet(diet)
              setCurrent(true)
            }}
            key={index}
            name={diet.name}
            description={diet.description}
            dateAdded={`${diet.dateAdded.monthString} ${diet.dateAdded.day} ${diet.dateAdded.year}`} />
        ))}
      />

      <DrawerBottom
      show={add === true}
      name="drawer-bottom-partial"
      children={ <NewDiet userId={userId} /> }

      />

      <header className="dash-head">
        <HiOutlineMenuAlt2 className="mobile-menu" onClick={navToggle} />
        <h1>Diets</h1>
        <MdOutlinePostAdd
          className="add-user-mobile"
          onClick={addDietToggle}
        />
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

      <div className="mobile-head-option-container onlySmall">
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
          {selectedDiet && (
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

        <div className="dash-search-container onlyLarge">
          <Input name="search-input" placeholder={'Search Diets'} />
          <Button
            name="search-button"
            contents={<GoSearch className="magnify" />}
          />
        </div>

        <div className="client-list-container">
          <div className="client-desk-menu">
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


          {newMode === false ? (
              <h3>{selectedDiet.name}</h3>
            ) : (
              <h3>Create New Diet</h3>
            )}
            <IoAddSharp
              className="add-desk-icon"
              onClick={() => setNewMode(!newMode)}
            />

            <IoTrashOutline
              className="desk-trash-icon"
              onClick={() => setDeleteMode(!deleteMode)}
            />
            {newMode === false && (
              <RiUserShared2Line
              className="share-desk-icon"
              onClick={() => setShare(!share)}
              />
            )}







          </div>
          {newMode === false ?
          <div className="absurd-box">
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
          </div> : <div className="absurd-box">
              <NewDiet userId={userId} />
            </div>}
        </div>
      </div>

      <div className="right-sector-desk">
        <div className="right-bar-desk">
          <div className="analytics-deskHead">
            <h3>Diet Library</h3>
          </div>
          {fullUserData.diets.map((diet, index) => (
            <DietButton
            click={() => {
              setSelectedDiet(diet)

            }}
            key={index}
            name={diet.name}
            description={diet.description}
            dateAdded={`${diet.dateAdded.monthString} ${diet.dateAdded.day} ${diet.dateAdded.year}`} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CoachDiets;
