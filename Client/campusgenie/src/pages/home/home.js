import "./home.css";
import { Image, Button, Container, Row, Col } from "react-bootstrap";
import frontpage from "../../assets/frontpage.png";
import chaticon from "../../assets/chaticon.png";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";
import icon5 from "../../assets/icon5.png";
import icon6 from "../../assets/icon6.png";

function Homes() {
  return (
    <div className="App">
      <header className="App-header"  id="home" style={{ backgroundColor: "#fcfcfc" }}>
        <div className="front-page">
          <Button variant="primary" className="button-overlay">
            <span className="button-label">Ask genie</span>
            <Image className="button-icon" src={chaticon} fluid />
          </Button>
          <Image src={frontpage} fluid />
        </div>

        <Row className="text-center p-3" id="about">
          <h2 className="about-heading black-bold-text gap-between">About</h2>
          <p className="about-paragraph grey-text gap-between">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more versions of Lorem Ipsum.
            <br></br>
            <br></br>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more versions of Lorem Ipsum.
            <br></br>
            <br></br>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </Row>

        <Container>
          <Row>
            <Col xs={12} id="support">
              <h1 className="black-bold-text text-center mt-5">
                Support 
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-center gap-between">
            <Col xs={12} md={6} lg={4} className="text-center border-column d-flex align-items-center flex-column mb-4">
              <div className="icon-wrapper">
                <Image src={icon1} className="small-image" />
              </div>
              <h3 className="black-text">24/7 Support</h3>
              <p className="grey-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </Col>
            <Col xs={12} md={6} lg={4} className="text-center border-column d-flex align-items-center flex-column mb-4">
              <div className="icon-wrapper">
                <Image src={icon2} className="small-image" />
              </div>
              <h3 className="black-text">Products</h3>
              <p className="grey-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </Col>
            <Col xs={12} md={6} lg={4} className="text-center border-column d-flex align-items-center flex-column mb-4">
              <div className="icon-wrapper">
                <Image src={icon3} className="small-image" />
              </div>
              <h3 className="black-text">Ratings</h3>
              <p className="grey-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center gap-between">
            <Col xs={12} md={6} lg={4} className="text-center border-column d-flex align-items-center flex-column mb-4">
              <div className="icon-wrapper">
                <Image src={icon4} className="small-image" />
              </div>
              <h3 className="black-text">Safety</h3>
              <p className="grey-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </Col>
            <Col xs={12} md={6} lg={4} className="text-center border-column d-flex align-items-center flex-column mb-4">
              <div className="icon-wrapper">
                <Image src={icon5} className="small-image" />
              </div>
              <h3 className="black-text">Chatbot</h3>
              <p className="grey-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </Col>
            <Col xs={12} md={6} lg={4} className="text-center border-column d-flex align-items-center flex-column mb-4">
              <div className="icon-wrapper">
                <Image src={icon6} className="small-image" />
              </div>
              <h3 className="black-text">Settings</h3>
              <p className="grey-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default Homes;
