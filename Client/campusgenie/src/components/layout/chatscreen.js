import React, { useState, useEffect } from "react";
import { Image, Container, Row, Col, Button } from "react-bootstrap";
import "./chatscreen.css"; // Import the CSS file
import chaticon from "../../assets/chaticon.png";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSelectedChatId } from "../statemanagement/selectedchatidreducer";

const ChatScreen = ({ messages }) => {
  const [inputText, setInputText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const selectedChatId = useSelector((state) => state.selectedChatId);

  // Replace "{id}" in the API endpoint URL with the chatId
  const endpointUrl = `http://localhost:8000/api/chat/${selectedChatId}`;
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage = { content: inputText, sender: "user" };
    setChatMessages([...chatMessages, newMessage]);
    setInputText("");
    console.log(inputText, accessToken);

    axios
      .post(
        endpointUrl,
        {
          query: inputText,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        const chatbot_response = response.data.chatbotResponse;
        const chatbot_id = response.data.chatId;
        const newBotMessage = { content: chatbot_response, sender: "chatbot" };
        console.log(chatbot_response);
        setChatMessages((prevMessages) => [...prevMessages, newBotMessage]);
        console.log(chatbot_id);
        // Update the selectedChatId in the Redux store
        dispatch(setSelectedChatId(chatbot_id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  

  useEffect(() => {
    setChatMessages([
      ...messages,
      { content: "Hello, how can I assist you?", sender: "chatbot" },
    ]);
  }, [messages]);

  return (
    <Container className="chat-outer-box">
      <Row>
        <Col>
          <span className="dashboard-text">Dashboard</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="grey-screen">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === "user" ? "user" : "chatbot"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="outer-text-field">
        <div className="grey-type-field">
          <Col xs={11}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
            />
          </Col>
          <Col xs={1} className="button-column">
            <Button
              variant="primary"
              className="send-button"
              onClick={handleSendMessage}
            >
              <Image className="button-icon" src={chaticon} fluid />
            </Button>
          </Col>
        </div>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  messages: state.messages,
  //chatId: state.chatId,
  //email: state.email,
});

export default connect(mapStateToProps)(ChatScreen);
