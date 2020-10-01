import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Avatar } from "@material-ui/core";
import "./Profile.css";
import CameraAltRoundedIcon from "@material-ui/icons/CameraAltRounded";
import HomeWorkRoundedIcon from "@material-ui/icons/HomeWorkRounded";
import PhoneIcon from "@material-ui/icons/Phone";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import { Button, Form } from "react-bootstrap";
import { auth, db } from "./firebase";

function Profile() {
  const [{ Cart, Wishlist, user }, dispach] = useStateValue();
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    setName(user?.displayName);
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("profile")
        .onSnapshot((snapshot) =>
          snapshot.docs.map(
            (doc) => (
              setNumber(doc.data().phone), setAddress(doc.data().address)
            )
          )
        );
    }
    setNumber();
    setEmail(user?.email);
    setAddress();
  }, [user]);

  const handleInfo = (e) => {
    user.updateProfile({
      displayName: name,
    });
    db.collection("users")
      .doc(user?.uid)
      .collection("profile")
      .doc("info")
      .set({
        address: address,
        phone: number,
      });
    // window.location.reload(false);
  };

  console.log(user);
  if (user) {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "10px 0",
          textAlign: "center",
        }}
      >
        <h1>My Profile</h1>
        <Jumbotron
          style={{
            textAlign: "center",
            marginLeft: "50px",
            marginRight: "50px",
          }}
        >
          <center>
            <Avatar src="" style={{ height: "200px", width: "200px" }} />

            <button
              className="cam"
              style={{
                borderRadius: "20px",
                opacity: "0.9",
                backgroundColor: "rgba(255, 255, 255 ,0.8)",
                marginTop: "-40px",
                marginLeft: "40px",
                position: "absolute",
                border: "none",
                outline: "none",
                width: "31px",
              }}
            >
              <CameraAltRoundedIcon
                style={{ width: "20px", height: "20px", color: "black" }}
              />
            </button>

            <div
              style={{
                marginTop: "50px",
                display: "flex",
                flexDirection: "column",
                width: "400px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <PersonRoundedIcon style={{ fontSize: 40 }} />
                <Form.Control
                  style={{ marginLeft: "50px" }}
                  placeholder="UserName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <PhoneIcon style={{ fontSize: 40 }} />
                <Form.Control
                  style={{ marginLeft: "50px" }}
                  placeholder="PhoneNumber"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                ></Form.Control>{" "}
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <EmailRoundedIcon style={{ fontSize: 40 }} />
                <Form.Control
                  style={{ marginLeft: "50px" }}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>{" "}
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <HomeWorkRoundedIcon style={{ fontSize: 40 }} />
                <Form.Control
                  style={{ marginLeft: "50px" }}
                  placeholder="HomeAddress"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </div>
            </div>
            <Button onClick={handleInfo}>Save</Button>
          </center>
        </Jumbotron>
      </div>
    );
  } else return <div></div>;
}

export default Profile;
