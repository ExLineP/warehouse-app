

import { useSignIn } from "react-auth-kit";
import { useFormik} from "formik";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [error, setError] = useState(null);
  const signIn = useSignIn();
  const navigate = useNavigate()
  const onSubmit = async (values) => {
    console.log("Values: ", values);
    setError("");

    try {
      const response = await axios.post(
        "http://192.168.50.187:3000/login",
        values, {headers: 
            {'content-type': 'application/json'}
    });

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email },
      });
      navigate("/")
    } catch (err) {
      if (err && err instanceof AxiosError)
      setError('Неверный логин или пароль');
      else if (err && err instanceof Error) 
      setError("Повторите попытку позднее");

      console.log("Error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={formik.handleSubmit}>
        <div className="Auth-form-content">
          <h1 className="Auth-form-title">Вход</h1>
          <div className="form-group mt-3">
            <label>Логин</label>
            <input
              className="form-control mt-1"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Почта"
              size="large"
              type="email"
            />
        </div>
        
        <div className="form-group mt-3">
            <label>Пароль</label>
            <input
            className="form-control mt-1"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Пароль"
              size="large"
              type="password"
            />
            </div>
            <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" size="large" type="submit" kind="primary" >
              Войти
            </button>
            </div>
            </div>
        </form>
        <div className="alert alert-danger" role="alert" style={{
            display: error == null ? "none" : "flex"
        }}>
        <label>{error}</label>
</div>
    </div>
  );
}

export { Login };