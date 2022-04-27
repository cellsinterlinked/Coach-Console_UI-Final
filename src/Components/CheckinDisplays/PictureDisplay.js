import React from 'react'
import './CheckinDisplays.css'

const DUMMY_IMAGES = [
  'https://brokenpanda.net/wp-content/uploads/1589297753_359_Captain-America-The-First-Avenger-Movie-Wallpapers-2020.jpg',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.wp.com%2Fnerdsonearth.com%2Fwp-content%2Fuploads%2F2017%2F07%2Fcaptainamerica_hero.png%3Fssl%3D1&f=1&nofb=1',
  'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia.comicbook.com%2Fwp-content%2Fuploads%2F2012%2F10%2Fcaptain-america-variant.jpg&f=1&nofb=1',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpm1.narvii.com%2F6636%2F1c35c17a84391e450f5ca5c8ec76239ab9bcc16b_hq.jpg&f=1&nofb=1',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fartfiles.alphacoders.com%2F620%2F62019.jpg&f=1&nofb=1'
]

const PictureDisplay = ({checkin}) => {
  return (
    <div className="display_container_images">
      <div className="display_head">Progress Pictures</div>
      <div className="image_list_wrapper">
        {DUMMY_IMAGES.map((image, index) =>
        <section className="progress_container">
        <img className="progress_image" alt="" src={image} />


        </section>)}

      </div>


    </div>
  )
}

export default PictureDisplay