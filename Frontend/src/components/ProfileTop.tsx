import { useSelector } from "react-redux";
import { stateStruct } from "../interfaces/user_interface";

export default function ProfileTop() {
    const current_user = useSelector((state:stateStruct)=>state.currentuser);
  

  return (
    <div>
      <div className="_profile_container_top">
        <div className="_profile_container_top_inner">
          <div className="_profile_cover_wrap">
            <div className="_profile_cover">
              <img
                src="./src/assets/images/profile-cover-img.png"
                alt="cover img"
                className="_profile_cover_img"
              />
            </div>
            <div className="_profile_card_inner">
              <div className="_profile_card">
                <div className="_profile_card_pro_pic ">
                  <img
                    src={current_user.img}
                    alt=""
                    title=""
                    className="_profile_card_pro_img"
                  />
                </div>
                <div className="_profile_card_info">
                  <h4 className="_profile_card_info_title">{current_user.email.slice(0,current_user.email.indexOf('@'))}</h4>
                  <p className="_profile_card_info_para">UI/UX Designer</p>
                </div>
                <div className="_profile_card_progress">
                  <div className="_profile_card_progreess_bar"></div>
                  <div className="_profile_card_progreess_bar_image">
                    <img
                      src="line.svg"
                      alt="Image"
                      className="_progress_image"
                    />
                  </div>
                  <div className="_profile_card_progress_txt">
                    <p className="_profile_card_progress_txt_para">
                      Profile Completed
                    </p>
                    <p className="_profile_card_progress_txt_percent"> {Math.floor(Math.random() * 100)}%</p>
                  </div>
                </div>
              </div>

              <div className="_profile_card_upload">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="#000"
                    d="M1 9c0-3.771 0-5.657 1.172-6.828C3.343 1 5.229 1 9 1h2c3.771 0 5.657 0 6.828 1.172C19 3.343 19 5.229 19 9v2c0 3.771 0 5.657-1.172 6.828C16.657 19 14.771 19 11 19H9c-3.771 0-5.657 0-6.828-1.172C1 16.657 1 14.771 1 11V9z"
                  />
                  <path
                    fill="#000"
                    fill-rule="evenodd"
                    d="M6.998 9.162a1.5 1.5 0 00-.799-.154c-.216.019-.471.129-.87.45-.402.323-.885.805-1.566 1.486l-1.91 1.91-.707-.708 1.91-1.91.022-.021c.654-.655 1.175-1.175 1.623-1.536.456-.367.902-.624 1.414-.667a2.5 2.5 0 011.33.256c.46.23.779.635 1.066 1.145.282.501.572 1.178.937 2.028l.012.029.053.124c.167.39.279.65.38.835.1.183.157.23.181.245a.5.5 0 00.35.067c.028-.005.098-.027.26-.16a11 11 0 00.662-.634l.015-.016c.401-.4.724-.723 1.008-.962.292-.246.576-.434.909-.534a2.5 2.5 0 011.444 0c.333.1.617.288.91.534.283.239.606.562 1.007.962l.015.016 1.7 1.7-.707.706-1.7-1.699c-.42-.42-.713-.712-.96-.92-.242-.205-.405-.297-.554-.342a1.5 1.5 0 00-.866 0c-.149.045-.312.137-.554.341-.247.209-.54.501-.96.921l-.017.017c-.278.279-.512.512-.716.68-.209.173-.44.325-.723.375a1.5 1.5 0 01-1.05-.202c-.243-.151-.402-.378-.532-.617a11.395 11.395 0 01-.412-.896l-.01-.023-.053-.124c-.379-.886-.648-1.512-.9-1.961-.252-.447-.448-.644-.642-.741z"
                    clip-rule="evenodd"
                  />
                  <circle cx="14.5" cy="5.5" r="1.5" fill="#000" />
                </svg>
                <p className="_profile_card_upload_txt">Edit Cover Photo</p>
              </div>

              <div className="_profile_card_upload_mobile">
                <div className="_profile_cover_upload">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="#000"
                      d="M1 9c0-3.771 0-5.657 1.172-6.828C3.343 1 5.229 1 9 1h2c3.771 0 5.657 0 6.828 1.172C19 3.343 19 5.229 19 9v2c0 3.771 0 5.657-1.172 6.828C16.657 19 14.771 19 11 19H9c-3.771 0-5.657 0-6.828-1.172C1 16.657 1 14.771 1 11V9z"
                    />
                    <path
                      fill="#000"
                      fill-rule="evenodd"
                      d="M6.998 9.162a1.5 1.5 0 00-.799-.154c-.216.019-.471.129-.87.45-.402.323-.885.805-1.566 1.486l-1.91 1.91-.707-.708 1.91-1.91.022-.021c.654-.655 1.175-1.175 1.623-1.536.456-.367.902-.624 1.414-.667a2.5 2.5 0 011.33.256c.46.23.779.635 1.066 1.145.282.501.572 1.178.937 2.028l.012.029.053.124c.167.39.279.65.38.835.1.183.157.23.181.245a.5.5 0 00.35.067c.028-.005.098-.027.26-.16a11 11 0 00.662-.634l.015-.016c.401-.4.724-.723 1.008-.962.292-.246.576-.434.909-.534a2.5 2.5 0 011.444 0c.333.1.617.288.91.534.283.239.606.562 1.007.962l.015.016 1.7 1.7-.707.706-1.7-1.699c-.42-.42-.713-.712-.96-.92-.242-.205-.405-.297-.554-.342a1.5 1.5 0 00-.866 0c-.149.045-.312.137-.554.341-.247.209-.54.501-.96.921l-.017.017c-.278.279-.512.512-.716.68-.209.173-.44.325-.723.375a1.5 1.5 0 01-1.05-.202c-.243-.151-.402-.378-.532-.617a11.395 11.395 0 01-.412-.896l-.01-.023-.053-.124c-.379-.886-.648-1.512-.9-1.961-.252-.447-.448-.644-.642-.741z"
                      clip-rule="evenodd"
                    />
                    <circle cx="14.5" cy="5.5" r="1.5" fill="#000" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="_profile_info_wrap">
            <div className="_profile_info_des">
              <div className="_profile_info_des_image">
                <img
                  src={current_user.img}
                  alt=""
                  title=""
                  className="_profile_card_pro_img"
                />
                <div className="_profile_info_des_upload_icon">
                  <button
                    className="_profile_info_des_upload_icon_link"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        stroke="#000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.333 12.667A1.334 1.334 0 0113.999 14H2a1.334 1.334 0 01-1.333-1.333V5.333A1.333 1.333 0 011.999 4h2.667l1.333-2h4l1.334 2h2.666a1.334 1.334 0 011.334 1.333v7.334z"
                      />
                      <path
                        stroke="#000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 11.333A2.667 2.667 0 108 6a2.667 2.667 0 000 5.333z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="_profile_info_des_txt">
                <h4 className="_profile_card_info_title">{current_user.email.slice(0,current_user.email.indexOf('@'))}</h4>
                <p className="_profile_card_info_para">UI/UX Designer</p>
                <div className="_profile_card_progress_txt">
                  <p className="_profile_card_progress_txt_para">
                    Profile Completed
                  </p>
                  <p className="_profile_card_progress_txt_percent">55%</p>
                  <div className="_profile_card_progreess_bar"></div>
                  <div className="_profile_card_progreess_bar_image">
                    <img
                      src="line.svg"
                      alt="Image"
                      className="_progress_image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="_profile_nav_wrap">
            <div className="_top_inner_content _padd_t24 _padd_b24">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_top_inner_content_area">
                      <div className="_top_inner_content_area_left">
                        <ul className="_top_inner_content_area_left_list">
                          <li className="_top_inner_content_area_left_item">
                            {" "}
                            <a
                              href="#0"
                              className="_top_inner_content_area_left_link _top_inner_content_area_left_link_active"
                            >
                              Feed
                            </a>
                          </li>
                          <li className="_top_inner_content_area_left_item">
                            {" "}
                            <a
                              href="#0"
                              className="_top_inner_content_area_left_link"
                            >
                              About
                            </a>
                          </li>
                          <li className="_top_inner_content_area_left_item">
                            {" "}
                            <a
                              href="#0"
                              className="_top_inner_content_area_left_link"
                            >
                              Friends
                            </a>
                          </li>
                          <li className="_top_inner_content_area_left_item">
                            {" "}
                            <a
                              href="#0"
                              className="_top_inner_content_area_left_link"
                            >
                              Photos
                            </a>
                          </li>
                          <li className="_top_inner_content_area_left_item">
                            {" "}
                            <a
                              href="#0"
                              className="_top_inner_content_area_left_link"
                            >
                              More
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="_top_inner_content_area_right">
                        <div className="_top_inner_content_area_btn">
                          <button
                            type="button"
                            className="_top_inner_content_area_btn_link"
                          >
                            {" "}
                            <span>+ Add Stories</span>
                          </button>
                        </div>
                        <div className="_top_inner_content_area_btn">
                          <button
                            type="button"
                            className="_top_inner_content_area_btn_link"
                          >
                            {" "}
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="16"
                                fill="none"
                                viewBox="0 0 15 16"
                              >
                                <path
                                  stroke="#666"
                                  d="M1.93 14.783h0l.021-.005h0l2.633-.659.045-.01c.223-.056.42-.105.599-.207.179-.101.322-.245.484-.407l.033-.033 7.194-7.194h0l.024-.024c.313-.313.583-.583.77-.828.2-.263.353-.556.353-.916s-.152-.653-.353-.916c-.187-.245-.457-.515-.77-.829l-.024-.023-.353.354.353-.354-.171-.171-.024-.024c-.313-.313-.583-.583-.828-.77-.263-.2-.556-.353-.916-.353s-.653.152-.916.353c-.245.187-.515.457-.829.77l-.023.024-7.194 7.194-.033.033c-.162.162-.306.305-.407.484-.102.18-.15.376-.206.6l-.011.044-.664 2.654a9.274 9.274 0 00-.007.027c-.039.157-.08.324-.095.465-.015.154-.011.415.198.625.21.21.47.213.625.197a3.43 3.43 0 00.492-.101z"
                                />
                                <path fill="#666" d="M8.5 3l3-2 3 3-2 3-4-4z" />
                              </svg>
                              Edit Profile
                            </span>
                          </button>
                        </div>
                        <div className="_top_inner_content_area_btn">
                          <button
                            type="button"
                            className="_top_inner_content_area_btn_link"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="4"
                              height="17"
                              fill="none"
                              viewBox="0 0 4 17"
                            >
                              <circle
                                className="_circle"
                                cx="2"
                                cy="2"
                                r="2"
                                fill="#666"
                              ></circle>
                              <circle
                                className="_circle"
                                cx="2"
                                cy="8"
                                r="2"
                                fill="#666"
                              ></circle>
                              <circle
                                className="_circle"
                                cx="2"
                                cy="15"
                                r="2"
                                fill="#666"
                              ></circle>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="_profile_nav_wrap_mobile _mar_t4">
            <div className="_top_inner_content_mobile _padd_t24 _padd_b24">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_top_inner_content_area_mobile">
                      <div className="_top_inner_content_area_left">
                        <ul className="_top_inner_content_area_left_list">
                          <li className="_top_inner_content_area_left_item">
                            {" "}
                            <a
                              href="#0"
                              className="_top_inner_content_area_left_link _top_inner_content_area_left_link_active"
                            >
                              Feed
                            </a>
                          </li>
                          <li className="_top_inner_content_area_left_item">
                            {" "}
                            <a
                              href="#0"
                              className="_top_inner_content_area_left_link"
                            >
                              About
                            </a>
                          </li>
                          <li className="_top_inner_content_area_left_item">
                            <a
                              href="#0"
                              className="_top_inner_content_area_left_link"
                            >
                              More
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="_top_inner_content_area_right">
                        <div className="_top_inner_content_area_btn">
                          <button
                            type="button"
                            className="_top_inner_content_area_btn_link"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="#666"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M9 3.75v10.5M3.75 9h10.5"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="_top_inner_content_area_btn">
                          <button
                            type="button"
                            className="_top_inner_content_area_btn_link"
                          >
                            {" "}
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="16"
                                fill="none"
                                viewBox="0 0 15 16"
                              >
                                <path
                                  stroke="#666"
                                  d="M1.93 14.783h0l.021-.005h0l2.633-.659.045-.01c.223-.056.42-.105.599-.207.179-.101.322-.245.484-.407l.033-.033 7.194-7.194h0l.024-.024c.313-.313.583-.583.77-.828.2-.263.353-.556.353-.916s-.152-.653-.353-.916c-.187-.245-.457-.515-.77-.829l-.024-.023-.353.354.353-.354-.171-.171-.024-.024c-.313-.313-.583-.583-.828-.77-.263-.2-.556-.353-.916-.353s-.653.152-.916.353c-.245.187-.515.457-.829.77l-.023.024-7.194 7.194-.033.033c-.162.162-.306.305-.407.484-.102.18-.15.376-.206.6l-.011.044-.664 2.654a9.274 9.274 0 00-.007.027c-.039.157-.08.324-.095.465-.015.154-.011.415.198.625.21.21.47.213.625.197a3.43 3.43 0 00.492-.101z"
                                ></path>
                                <path
                                  fill="#666"
                                  d="M8.5 3l3-2 3 3-2 3-4-4z"
                                ></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
