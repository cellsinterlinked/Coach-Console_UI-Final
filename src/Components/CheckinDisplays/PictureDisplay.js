import React from 'react';
import './CheckinDisplays.css';

const PictureDisplay = ({ checkin }) => {
  return (
    <div className="display_container_images">
      <div className="display_head">Progress Pictures</div>
      <div className="image_list_wrapper">
        {checkin.images.map((image, index) => (
          <section className="progress_container" key={image}>
            <img className="progress_image" alt="" src={image} />
          </section>
        ))}
      </div>
    </div>
  );
};

export default PictureDisplay;
