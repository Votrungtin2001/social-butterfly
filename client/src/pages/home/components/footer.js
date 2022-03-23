import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
import { ReactComponent as LogoIcon } from "../../../assets/img/logo-text.svg";
const Footer = () => {

    return (
        <div className="footer">
            
      <div class="footer-top">
        <div class="container-f">
          <div class="footer-main">
            <div class="footer-column">
              <Link class="footer-logo">
                  <LogoIcon/>
              </Link>
              <div class="footer-desc text">
              Be careful about what you make 
              visible to your network, but 
              especially what you make public.
              </div>
              <div class="social">
                <a href="#" class="social-item">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
                <a href="#" class="social-item">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
                <a href="#" class="social-item">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
                <a href="#" class="social-item">
                  <ion-icon name="logo-dribbble"></ion-icon>
                </a>
              </div>
            </div>
            <div class="footer-column">
              
              <ul class="footer-links">
                <li class="footer-item">
                  <a href="#" class="footer-link">About Us</a>
                </li>
                <li class="footer-item">
                  <a href="#" class="footer-link">Contact us</a>
                </li>
                <li class="footer-item">
                  <a href="#" class="footer-link">Terms of Services</a>
                </li>
                <li class="footer-item">
                  <a href="#" class="footer-link">Plan & Precing</a>
                </li>
                <li class="footer-item">
                  <a href="#" class="footer-link">Site Map</a>
                </li>
              </ul>
            </div>
            <div class="footer-column">
            
              <ul class="footer-info">
                <li>Phone Number 1: (+ 84) 886 026 218</li>
                <li>
                  Phone Number 2:
                  <span class="footer-highlight"> (+ 84) 123 456 789</span>
                </li>
              </ul>
              <ul class="footer-info">
                <li>
                  <a href="mailto:support@gm.uit.edu.vn"
                    >Email: support@gm.uit.edu.vn</a
                  >
                </li>
                <li>Fax: support@gm.uit.edu.vn</li>
              </ul>
              <ul class="footer-info">
                <li>
                  Add: Truong Dai hoc CNTT, Khu pho 6, Linh Trung, Thu Duc
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container-f footer-container">
          <a href="#" class="footer-rocket">
            <ion-icon name="rocket"></ion-icon>
          </a>
          <p class="footer-heading">
            Copyright © 2022 Social Butterfly
          </p>
        </div>
      </div>
    
        </div>
    )
}

export default Footer