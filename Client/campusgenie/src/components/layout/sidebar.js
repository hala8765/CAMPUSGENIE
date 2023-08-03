import { Container, Nav } from "react-bootstrap";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { setChatIds } from "../statemanagement/chatIdreducer";
import axios from "axios";
import { setSelectedChatId } from "../../components/statemanagement/selectedchatidreducer";


const Sidebar = (props) => {
  const dispatch = useDispatch();
  const chatIds = useSelector((state) => state.chatIds.chatIds) || [];
  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      // Redirect the user to the /app/home page after logout
      window.location.href = "/app/home";
    }, 1000);
  };
  const handleSelectNewChatClick = (chatId) => {
    dispatch(setSelectedChatId(chatId)); 
  };
  const accessToken = useSelector((state) => state.auth.accessToken);
  const handleNewChatClick = () => {
    //call addapi onsuccess call list api

    console.log(accessToken);
    axios
      .get("http://localhost:8000/api/add/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // Handle the response if necessary
        console.log(response.data.chatId);

        // Check if the response contains a chatId
        if (response.data.chatId) {
          // Call the next API with the chatId
          axios
            .get(`http://localhost:8000/api/chatlist/`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => {
              const data = response.data;
              console.log(data);
              // Assuming the response data is the chat details
              // Dispatch an action to store the chat details in Redux
              //dispatch(setChatDetails(data));
              dispatch(setChatIds(data));
            })
            .catch((error) => {
              console.error("Error fetching chat details:", error);
            });
        } else {
          console.error("No chatId found in the response");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container className="sidebar-box">
      <div className="sidebar">
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/chat/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/chat/profile">Profile</Nav.Link>
          <Nav.Link href="/contact">Settings</Nav.Link>
          <Nav.Link href="" className="logout" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </Nav>
      </div>
      <div className="newchat">
        {chatIds.map((chatId, idx) => (
          <div key={chatId} className="newchat-column" onClick={() => handleSelectNewChatClick(chatId)}>
            <div className="newchat-text">Chat {idx + 1}</div>
          </div>
        ))}
        <div className="newchat-button" onClick={handleNewChatClick}>
          <div className="newchat-text">+ New Chat</div>
        </div>
      </div>

      <div className="arrow">
        {/* Render the scroll to top and scroll to bottom arrows here */}
        {/* Replace this placeholder code with your actual implementation */}
        {/* <div className="arrow-up">^</div> */}
        {/* <div className="arrow-down">▼</div> */}
      </div>
    </Container>
  );
};

export default Sidebar;
