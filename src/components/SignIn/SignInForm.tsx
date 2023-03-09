import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../../styles/form.css";
export const SignInForm = () => {
  const userRef: any = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      console.log({ data });
      //   await axios.post(`http://localhost:3001/usertest/login`, {
      //     email: data.email,
      //     password: data.password,
      //     role: data.role,
      //   });
    } catch (e) {
      console.log("error ==>", e);
    }
    setEmail("");
    setPassword("");
    setSuccess(true);
  };
  return (
    <div className="form">
      <h2>Sign In🙏</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb">
          <label htmlFor="name">Email</label>
          <br />
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
          />
          <br />
          {errors.email && <p>This is required</p>}
        </div>
        <div className="mb">
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
          <br />
          {errors.password && <p>This is required</p>}
        </div>

        <div className="md">
          <input
            id="role"
            type="hidden"
            value="user"
            {...register("role", { required: true })}
          />
        </div>

        <input className="button_submit" type="submit" />
      </form>
    </div>
  );
};
