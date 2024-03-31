import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser as signUpToServer } from "./userApi";
import { userIn } from "./userSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2"; // הוספת שימוש ב-Swal
import './singUp.css';

const SignUp = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const save = (data) => {
    signUpToServer(data)
      .then((res) => {
        // הצגת הודעת ה-SweetAlert במקום ה-alert הרגיל
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "ההרשמה הצליחה!",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(userIn(res.data));
        console.log(res);
      })
      .catch((err) => {
        alert("לא הצליח להרשם" + err);
        console.log('err',err);
      });
  };

  return (<>
    <h1>join us</h1>
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <form onSubmit={handleSubmit(save)} style={{ width: "300px" }}>
        <TextField
          label="שם משתמש"
          type="text"
          {...register("userName", {
            required: { value: true, message: "שדה חובה" },
          })}
          variant="outlined"
          error={!!errors.userName}
          helperText={errors.userName && errors.userName.message}
          sx={{ marginBottom: 2 }}
        />

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

export default SignUp;
