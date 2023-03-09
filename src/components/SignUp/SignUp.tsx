import React from "react";
import { useForm } from "react-hook-form";
import "../../styles/form.css";
export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <div className="form">
      <h2>Sign Up🙏</h2>
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
        <div className="mb">
          <label htmlFor="password">Confirm Password</label>
          <br />
          <input
            id="confirmpassword"
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
        {/* Sign Up
        </input> */}
      </form>
    </div>
  );
};
