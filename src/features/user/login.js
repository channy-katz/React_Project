import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser as signUpToServer } from "./userApi";
import { userIn } from "./userSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { login } from "./userApi";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // ייבוא הספרייה
import './login'; 
const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const save = (data) => {
    login(data)
      .then((res) => {
        // הצלחתי להיכנס, הצגת התראה מתאימה
        Swal.fire({
          icon: "success",
          title: "הצלחת להיכנס!",
          showConfirmButton: false,
          timer: 1500
        });
        dispatch(userIn(res.data));
        navigate("/");

      })
      .catch((err) => {
        // אירעה שגיאה, הצגת התראת שגיאה
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: " משתמש לא רשום נשה להירשם מחדש ",
        });
        navigate("/signup");
        console.log(err);
      });
  };

  return (<>
    <h1>login</h1>

    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <form onSubmit={handleSubmit(save)} style={{ width: "300px" }}>
        <TextField
          label="מייל"
          type="text"
          {...register("email")}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="סיסמה"
          type="password"
          {...register("password")}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
          <Button variant="contained" type="submit" sx={{ backgroundColor: "black" }}>
            כניסה
          </Button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Login;
