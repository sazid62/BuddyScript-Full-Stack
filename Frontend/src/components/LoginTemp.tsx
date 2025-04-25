import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  AddUser,
  initializeAllPost,
  initializeUser,
} from "../features/login/Userslice";
import { stateStruct } from "../interfaces/user_interface";
import conf from "../conf/conf";
import { useInitializeApp } from "./useInitializeApp";

export default function LoginTemp() {
  const [initializeAll, setInititalizeAll] = useState(false);

  const dispatch = useDispatch();

  useInitializeApp(initializeAll);

  const navigate = useNavigate();
  const current_user = useSelector((state: stateStruct) => state.currentuser);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Check login status based on Redux state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    try {
      setIsSubmitting(true);

      // console.log("reraraereeeeeeeeeeeeeeeeeeeeeeeeeeee");
      const res = await fetch(`${conf.apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();

        setInititalizeAll(true);

        await Swal.fire("Success!", "You are now logged in", "success");
        navigate("/home");
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }
    } catch (error) {
      Swal.fire(
        "Login Failed",
        error instanceof Error ? error.message : "An unexpected error occurred",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (current_user.id && current_user.email) {
      navigate("/home");
    }
  }, [current_user, navigate]);

  return (
    <div>
      <section className="_social_login_wrapper _layout_main_wrapper">
        <div className="_shape_one">
          <img
            src="./src/assets/images/shape1.svg"
            alt=""
            className="_shape_img"
          />
          <img
            src="./src/assets/images/dark_shape.svg"
            alt=""
            className="_dark_shape"
          />
        </div>
        <div className="_shape_two">
          <img
            src="./src/assets/images/shape2.svg"
            alt=""
            className="_shape_img"
          />
          <img
            src="./src/assets/images/dark_shape1.svg"
            alt=""
            className="_dark_shape _dark_shape_opacity"
          />
        </div>
        <div className="_shape_three">
          <img
            src="./src/assets/images/shape3.svg"
            alt=""
            className="_shape_img"
          />
          <img
            src="./src/assets/images/dark_shape2.svg"
            alt=""
            className="_dark_shape _dark_shape_opacity"
          />
        </div>
        <div className="_social_login_wrap">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <div className="_social_login_left">
                  <div className="_social_login_left_image">
                    <img
                      src="https://i.ibb.co.com/10MBCsz/login.png"
                      alt="Image"
                      className="_left_img"
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="_social_login_content">
                  <div className="_social_login_left_logo _mar_b28">
                    <img src="logo.svg" alt="Image" className="_left_logo" />
                  </div>
                  <p className="_social_login_content_para _mar_b8">
                    Welcome back
                  </p>
                  <h4 className="_social_login_content_title _titl4 _mar_b50">
                    Login to your account
                  </h4>
                  <button
                    type="button"
                    className="_social_login_content_btn _mar_b40"
                  >
                    <img src="google.svg" alt="Image" className="_google_img" />{" "}
                    <span>Or sign-in with google</span>
                  </button>
                  <div className="_social_login_content_bottom_txt _mar_b40">
                    <span>Or</span>
                  </div>
                  <form onSubmit={handleSubmit} className="_social_login_form">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="_social_login_form_input _mar_b14">
                          <label className="_social_login_label _mar_b8">
                            Email
                          </label>
                          <input
                            required
                            name="email"
                            type="email"
                            className="form-control _social_login_input"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="_social_login_form_input _mar_b14">
                          <label className="_social_login_label _mar_b8">
                            Password
                          </label>
                          <input
                            required
                            name="password"
                            type="password"
                            className="form-control _social_login_input"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                        <div className="form-check _social_login_form_check">
                          <input
                            className="form-check-input _social_login_form_check_input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            defaultChecked
                          />
                          <label
                            className="form-check-label _social_login_form_check_label"
                            htmlFor="flexRadioDefault2"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                        <div className="_social_login_form_left">
                          <p className="_social_login_form_left_para">
                            Forgot password?
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                        <div className="_social_login_form_btn _mar_t40 _mar_b60">
                          <button
                            type="submit"
                            className="_social_login_form_btn_link _btn1"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Logging in..." : "Login now"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_bottom_txt">
                        <p className="_social_login_bottom_txt_para">
                          Don't have an account?{" "}
                          <Link to="/register">Create New Account</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script src="./src/assets/js/bootstrap.bundle.min.js"></script>
    </div>
  );
}
