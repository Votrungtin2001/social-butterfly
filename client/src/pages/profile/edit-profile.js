import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkImage } from './image-upload'
import { Fragment } from 'react'
import "./edit-profile.css"
import "../authentication/confirm-email"
import Avatar from '../../components/avatar'

const EditProfile = ({setOnEdit}) => {
    const initState = {
        fullname: '', phone: '', address: '', website: '', story: '',birthday:'', gender: ''
    }
    const validFileType = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    let imageURL;
    const [userData, setUserData] = useState(initState)
    const { fullname, phone, address, website, story, birthday, gender } = userData

    const [avatar, setAvatar] = useState('')
    const [image, setImage] = useState("");
   
    const maxFileSize = 10000000;
    
  


    const handleInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]:value })
    }

    const handleUploadImage = (e) => {
      const tempFile = e.target.files[0];
      if (tempFile && validFileType.includes(tempFile.type) && tempFile.size <= maxFileSize) {
          tempFile.value = URL.createObjectURL(tempFile);
          setImage(tempFile)
      }
      else {
          if (!tempFile) {

          }
          else {
              alert("File sai định dạng");
          }
      }
  }

    return (
        
        
        <div className="profile-main-container">
            <div className='bg-white'>

            <div className='profile-container' >
              <h3>Profile</h3>

                <div className="m-top-12 information-image-container">
                            <div className="information-image">
                                <img className="information-image image"
                                    src={image.value} hidden={image.value ? false : true} />
                            </div>
                            <div className="information-management-input-container">
                                <input
                                    className="custom-file-input"
                                    onChange={handleUploadImage}
                                    type="file" />
                                <div className="upload-constraint m-top-8">Just JPG, GIF or PNG maximum is 10MB</div>
                            </div>
                        </div>


        
              
          <div className="input-field">
            <input
              // value={fullname}
              // onChange={handleInput}
              className="input-sign-up"
              type="text"
              placeholder="Full Name"
            />
        </div>
      <div className='email-input-container'>
        <div className= "input-field">
            <input
              // value={phone}
              // onChange={handleInput}
              className="input-sign-up "
              type="tel"
              placeholder="Email"
              readOnly 
            ></input>
        </div>
        <button className='change-email-btn'>Change Email</button>
</div>
       <div className= "input-field">
            <input
              // value={phone}
              // onChange={handleInput}
              className="input-sign-up "
              type="tel"
              placeholder="Phone Number"
            ></input>
        </div>

        <div className= "input-field"  >
            <input
              // value={address}
              // onChange={handleInput}
              className="input-sign-up "
              type="tel"
              placeholder="Address"
            ></input>
        </div>

        <div className="input-field" >
            <input
              // value={website}
              // onChange={handleInput}
              className="input-sign-up "
              type="tel"
              placeholder="Website"
            ></input>
        </div>

        <div className= "input-story-field" >
            <textarea
              // value={story}
              // onChange={handleInput}
              className="input-story"
              cols="30" rows="4"
              placeholder="Story"
            />
        </div>

        <div className="input-field  ">
            <input
              // value={birthday}
              // onChange={handleInput}
              className="input-sign-up "
              placeholder="Date of Birth"
            />

        </div>
            
        
        <div>
           <div className="gender-select m-top-10">
           <label className="custom-radio-btn">
             <span className="label">Male</span>
             <input
               value={"Male"}
               onChange={handleInput}
               checked={gender == "Male"}
               type="radio"
               name="gender"
              
             />
             <span className="checkmark"></span>
           </label>

           <label className="custom-radio-btn">
             <span className="label">Female</span>
             <input
               value={"Female"}
               onChange={handleInput}
               checked={gender == "Female"}
               type="radio"
               name="gender"
              
             />
             <span className="checkmark"></span>
           </label>

           <label className="custom-radio-btn">
             <span className="label">Other</span>
             <input
               value={"Other"}
               onChange={handleInput}
               checked={gender == "Other"}
               type="radio"
               name="gender"
               
             />
             <span className="checkmark"></span>
           </label>
         </div>

         
       </div>
               

                <button className="send-email-btn center">Save</button>
            </div>
            </div>
        </div>

    )
}


export default EditProfile