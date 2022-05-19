import React, { useRef, useState, useEffect } from 'react';
import './ImageUpload.css';
import Button from '../Buttons/Button';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  // const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();
  const [previewArr, setPreviewArr] = useState([]);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      // setPreviewUrl(fileReader.result);
      setPreviewArr([...previewArr, fileReader.result]);
      //instead of having a preview state, its sending the preview state to the parent component as the second element in the array
      if (props.setParentPreview) {
        props.setParentPreview(fileReader.result);
      }
      if (props.maxImage > 1) {
        props.setImageArray([...props.imageArray, fileReader.result]);
      }
    };
    fileReader.readAsDataURL(file);
    setFile();
  }, [file, props, previewArr]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className="image-upload">
        <div className="image-upload__preview">
          {previewArr.length > 0 ? (
            previewArr.map((image, index) => (
              <div className="upload-image-wrapper" style={{ marginBottom: `-${index * 2}px` }}>
                <img src={image} key={index} alt="" />
              </div>
            ))
          ) : (
            <div className="no-image">Upload an Image</div>
          )}
          {/* {previewUrl && <img src={previewUrl} alt="Preview" />}
            {!previewUrl && <p>Please pick an image.</p>} */}
        </div>
      </div>
      <Button
        name="auth-button-primary"
        click={pickImageHandler}
        contents={previewArr.length < 1 ? 'PICK IMAGE' : 'PICK ANOTHER IMAGE'}
        disabled={previewArr.length === props.maxImage}
      ></Button>
      <Button
        name="auth-button-secondary"
        click={() => setPreviewArr([])}
        contents={'CLEAR IMAGES'}
        disabled={previewArr.length === 0}
      ></Button>
      {/* <p>{props.errorText}</p> */}
    </div>
  );
};

export default ImageUpload;
