import { Container, Row, Col } from 'react-bootstrap';
import './profileform.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from 'react-avatar';

const ProfileForm = () => {
    const [userData, setUserData] = useState({});
    const accessToken = localStorage.getItem("access_token");
    
    
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/profile/",{
          headers: {
            Authorization: `Bearer ${accessToken}` // Include the token in the request headers
          }
        }); // Replace '/api/user' with your backend endpoint
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  return (
    <Container className="profile-outer-box" fluid>
      <Row>
        <Col>
          <span className="profile-text">Profile</span>
        </Col>
      </Row>
      <Row className="profile-image" style={{  margin: '0 auto' }}>
      <div className='center-container'>
            {userData.username && (
              <Avatar
                name={userData.username}
                round={true}
                size="100"
                textSizeRatio={2}
              />
            )}
          </div>
      </Row>
      
      <Row style={{ marginTop: '50px' }}>
         
          <Container className ="name-container  mx-auto"style={{ marginTop: '23px' }}>
            <p style={{ fontweight:'bold',fontSize: '20px', color:  '#000000',fontFamily: 'Poppins'  }}>  {userData.firstname} {userData.lastname}</p>
              </Container>
         
      </Row>
      <Container   style={{ marginTop: "20px",marginRight:"75%",marginLeft: "-30px",marginBottom:"100px"}} fluid >
      <Row>
        <Col>
         <span className="username-text" >Username</span>
        </Col>
        <Col >
          <Container className ="username-container" fluid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ fontweight:400,fontSize: '15px', color:  '#8C8C8C',fontFamily: 'Poppins'  }}> {userData.username}</p>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
         <span className="username-text">Email id</span>
        </Col>
        <Col >
          <Container className ="email-container" fluid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontweight:400,fontSize: '15px', color:  '#8C8C8C',fontFamily: 'Poppins'  }}> {userData.email}</p>
          </Container>
        </Col>
      </Row>
      </Container>
    </Container>
  );
};

export default ProfileForm;