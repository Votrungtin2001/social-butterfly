import React from 'react'
import { Fragment } from "react/cjs/react.production.min";
import './feature.css'
import styled from "styled-components";
import image from "../../assets/img/Saly-19.png";
import Tilt from "react-tilt";

const Feature = () => {

    const InnerWrapper = styled.div`
    max-width: 1000px;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  
    const TiltWrapper = styled(Tilt)`
  width: 60%;
  min-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 670px) {
    display: none;
  }
`;

const Img = styled.img`
  width: 100%;
 
`;
    return(
        <Fragment>
        <div class="introduce">
        <div class="introduce-header">
          <h2 class="global-heading">
            All-In-One <span>Social Butterfly.</span>
          </h2>
          <p class="introduce-desc global-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis,
 lectus magna fringilla urna, porttitor rhoncus dolor purus non enim
          </p>
        </div>
        <div class="introduce-list">
          <div class="introduce-item">
            <div class="introduce-icon icon-bg-1 bg-purple">
              <img  />
            </div>
            <h3 class="introduce-title">
              Easy Create Account
            </h3>
            <p class="introduce-desc">
              Simple and secure control of your organization’s financial and
              legal transactions. Send customized invoices and contracts
            </p>
          </div>
          <div class="introduce-item">
            <div class="introduce-icon icon-bg-2 bg-orange">
              <img  />
            </div>
            <h3 class="introduce-title">
              Build Your Profile
            </h3>
            <p class="introduce-desc">
              Automate and track emails to individuals or groups. Skilline’s
              built-in system helps organize your organization
            </p>
          </div>
          <div class="introduce-item">
            <div class="introduce-icon bg-blue icon-bg-3">
              <img />
            </div>
            <h3 class="introduce-title">Connect With Friends</h3>
            <p class="introduce-desc">
              Automate and track emails to individuals or groups. Skilline’s
              built-in system helps organize your organization
            </p>
          </div>
        </div>
      </div>
    <div class="about">
      <div class="about-header">
        <h2 class="global-heading">What is <span>Social Butterfly?</span></h2>
        <p class="global-text">
          Social Butterfly is a platform that lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis,
 lectus magna fringilla urna, porttitor rhoncus dolor purus non enim.
        </p>
    </div>
    <div className='feature-bg'>

    </div>
    
     <InnerWrapper>
      <TiltWrapper options={{ max: 25 }}>
            <Img src={image} alt="@gouthamgtronics" />
    </TiltWrapper>
    </InnerWrapper>
     
    </div>
    </Fragment>
    )
    
}

export default Feature
