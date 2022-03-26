import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkImage } from './image-upload'
import { Fragment } from 'react'
import "./edit-profile.css"
import "../authentication/confirm-email"
import Avatar from '../../components/avatar'
import ChangeEmail from './change-email'
import Popup from 'reactjs-popup';
import Select from "react-select";
import axios from "axios";

const EditProfile = () => {
  const customStyle = {
    dropdownIndicator: (base) => ({
      ...base,
      color: "rgba(0,0,0,1)",
      opacity: "0.96",
      "&:hover": {
        color: "rgba(0,0,0,1)",
        opacity: "0.96",
      },
    }),
    control: (provided) => ({
      ...provided,
      border: "1px solid #111",
      borderRadius: "10px",
      height: "56px",
      color: "#a18474",
    }),
  };
    const initState = {
        fullname: '', phone: '', address: '', website: '', story: '', birthday:'', gender: ''
    }
    const validFileType = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    let imageURL;
    const [userData, setUserData] = useState(initState)
    const { fullname, phone, address, website, story, birthday, gender } = userData

    const [avatar, setAvatar] = useState('')
    const [image, setImage] = useState("");
   
    const maxFileSize = 10000000;
    const [isShowChange,setIsShowChange] = useState(false)
    const [province, setProvince] = useState("");
    const [ward, setWard] = useState("");
    const [district, setDistrict] = useState("");
   
    const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedWards, setSelectedWards] = useState([]);
    const handleCloseChange = () => {
      setIsShowChange(false)
    }
    const handleChange = () => {
      setIsShowChange(true);
    }
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

  const selectedProvince = (e) => {
    setProvince(e.value);
    setDistricts([]);
    setSelectedDistricts([]);
    setWards([]);
    setSelectedWards([]);
    setDistrict("");
    setWard("");
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/address/provinces/${e.value}/districts`
      )
      .then((res) => {
        const data = res.data;
        const list = data.map((item) => ({
          value: item._id,
          label: item.name,
        }));
        setDistricts(list);
      });
  };
  const selectedDistrict = (e) => {
    setDistrict(e.value);
    setSelectedDistricts(e);
    setWards([]);
    setSelectedWards([]);
    setWard("");
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/address/districts/${e.value}/wards`
      )
      .then((res) => {
        const data = res.data;
        const list = data.map((item) => ({
          value: item._id,
          label: item.name,
        }));
        setWards(list);
      });
  };

  const selectedWard = (e) => {
    setSelectedWards(e);
    setWard(e.value);
  };


    return (
        
        <Fragment>
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
   
          <div className="input-field-profile m-top-20">
            <input
              // value={fullname}
               onChange={handleInput}
              className="input-edit-profile"
              type="text"
              placeholder="Full Name"
              autocomplete="nope"
            />
        </div>
      <div className='email-input-container m-top-20'>
        <div className= "input-field-profile">
            <input
              // value={email}
              onChange={handleInput}
              className="input-edit-profile "
              type="tel"
              placeholder="Email"
              readOnly 
            ></input>
        </div>
        <button onClick={handleChange} className='change-email-btn'>Change Email</button>
        <Popup open={isShowChange} onClose={() => setIsShowChange(false)} nested modal closeOnDocumentClick={false}>
                
                {<ChangeEmail
                 handleClose={handleCloseChange}
                
                  />}
              </Popup>
</div>
       <div className= "input-field-profile m-top-20">
            <input
              // value={phone}
               onChange={handleInput}
              className="input-edit-profile "
              type="tel"
              placeholder="Phone Number"
              autocomplete="nope"
            ></input>
        </div>

        

<div className="row-state">
            <Select
              options={provinces}
              placeholder={<div className="select-placeholder">Province</div>}
              onChange={selectedProvince}
              styles={customStyle}
              components={{ IndicatorSeparator: () => null }}
              className=" w-48 weight-400 custom-select m-top-16 h-56"
            ></Select>

            <Select
              value={selectedDistricts}
              options={districts}
              placeholder={<div className="select-placeholder">District</div>}
              onChange={selectedDistrict}
              styles={customStyle}
              components={{ IndicatorSeparator: () => null }}
              className=" w-48 custom-select m-top-16 h-56 m-left-8"
            ></Select>
          </div>

          <Select
            value={selectedWards}
            options={wards}
            placeholder={<div className="select-placeholder">Ward</div>}
            onChange={selectedWard}
            styles={customStyle}
            components={{ IndicatorSeparator: () => null }}
            className="w-full custom-select m-top-16 h-56"
          ></Select>
<div className= "input-field-profile m-top-20"  >
            <input
              value={address}
               onChange={handleInput}
              className="input-edit-profile "
              type="tel"
              placeholder="Address"
            ></input>
        </div>
        <div className="input-field-profile m-top-20" >
            <input
              // value={website}
               onChange={handleInput}
              className="input-edit-profile  "
              type="tel"
              placeholder="Website"
            ></input>
        </div>

        <div className= "input-story-field m-top-20" >
            <textarea
              // value={story}
             onChange={handleInput}
              className="input-story"
              cols="30" rows="4"
              placeholder="Story"
            />
        </div>

        <div className="input-field-profile m-top-20">
            <input
              // value={birthday}
              onChange={handleInput}
              className="input-edit-profile "
              placeholder="Date of Birth"
            />

        </div>
            
        
        <div>
           <div className="gender-select m-top-20">
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
               

                <button className="send-email-btn m-top-20">Save</button>
            </div>
            </div>
        </div>
         <div class="footer-bottom">
         <div class="container-f footer-container">
           
           <p class="footer-heading">
             Copyright © 2022 Social Butterfly
           </p>
         </div>
       </div>
       </Fragment>

    )
}


export default EditProfile