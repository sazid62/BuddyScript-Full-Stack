import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddUser,
  initializeUser,
  loginUser,
} from "../features/login/Userslice";
import Swal from "sweetalert2";
import { stateStruct } from "../interfaces/user_interface";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf";
import Password from "antd/es/input/Password";
import { useInitializeApp } from "./useInitializeApp";

export default function Regtemp() {
  const dispatch = useDispatch();
  const [initializeAll, setInititalizeAll] = useState(false);

  const navigate = useNavigate();
  if (initializeAll) {
    console.log("calling INITIALIZSE");
    useInitializeApp(dispatch);
    navigate("/home");
  }
  const current_user = useSelector((state: stateStruct) => state.currentuser);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const ref_pass = formData.get("rep_password");
    if (password !== ref_pass) {
      Swal.fire({
        title: "Passwords don't match",
        icon: "warning",
      });
    } else {
      const payload = {
        name: "none",
        email: email,
        password: password,
      };

      try {
        const res = await fetch("http://localhost:3333/reg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        await fetch("http://localhost:3333/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();

          Swal.fire({
            title: "User created successfully!",
            icon: "success",
          });

          // dispatch(
          //   initializeUser({
          //     userId: data.data.userId || "",
          //     email: data.data.email || "",
          //   })
          // );
          setInititalizeAll(true);

          //make all post, and currentuser inititalize
        } else {
          Swal.fire({
            title: "Error In Backend",
            icon: "warning",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Something went wrong!",
          text: error.message || "Please try again later.",
          icon: "error",
        });
      }
    }
  }
  return (
    <div>
      <section className="_social_registration_wrapper _layout_main_wrapper">
        <div className="_shape_one">
          <img src="shape1.svg" alt="" className="_shape_img" />
          <img src="dark_shape.svg" alt="" className="_dark_shape" />
        </div>
        <div className="_shape_two">
          <img src="shape2.svg" alt="" className="_shape_img" />
          <img
            src="dark_shape1.svg"
            alt=""
            className="_dark_shape _dark_shape_opacity"
          />
        </div>
        <div className="_shape_three">
          <img src="shape3.svg" alt="" className="_shape_img" />
          <img
            src="dark_shape2.svg"
            alt=""
            className="_dark_shape _dark_shape_opacity"
          />
        </div>
        <div className="_social_registration_wrap">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <div className="_social_registration_right">
                  <div className="_social_registration_right_image">
                    <img src="registration.png" alt="Image" />
                  </div>
                  <div className="_social_registration_right_image_dark">
                    <img src="registration1.png" alt="Image" />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="_social_registration_content">
                  <div className="_social_registration_right_logo _mar_b28">
                    <img src="logo.svg" alt="Image" className="_right_logo" />
                  </div>
                  <p className="_social_registration_content_para _mar_b8">
                    Get Started Now
                  </p>
                  <h4 className="_social_registration_content_title _titl4 _mar_b50">
                    Registration
                  </h4>
                  <button
                    type="button"
                    className="_social_registration_content_btn _mar_b40"
                  >
                    <img src="google.svg" alt="Image" className="_google_img" />{" "}
                    <span>Register with google</span>
                  </button>
                  <div className="_social_registration_content_bottom_txt _mar_b40">
                    <span>Or</span>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="_social_registration_form"
                  >
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="_social_registration_form_input _mar_b14">
                          <label className="_social_registration_label _mar_b8">
                            Email
                          </label>
                          <input
                            required
                            name="email"
                            type="email"
                            className="form-control _social_registration_input"
                          />
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="_social_registration_form_input _mar_b14">
                          <label className="_social_registration_label _mar_b8">
                            Password
                          </label>
                          <input
                            name="password"
                            required
                            type="password"
                            className="form-control _social_registration_input"
                          />
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="_social_registration_form_input _mar_b14">
                          <label className="_social_registration_label _mar_b8">
                            Repeat Password
                          </label>
                          <input
                            name="rep_password"
                            required
                            type="password"
                            className="form-control _social_registration_input"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
                        <div className="form-check _social_registration_form_check">
                          <input
                            required
                            className="form-check-input _social_registration_form_check_input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            defaultChecked
                          />
                          <label
                            className="form-check-label _social_registration_form_check_label"
                            htmlFor="flexRadioDefault2"
                          >
                            I agree to terms & conditions
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                        <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                          <button
                            type="submit"
                            className="_social_registration_form_btn_link _btn1"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
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

// nextJS env system
// adonisJS env system
//vi te
