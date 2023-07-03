import { useForm } from "react-hook-form";
import { SignUpUser } from "../models/User";

function RegisterCard({ signUp }: { signUp: (data: SignUpUser) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpUser>();

  return (
    <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-96">
      <div className="card-body">
        <form onSubmit={handleSubmit(signUp)} className="form-control">
          <div className="">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered w-11/12"
              {...register("firstName", {
                required: true,
                minLength: 3,
              })}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-11/12"
              {...register("lastName", {
                required: true,
                minLength: 3,
              })}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-11/12"
              placeholder="email"
              {...register("email", { required: true, minLength: 8 })}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered w-11/12"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
            />
          </div>
          <input
            type="submit"
            value="Sign up"
            className="btn btn-primary mt-5"
          />
        </form>
      </div>
    </div>
  );
}

export default RegisterCard;
