import React, { useState, useEffect, useRef  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Fragment } from 'react'
import { toast } from 'react-toastify';
import "./edit-profile.css"
import "../authentication/confirm-email"
import Avatar from '../../components/avatar'
import ChangeEmail from './change-email'
import Popup from 'reactjs-popup';
import Select from "react-select";
import axios from "axios";
import Loading from '../../components/loading'
import { getProvinces, getDistrictsWithSelectedProvince, getWardsWithSelectedDistrict } from '../../utils/fetchData'
import { checkImage } from '../../utils/imageUpload'
import { updateProfileUser } from '../../redux/actions/profileActions'
import moment from "moment";
import { checkValidName } from "../authentication/valid-name";
import CancelIcon from "@mui/icons-material/Cancel";

import { useHistory } from "react-router-dom";

const EditProfile = () => {
  const ref = useRef();
  
  const history = useHistory()

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
        fullName: '', mobile: '', email:'' ,address: '', website: '', story: '', birthday:'', sex: ''
    }
    
    const [userData, setUserData] = useState(initState)
    const { fullName, mobile ,email, address, website, story, birthday, sex } = userData
    
    const validFileType = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    let imageURL;
    const [avatar, setAvatar] = useState('')
   
    const [isShowChange,setIsShowChange] = useState(false)
    //Address
    const [province, setProvince] = useState(null);
    const [ward, setWard] = useState("");
    const [district, setDistrict] = useState(null);
   
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    

    //Loading
    const [isLoading, setIsLoading] = useState(false);

    
    const [isTypeDate, setIsTypeDate] = useState(false);

    
    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
      setUserData(auth.user)
      if(auth.user.address.ward_Id != null) {
        displayDefaultAddress()
      }
      else handleFetchProvinces()
      
    },  [auth.user])

    async function displayDefaultAddress() {
      const res = await getProvinces()
      const data = res.data;
      const list = data.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setProvinces(list);
      const defaultProvince = list[getIndex(list, auth.user.address.province_Id)]
      setProvince(defaultProvince)
      const res1 = await getDistrictsWithSelectedProvince(defaultProvince.value)
      const data1 = res1.data;
      const list1 = data1.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setDistricts(list1);
      const defaultDistrict = list1[getIndex(list1, auth.user.address.district_Id)]
      setDistrict(defaultDistrict)

      const res2 = await getWardsWithSelectedDistrict(defaultDistrict.value)
      const data2 = res2.data;
      const list2 = data2.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setWards(list2);
      const defaultWard = list2[getIndex(list2, auth.user.address.ward_Id)]
      setWard(defaultWard)
    }

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

  async function handleFetchProvinces() {
    const res = await getProvinces()
    const data = res.data;
    const list = data.map((item) => ({
      value: item._id,
      label: item.name,
    }));
    setProvinces(list);
  }

  async function handleFetchDistrictsWithSelectedProvince(provinceID) {
    setDistricts([]);
    setDistrict(null)
    setWards([]);
    setWard(null)
    const res = await getDistrictsWithSelectedProvince(provinceID)
    const data = res.data;
    const list = data.map((item) => ({
      value: item._id,
      label: item.name,
    }));
    setDistricts(list);
  }

  async function handleFetchWardsWithSelectedDistrict(districtID) {
    setWards([]);
    setWard(null)
    const res = await getWardsWithSelectedDistrict(districtID)
    const data = res.data;
    const list = data.map((item) => ({
      value: item._id,
      label: item.name,
    }));
    setWards(list);
  }

  const selectedProvince = (e) => {
    console.log("Province ID: " + e.value)
    setProvince(e);
    handleFetchDistrictsWithSelectedProvince(e.value)
  };

  const selectedDistrict = (e) => {
    console.log("District ID: " + e.value)
    setDistrict(e);
    handleFetchWardsWithSelectedDistrict(e.value)
  };

  const selectedWard = (e) => {
    console.log("Ward ID: " + e.value)
    setWard(e);
  };

  const handleUpdateUser = () => {
  
    setIsLoading(true)
    const address = {
        province_Id: "",
        district_Id: "",
        ward_Id: "",
    }
    if( province && district && ward)
    {
      address.province_Id=province.value
      address.district_Id=district.value
      address.ward_Id=ward.value
    }
    dispatch(updateProfileUser({userData, avatar, address, auth}))
    history.push(`/profile/${auth.user._id}`)
  }

  const changeAvatar = (e) => {
    const file = e.target.files[0]

    const err = checkImage(file)
    if(err) return toast.error(err, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setAvatar(file)
  }

  function getIndex(array, Id) {
    const index = array.findIndex(obj => obj.value === Id);
    return index
  }

    return (
        
        <Fragment>
        <div className="profile-main-container">
            <div className='bg-white'>

            <div className='profile-container' >
              <h3>Profile</h3>

                <div className="m-top-12 information-image-container">
                            <div className="information-image">
                                <img className="information-image image"
                                    src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} 
                                    alt="avatar" style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
                            </div>
                            <div className="information-management-input-container">
                                <input
                                    className="custom-file-input"
                                    onChange={changeAvatar}
                                    type="file" />
                                <div className="upload-constraint m-top-8">Just JPG, GIF or PNG maximum is 10MB</div>
                            </div>
                        </div>
   
          <div className="input-field-profile m-top-20">
            <input
              value={fullName}
              onChange= {handleInput}
              className="input-edit-profile"
              type="text"
              placeholder="Full Name"
              autocomplete="nope"
              id="fullName"
              name="fullName"
              
            />
            {(fullName.length > 30 || fullName.length ==0) ? (
              <CancelIcon
                className="mr-1"
                fontSize="small"
              />
            ):(
            <small className="text-danger position-absolute"
            style={{top: '50%', right: '10px', transform: 'translateY(-50%)'}}>
                {fullName.length}/30
            </small>) }
        </div>
       
      <div className='email-input-container m-top-20'>
        <div className= "input-field-profile">
            <input
              value={email}
              onChange={handleInput}
              className="input-edit-profile weight-700"
              type="text"
              placeholder="Email"
              readOnly 
            ></input>
        </div>
        <button onClick={handleChange} className='change-email-btn'>Change Email</button>
        <Popup open={isShowChange} onClose={() => setIsShowChange(false)} nested modal closeOnDocumentClick={false}>
                
                {<ChangeEmail auth={auth}
                 handleClose={handleCloseChange}
                  />}
              </Popup>
</div>
       <div className= "input-field-profile m-top-20">
            <input
              value={mobile}
              onChange={handleInput}
              className="input-edit-profile "
              type="tel"
              placeholder= {mobile === "" ? 'Phone Number': mobile}
              autocomplete="nope"
              name="mobile"
            ></input>
             {(mobile.length > 10 || mobile.length ==0) ? (
              <CancelIcon
                className="mr-1"
                fontSize="small"
              />
            ):(
            <small className="text-danger position-absolute"
                        style={{top: '50%', right: '10px', transform: 'translateY(-50%)'}}>
                            {mobile.length}/10
                        </small>)}
        </div>

        

<div className="row-state">
            <Select
              value={province}
              options={provinces}
              placeholder={<div className="select-placeholder">Province</div>}
              onChange={selectedProvince}
              styles={customStyle}
              components={{ IndicatorSeparator: () => null }}
              className=" w-48 weight-400 custom-select m-top-16 h-56"

            ></Select>

            <Select
              value={district}
              options={districts}
              placeholder={<div className="select-placeholder">District</div>}
              onChange={selectedDistrict}
              styles={customStyle}
              components={{ IndicatorSeparator: () => null }}
              className=" w-48 custom-select m-top-16 h-56 m-left-8"
            ></Select>
          </div>

          <Select
            value={ward}
            options={wards}
            placeholder={<div className="select-placeholder">Ward</div>}
            onChange={selectedWard}
            styles={customStyle}
            components={{ IndicatorSeparator: () => null }}
            className="w-full custom-select m-top-16 h-56"
          ></Select>
        <div className="input-field-profile m-top-20" >
            <input
              name="website"
               value={website}
               onChange={handleInput}
              className="input-edit-profile  "
              type="text"
              placeholder="Website"
            ></input>
        </div>

        <div className= "input-story-field m-top-20" >
            <textarea
              name="story"
             value={story}
             onChange={handleInput}
              className="input-story"
              cols="30" rows="4"
              placeholder="Story"
            />
            {/* <small className="text-danger d-block text-right m-left-290">
                        {story.length}/200
                    </small> */}
        </div>

        <div className="input-field-profile m-top-20">
            <input
              name="birthday"
             value={moment(birthday).format("YYYY-MM-DD")}
             onChange={handleInput}
             className="input-sign-up date-input"
             type="text"
             required
             ref={ref}
             onFocus={() => {
               setIsTypeDate(true);
               ref.current.type = "date";
             }}
             onBlur={() => {
               setIsTypeDate(true);
               ref.current.type = "text";
             }}
            />

        </div>
            
        
        <div>
           <div className="gender-select-edit m-top-20">
           <label className="custom-radio-btn">
             <span className="label">Male</span>
             <input
               value={"Male"}
               onChange={handleInput}
               checked={sex == "Male"}
               type="radio"
               name="sex"
              
             />
             <span className="checkmark"></span>
           </label>

           <label className="custom-radio-btn">
             <span className="label">Female</span>
             <input
               value={"Female"}
               onChange={handleInput}
               checked={sex == "Female"}
               type="radio"
               name="sex"
              
             />
             <span className="checkmark"></span>
           </label>

           <label className="custom-radio-btn">
             <span className="label">Other</span>
             <input
               value={"Other"}
               onChange={handleInput}
               checked={sex == "Other"}
               type="radio"
               name="sex"
               
             />
             <span className="checkmark"></span>
           </label>
         </div>

         
       </div>
               

                <button  onClick={handleUpdateUser} className="update-profile-btn m-top-20 ">Save</button>
                <Popup  open={isLoading} >
       <Loading  />
       </Popup>
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