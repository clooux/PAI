import { useForm } from "react-hook-form";
import { SignInUser } from "../models/User";


function LoginCard({ signIn }: { signIn: (data: SignInUser) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUser>();
  return (
    <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-96">
      <div className="card-body">
        <form onSubmit={handleSubmit(signIn)} className="form-control">
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
            value="Sign in"
            className="btn btn-primary mt-5"
          />
        </form>
      </div>
    </div>
  );
}

export default LoginCard;
