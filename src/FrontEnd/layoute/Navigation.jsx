import React, { useState } from "react";
import "./Navigation.css";
import { useNavigate, Link } from "react-router-dom";
import { useDialogActionContext } from "../Context/DialogActionContext";
import AvatarImgForAllType from "../Commponent/AvatarImgForAllType";
import ShangeForAllUserProfils from "../Commponent/ShangeForAllUserProfils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "../hooks/useNavigation";
import {
  startshngeprofileusernowtologin,
} from "../../allsliceproj/Controller Data Profile Now/controolerdataprodfilenowSlice";

import VerifiedIcon from "@mui/icons-material/Verified";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import CategoryIcon from "@mui/icons-material/Category";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PeopleIcon from "@mui/icons-material/People";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from '@mui/icons-material/Quiz';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

import { FaGem } from "react-icons/fa";
import { FaBullseye } from "react-icons/fa";
import { FaConciergeBell } from "react-icons/fa";
import { MdSwitchAccount } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import Cookies from "js-cookie";

let typRequest = "";

let UrlRequest = "";
let token = Cookies.get("token");
const keygold = 32437847989;

const Navigation = ({ typeactive }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const { 
    TypeAlearVipNow,
    HandleCloseOrOpenReadinPage,
     OpenDialogForActionFound 
  } =
    useDialogActionContext();
  const dispatsh = useDispatch();

  // Start Get Alls Data To Do Semthong In The Page Form Slice Controller
  const AllsDataUserNow = useSelector((state) => {
    return state.datauser.datauser;
  });

  const ProfileSnageNow = useSelector((state) => {
    return state.datauser.ProfileSnageNow;
  });

  const typeRequestRsp = useSelector((state) => {
    return state.datauser.typRequestNow;
  });
  const lodingtorspact = useSelector((state) => {
    return state.datauser.lodingtorspact;
  });

  const resultrquestaction = useSelector((state) => {
    return state.datauser.resultrquestaction;
  });
  //== End Get Alls Data To Do Semthong In The Page Form Slice Controller ==//

  const { goTo, replace, goBack } = useNavigation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkAuthentication = () => {
      token = Cookies.get("token");
    };
    checkAuthentication();
  }, [navigate]);

  // Start Her To Sheck loding Response
  React.useEffect(() => {
    if (lodingtorspact) {
      typRequest = typeRequestRsp;
      HandleCloseOrOpenReadinPage(true);
    } else {
      HandleCloseOrOpenReadinPage(false);
    }
  }, [lodingtorspact]); // End Her To Sheck loding Response

  React.useMemo(() => {
    typRequest = "";
  }, []);

  // Start Here To Get Sult For Semthing Request In Page
  React.useEffect(() => {
    if (typeRequestRsp === "StartShangeForNoterProfile") {
      if (resultrquestaction === 1 ) {
        HandleCloseOrOpenReadinPage(false);
        if (resultrquestaction === 99) {
          HandleCloseOrOpenReadinPage(false);
          OpenDialogForActionFound(
            "حدث خطا فشكة او لمزود لخدمة حاول في وقت لاحق تم تسجيل خروجك"
          );
          navigate("/home");
        }
      }
    } else if (typeRequestRsp === "startactionlogouteaccounteuser") {
      if (resultrquestaction === 1) {
        HandleCloseOrOpenReadinPage(false);
        Cookies.remove("token");
        if (resultrquestaction === 99) {
          OpenDialogForActionFound(
            "حدث خطا فشكة او لمزود لخدمة حاول في وقت لاحق و تم تسجيل خروجك"
          );
        }
        navigate("/home");
      }
    }
  }, [
    resultrquestaction,
    typeRequestRsp === "StartShangeForNoterProfile",
    typeRequestRsp === "startactionlogouteaccounteuser",
  ]); //== End Here To Get Sult For Semthing Request In Page ==//

  function HandelSendSowProfile(vla) {
    setOpen(true);
    setIsNavOpen(false);
  }

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const DataUserClickLoginNow = (value, TypeAction) => {
    if (TypeAction === "user") {
      UrlRequest = {
        profileID: `${value.id}`,
        TypeProfile: "user",
      };
    } else if (TypeAction === "bss") {
      UrlRequest = {
        profileID: `${value.id}`,
        TypeProfile: TypeAction,
      };
    } else if (TypeAction === "teweve") {
      UrlRequest = {
        profileID: `${value.id}`,
        TypeProfile: TypeAction,
      };
    }
    HandleCloseOrOpenReadinPage(true);
    dispatsh(startshngeprofileusernowtologin(UrlRequest));
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const handleLogout = () => {
    closeNav();
    TypeAlearVipNow(
      '',
      "HanleStartLogouteMyAcounte",
      "",
      "",
      "",
      "",
      "تاكيد رغبتك فلتسجيل خروج من حسابك",
      "تاكيد",
      "",
      "user",
      "هل انت متاكد من رغبتك فلخروج من حسابك قم بضغط على تاكيد للاتمام طلبيتك",
      keygold,
    );
  };

  if (ProfileSnageNow) {
    return (
      <div className="navigation-container">
        <ShangeForAllUserProfils
          ProfilreNow={ProfileSnageNow}
          DataUserClickLoginNow={DataUserClickLoginNow}
          open={open}
          setOpen={setOpen}
          showDateUser={AllsDataUserNow}
        />
        {/* زر فتح القائمة */}
        <button
          className={`menu-toggle ${isNavOpen ? "open" : ""}`}
          onClick={toggleNav}
          aria-label="فتح القائمة"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* overlay الخلفية */}
        <div
          className={`navigation-overlay ${isNavOpen ? "active" : ""}`}
          onClick={closeNav}
        ></div>

        {/* القائمة المنزلقة */}
        <nav className={`navigation ${isNavOpen ? "open" : ""}`}>
          {/* زر إغلاق القائمة */}
          <button
            className={`menu-toggle ${
              isNavOpen ? "open" : ""
            } menu-togglecolce`}
            onClick={closeNav}
            aria-label="فتح القائمة"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* محتوى القائمة حسب حالة تسجيل الدخول */}
          {token && AllsDataUserNow && ProfileSnageNow ? (
            // إذا كان المستخدم مسجلاً
            <div className="user-nav">
              <div className="user-profile">
                <div className="user-avatar">
                  <AvatarImgForAllType typShowImg='ShowAlls' style={{
                      width: '95%',
                      height: '95%'
                    }} MyAvatar={ProfileSnageNow.image} />
                  <div className="online-status"></div>
                </div>
                <div className="user-info">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <VerifiedIcon className="stylevirfedsmpl" />
                    <h3>{ProfileSnageNow.name}</h3>
                    <VerifiedIcon style={{ color: "#4a6cf7" }} />
                  </div>
                  <p>
                    {ProfileSnageNow.TypProf === "bss"
                      ? "مدير المتجر"
                      : "" || ProfileSnageNow.TypProf === "teweve"
                      ? "صلاحية: الموضف"
                      : "" || ProfileSnageNow.TypProf === "user"
                      ? "حساب شخصي"
                      : ""}
                  </p>
                </div>
              </div>

              <div className="nav-links">
                <div className="nav-section"></div>
                {ProfileSnageNow.TypProf === "bss" ||
                ProfileSnageNow.TypProf === "teweve" ? (
                  <>
                    <div className="nav-section">
                      <Link
                        to="/dashboard"
                        aria-disabled={typeactive === "Dashboardt"}
                        aria-hidden
                        className={`nav-link ${
                          typeactive === "Dashboardt" ? "active" : ""
                        }`}
                      >
                        <span className="nav-icon">
                          <DashboardIcon
                              className="iconShwStyle"
                          />
                        </span>
                        <span className="nav-text">لوحة التحكم</span>
                        {/* </a> */}
                      </Link>
                      <h4>الإدارة</h4>
                      {(ProfileSnageNow.TypProf === "teweve" &&
                        ProfileSnageNow.edartpayprodects == 1) ||
                      ProfileSnageNow.TypProf === "bss" ? (
                        <Link
                          to="/Sales-Management"
                          aria-disabled={typeactive === "EdartPayProdects"}
                          aria-hidden
                          className={`nav-link ${
                            typeactive === "EdartPayProdects" ? "active" : ""
                          }`}
                        >
                          <span className="nav-icon">
                            <AddBusinessIcon
                              className="iconShwStyle"
                            />
                          </span>
                          <span className="nav-text">إدارة المبيعات</span>
                        </Link>
                      ) : (
                        ""
                      )}

                      {(ProfileSnageNow.TypProf === "teweve" &&
                        ProfileSnageNow.edartOrders == 1) ||
                      ProfileSnageNow.TypProf === "bss" ? (
                        <Link
                          to="/Order-Management"
                          aria-disabled={typeactive === "Edartorders"}
                          aria-hidden
                          className={`nav-link ${
                            typeactive === "Edartorders" ? "active" : ""
                          }`}
                        >
                          <span className="nav-icon">
                            <AddShoppingCartIcon
                              className="iconShwStyle"
                            />
                          </span>
                          <span className="nav-text">إدارة الطلبات</span>
                        </Link>
                      ) : (
                        ""
                      )}

                      {(ProfileSnageNow.TypProf === "teweve" &&
                        ProfileSnageNow.edartmaney == 1) ||
                      ProfileSnageNow.TypProf === "bss" ? (
                        <Link
                          to="/Financial-Management"
                          aria-disabled={typeactive === "Edartmaney"}
                          aria-hidden
                          className={`nav-link ${
                            typeactive === "Edartmaney" ? "active" : ""
                          }`}
                        >
                          <span className="nav-icon">
                            <CreditScoreIcon
                              className="iconShwStyle"
                            />
                          </span>
                          <span className="nav-text">إدارة المالية</span>
                        </Link>
                      ) : (
                        ""
                      )}

                      {ProfileSnageNow.TypProf === "bss" ? (
                        <>
                          <Link
                            to="/Categories-Management"
                            aria-disabled={typeactive === "category"}
                            aria-hidden
                            className={`nav-link ${
                              typeactive === "category" ? "active" : ""
                            }`}
                          >
                            <span className="nav-icon">
                              <CategoryIcon
                                className="iconShwStyle"
                              />
                            </span>
                            <span className="nav-text">إدارة التصنيفات</span>
                          </Link>

                          <Link
                            to="/Products-Management"
                            aria-disabled={typeactive === "EdartProdects"}
                            aria-hidden
                            className={`nav-link ${
                              typeactive === "EdartProdects" ? "active" : ""
                            }`}
                          >
                            <span className="nav-icon">
                              <FaBoxes
                                className="iconShwStyle"
                              />
                            </span>
                            <span className="nav-text">إدارة المنتجات</span>
                          </Link>

                          <Link
                            to="/Employees-Management"
                            aria-disabled={typeactive === "edartmewevs"}
                            aria-hidden
                            className={`nav-link ${
                              typeactive === "edartmewevs" ? "active" : ""
                            }`}
                          >
                            <span className="nav-icon">
                              <FiUserPlus
                                className="iconShwStyle"
                              />
                            </span>
                            <span className="nav-text">إدارة الموظفين</span>
                          </Link>
                          <Link
                            to="/Customers-Management"
                            aria-disabled={typeactive === "Edartzebayn"}
                            aria-hidden
                            className={`nav-link ${
                              typeactive === "Edartzebayn" ? "active" : ""
                            }`}
                          >
                            <span className="nav-icon">
                              <PeopleIcon
                                className="iconShwStyle"
                              />
                            </span>
                            <span className="nav-text">إدارة الزباين</span>
                          </Link>

                          <Link
                            to="/Payment-Settings-Management"
                            aria-disabled={typeactive === "Edartpaymentmethods"}
                            aria-hidden
                            className={`nav-link ${
                              typeactive === "Edartpaymentmethods"
                                ? "active"
                                : ""
                            }`}
                          >
                            <span className="nav-icon">
                              <CurrencyExchangeIcon
                                className="iconShwStyle"
                              />
                            </span>
                            <span className="nav-text">إدارة الدفع</span>
                          </Link>
                        </>
                      ) : (
                        ""
                      )}
                    </div>

                    {ProfileSnageNow.TypProf === "bss" ? (
                      <div className="nav-section">
                        <h4>التقارير</h4>
                        <a href="#reports" className="nav-link">
                          <span className="nav-icon">📊</span>
                          <span className="nav-text">
                            التقارير المالية (TM)
                          </span>
                        </a>
                        <a href="#analytics" className="nav-link">
                          <span className="nav-icon">📈</span>
                          <span className="nav-text">التحليلات (TM)</span>
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <></>
                )}

                {token ? (
                  <div className="nav-section">
                    <h4>الخدمات العامة</h4>
                    {ProfileSnageNow.TypProf === "user" ? (
                      <>
                        <Link
                          to="/dashboard"
                          aria-disabled={typeactive === "Dashboardt"}
                          className={`nav-link ${
                            typeactive === "Dashboardt" ? "active" : ""
                          }`}
                        >
                          <span className="nav-icon">
                            <DashboardIcon
                              className="iconShwStyle"
                            />
                          </span>
                          <span className="nav-text">لوحة التحكم رئيسية</span>
                        </Link>
                        <Link
                          to="/Order-Management"
                          aria-disabled={typeactive === "Edartorders"}
                          className={`nav-link ${
                            typeactive === "Edartorders" ? "active" : ""
                          }`}
                        >
                          <span className="nav-icon">
                            <AddShoppingCartIcon
                              className="iconShwStyle"
                            />
                          </span>
                          <span className="nav-text">طلبياتي</span>
                        </Link>
                      </>
                    ) : (
                      <></>
                    )}
                    <Link
                      to="/All-Message"
                      aria-disabled={typeactive === "Message"}
                      className={`nav-link ${
                        typeactive === "Message" ? "active" : ""
                      }`}
                    >
                      <span className="nav-icon">
                        <LocalPostOfficeIcon
                          className="iconShwStyle"
                        />
                      </span>
                      <span className="nav-text">لبريد الاشعارات </span>
                    </Link>

                    {ProfileSnageNow.TypProf != "teweve" ?
                    <>
                    <Link
                      aria-disabled={typeactive === "Message"}
                      className={`nav-link`}
                    >
                      <span className="nav-icon">
                        <FaGem
                          className="iconShwStyle"
                        />
                      </span>
                      <span className="nav-text">
                        { ProfileSnageNow.TypProf === "user" ?
                          'المشتريات و الاشتراكات (TM)' :
                          "الادارة الاشتراكات (TM)"
                        }
                      </span>
                    </Link>
                    <Link
                      aria-disabled={typeactive === "Message"}
                      className={`nav-link`}
                    >
                      <span className="nav-icon">
                        <SupportAgentIcon
                          className="iconShwStyle"
                        />
                      </span>
                      <span className="nav-text">
                        { ProfileSnageNow.TypProf === "bss" ?
                          'الدعم و تواصل (TM)' :
                          "طلب الدعم (TM)"
                        }
                      </span>
                    </Link>
                    </>
                    : ''}
                  </div>
                ) : (
                  ""
                )}

                <div className="nav-section">
                  <h4>الحساب</h4>
                  {ProfileSnageNow.TypProf === "teweve" ? (
                    ""
                  ) : (
                    <>
                      <Link
                        to="/user-profile"
                        aria-disabled={typeactive === "profile"}
                        className={`nav-link ${
                          typeactive === "profile" ? "active" : ""
                        }`}
                      >
                        <span className="nav-icon">
                          <PersonPinIcon
                            className="iconShwStyle"
                          />
                        </span>
                        <span className="nav-text">الملف الشخصي</span>
                        {/* </a> */}
                      </Link>
                      <Link
                        to="/User-Settings"
                        aria-disabled={typeactive === "profilesettings"}
                        className={`nav-link ${
                          typeactive === "profilesettings" ? "active" : ""
                        }`}
                      >
                        <span className="nav-icon">
                          <ManageAccountsIcon 
                            className="iconShwStyle"
                          />
                        </span>
                        <span className="nav-text">الإعدادات</span>
                      </Link>
                    </>
                  )}
                  <button className="nav-link" onClick={HandelSendSowProfile}>
                    <span className="nav-icon">
                      <MdSwitchAccount
                        className="iconShwStyle"
                      />
                    </span>
                    <span className="nav-text">الاستبدال بين الجسابات</span>
                  </button>
                  {/* {AllsDataUserNow.Profile_Bss.length > 1 || AllsDataUserNow.Profile_tweve.length > 1 ?
                  : ""} */}
                  <button
                    className="nav-link logout-btn"
                    onClick={handleLogout}
                  >
                    <span className="nav-icon">
                      <LogoutIcon className="iconShwStyleDanger"  />
                    </span>
                    <span className="nav-text">تسجيل الخروج</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            //   إذا كان المستخدم غير مسجل
            <div className="guest-nav">
              <div className="nav-logo">
                <div className="logo-icon">NBM</div>
                <h2>NBMstoreG</h2>
              </div>

              <div className="nav-links">
                <a href="#home" className="nav-link" onClick={closeNav}>
                  <span className="nav-icon">
                    <HomeIcon className="stycoloandsizeivonnv iconShwStyle" />
                  </span>
                  <span className="nav-text">الصفحة الرئيسية</span>
                </a>
                <a href="#why-us" className="nav-link" onClick={closeNav}>
                  <span className="nav-icon">
                    <FaBullseye className="stycoloandsizeivonnv" />
                  </span>
                  <span className="nav-text">لماذا نحن</span>
                </a>
                <a href="#services" className="nav-link" onClick={closeNav}>
                  <span className="nav-icon">
                    <FaConciergeBell
                      className="stycoloandsizeivonnv"
                    />
                  </span>
                  <span className="nav-text">خدماتنا</span>
                </a>
                <a href="#pricing" className="nav-link" onClick={closeNav}>
                  <span className="nav-icon">
                    <FaGem className="stycoloandsizeivonnv" />
                  </span>
                  <span className="nav-text">الباقات</span>
                </a>
                <a href="#faq" className="nav-link" onClick={closeNav}>
                  <span className="nav-icon">
                    <QuizIcon
                      className="stycoloandsizeivonnv iconShwStyle"
                    />
                  </span>
                  <span className="nav-text">أسئلة شائعة</span>
                </a>
              </div>

              <div className="nav-actions">
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <button className="login-btn">تسجيل الدخول</button>
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <button className="signup-btn">إنشاء حساب</button>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    );
  }
};

export default Navigation;
