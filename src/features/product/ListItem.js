import { useState } from "react";
import "./listItem.css";
import { useSelector } from "react-redux";
import { deleteproduct } from "./productApi";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Update from "./Update";
import { Button, Link } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";

const ListItem = ({ one }) => {
  const [imageSrc, setImageSrc] = useState(one.imgUrl[0]);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const isAdmin = user && user.role === "ADMIN";
  const token = useSelector((state) => state.user.currentUser?.token);
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = async () => {
    setShowAlert(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await deleteproduct(one._id, token);
      alert("Deleted");
      navigate("/Home");
    } catch {
      alert("Couldn't delete");
    }
  };

  const changeImage = () => {
    setImageSrc(one.imgUrl[1]);
  };

  const resetImage = () => {
    setImageSrc(one.imgUrl[0]);
  };

  return (
    <div className="container">
      <div className="image-container">
       <img
          src={imageSrc}
          className="item"
          onMouseOver={changeImage}
          onMouseOut={resetImage}
          width="300px"
          height="300px"
               onClick={()=>{navigate("" + one._id)}}/>
        <div className="product-name">{one.prodName}</div>
        
        <div className="button-container">
          {isAdmin && (
            <>
              <Button
                variant="contained"
                onClick={handleDelete}
                startIcon={<DeleteIcon />}
                style={{ color: "black", backgroundColor: "transparent" }}
              ></Button>
              <Link to="/Update">
                <Button
                  variant="contained"
                  startIcon={<UpdateIcon />}
                  style={{ color: "black", backgroundColor: "transparent" }}
                >
                  Update me
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {showAlert && (
        <Alert severity="warning">
          <AlertTitle>האם אתה בטוח שברצונך למחוק?</AlertTitle>
          פעולה זו תמחק את הפריט באופן סופי ולא תוכל לשחזר אותו מאוחר יותר.
          <br />
          <Button
            variant="contained"
            onClick={confirmDelete}
            style={{ color: "black", backgroundColor: "transparent" }}
          >
            כן, מחק
          </Button>
          <Button
            variant="contained"
            onClick={() => setShowAlert(false)}
            style={{ color: "black", backgroundColor: "transparent" }}
          >
            ביטול
          </Button>
        </Alert>
      )}
    </div>
  );
};

export default ListItem;
