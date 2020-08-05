import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Profile(props) {
  const [posts, setPost] = useState([]);

  // GET all the users stored in the database
  useEffect(() => {
    axios
      .get("http://localhost:5000/all")
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteUser = (email) => {
    const url = `http://localhost:5000/delete/${email}`;
    axios
      .delete(url)
      .then((response) => {
        console.log(response);
        alert("Deleted user ");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function called when Signout button clicked
  const signout = () => {
    props.signout();
  };

  return props.flag === 2 ? (
    <Redirect to="/login" />
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "30px",
        margin: "30px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onClick={signout}>Sign Out</Button>
      <ListGroup
        style={{
          padding: "20px",
        }}
      >
        {posts.map((post) => (
          <ListGroup.Item>
            <ListGroup.Item key={post.user_id} variant="primary">
              {post.name}
            </ListGroup.Item>
            <ListGroup.Item
              style={{ display: "flex", flexDirection: "column" }}
            >
              {post.email}{" "}
              <Button
                variant="danger"
                onClick={() => deleteUser(post.email)}
                style={{ margin: "30px" }}
                size="sm"
              >
                Delete
              </Button>
            </ListGroup.Item>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Profile;
