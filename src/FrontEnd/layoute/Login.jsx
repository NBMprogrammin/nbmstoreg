import React, { useState, useRef } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { startloginformyaccountenow } from "../../allsliceproj/Controller Data Profile Now/controolerdataprodfilenowSlice";
import { useSelector, useDispatch } from "react-redux";
import { useDialogActionContext } from "../Context/DialogActionContext";
import Cookies from "js-cookie";
import { useNavigation } from "../hooks/useNavigation";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Lock,
  Person
} from "@mui/icons-material";
import { GeneralUrlGetDatabase } from "../Commponent/GeneralUrlGetDatabase";
import axios from "axios";

let TypActionDoNow = "";


const Login = () => {
  
  const loginData = useRef({
    username: "",
    password: "",
  });
  
  const rememberMe = useRef(false);

  const handleRememberChange = (e) => {
    rememberMe.current = e.target.checked;
  };

  const errors = useRef({});

  const isLoading = useRef(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatsh = useDispatch();
  const { OpenDialogForActionFound } = useDialogActionContext();

  // Start Get Alls Data To Do Semthong In The Page Form Slice Controller
  const resultrquestaction = useSelector((state) => {
    return state.datauser.resultrquestaction;
  });

  const lodingtorspact = useSelector((state) => {
    return state.datauser.lodingtorspact;
  });

  const typeRequestRsp = useSelector((state) => {
    return state.datauser.typRequestNow;
  });
  //== End Get Alls Data To Do Semthong In The Page Form Slice Controller ==//

  const navigate = useNavigate();

  // Start Her To Sheck loding Response
  React.useEffect(() => {
    TypActionDoNow = resultrquestaction;
  }, [resultrquestaction]); // End Her To Sheck loding Response

  React.useEffect(() => {
    const checkAuthentication = () => {
      const tokenFoul = Cookies.get("token");
      if (tokenFoul) {
        // إعادة التوجيه بدون إعادة تحميل
        navigate("/dashboard");
        return;
      }
      TypActionDoNow = '';
    };
    
    checkAuthentication();
  }, [navigate === "/login"]);

  // Start Here To Get Sult For Semthing Request In Page
  React.useEffect(() => {
    switch (typeRequestRsp) {
      case "startactiontologinmyaccountenow":
        switch (TypActionDoNow) {
          case 1:
            TypActionDoNow = "";
            navigate("/dashboard");
          return;
          case 2:
            isLoading.current = false;
            TypActionDoNow = "";
            OpenDialogForActionFound(
              `الكلمة السر او لبريد لاكتروني او رقم هاتف غير صحيحة حارل مرة اخرى`
            );
          return;
          case 99:
            TypActionDoNow = "";
            isLoading.current = false;
            OpenDialogForActionFound(
                "حدث خطا فشكة او لمزود لخدمة حاول في وقت لاحق او قم بتحميل صفحة"
            );
          return;
        }
      return;
    }
  }, [
    resultrquestaction,
    typeRequestRsp === "startactiontologinmyaccountenow",
  ]); //== End Here To Get Sult For Semthing Request In Page ==//

  // Start Her Validate Data After Do Semthing Action
  const validateForm = () => {
    const newErrors = {};
    if (!loginData.current.username) {
      newErrors.username = "البريد الإلكتروني أو رقم الهاتف مطلوب";
    }

    if (!loginData.current.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (loginData.current.password.length < 5) {
      newErrors.password = "كلمة المرور يجب أن تكون 5 أحرف على الأقل";
    }

    errors.current = newErrors;
    
    // 🔒 إعادة تصيير يدوي لعرض الأخطاء
    document.querySelectorAll('.error').forEach(el => el.remove());
    
    if (Object.keys(newErrors).length > 0) {
      Object.entries(newErrors).forEach(([field, message]) => {
        if (message) {
          const input = document.querySelector(`[name="${field}"]`);
          if (input) {
            input.classList.add('input-error');
            const errorDiv = document.getElementById(`error${field}`);
            errorDiv.textContent = message;
          }
        }
      });
    }

    return Object.keys(newErrors).length === 0;
  }; //== End Her Validate Data After Do Semthing Action ==//

  // Start Her Validate Value Inpute Is Corecte Or Nate To Do Action
  const VidAutErrorDoNot = (input) => {
    const newErrors = {};
    if (!loginData.current.username) {
      newErrors.username = '';
    }

    if (!loginData.current.password) {
      newErrors.password = "";
    } else if (loginData.current.password.length < 5) {
      newErrors.password = "";
    }

    errors.current = newErrors;
    
    // 🔒 إعادة تصيير يدوي لعرض الأخطاء
    document.querySelectorAll('.error').forEach(el => el.remove());
    
    if (Object.keys(newErrors).length > 0) {
      Object.entries(newErrors).forEach(([field, message]) => {
        if (message) {
          if (input) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error';
            errorDiv.textContent = message;
            errorDiv.style.color = 'red';
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
            input.classList.remove('input-error');
          }
        }
      });
    }

    return Object.keys(newErrors).length === 0;
  }; //== End Her Validate Data After Do Semthing Action ==//

  // Start Action To Shange Vlaue Inpute For Name
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    loginData.current = {
      ...loginData.current,
      [name]: value
    };


    // 🔒 إزالة الخطأ بدون إعادة تصيير
    if (errors.current[name]) {
      const input = document.querySelector(`[name="${name}"]`);
      VidAutErrorDoNot(input);
      // const input = document.querySelector(`[name="${name}"]`);
      if (input) {
        input.classList.remove('input-error');
        const errorDiv = document.getElementById(`error${name}`);
        errorDiv.textContent = ' ';
      }
    }
  }; //== End Action To Shange Vlaue Inpute For Name ==//

  // Start Start To Send Request For Login My Accounte
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    isLoading.current = true;
    const data = {
      email: loginData.current.username,
      password: loginData.current.password,
    };
    dispatsh(startloginformyaccountenow(data));

  }; //== End Start To Send Request For Login My Accounte ==//

  return (
    <div className="login-container">
      {/* خلفية متحركة */}
      <div className="animated-background">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="floating-circle circle-4"></div>
        <div className="floating-circle circle-5"></div>
      </div>

      {/* البطاقة الرئيسية */}
      <div className="login-center-card">
        <div className="card-header">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link
              to="/home"
              style={{ textDecoration: "none", width: "fit-content" }}
            >
              <div className="logo-main">
                <div className="logo-icon-main">
                  <span>nbm</span>
                </div>
                <h1>NBMstoreG</h1>
              </div>
            </Link>
          </div>

          <h2>تسجيل الدخول</h2>
          <p style={{ color: '#ffffffaa' }}>أدخل بياناتك للوصول إلى حسابك</p>
        </div>

        <form className="login-form-main" onSubmit={handleSubmit}>

          <div className='stlinpandlableisnace' >
            <label>البريد الإلكتروني أو رقم الهاتف</label>
            <TextField
              fullWidth
              name="username"
              // className={"fontsize25"}
              value={loginData.username}
              style={{ fontSize: "25px", direction: 'rtl' }}
              onChange={handleInputChange}
              placeholder="example@email.com أو XXXXXXXX"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
              className={" inptstlegod"}
            />
            <Typography variant="caption" id='errorusername' textAlign={'center'} color="error"></Typography>
          </div>

          <div className='stlinpandlableisnace' >
            <label>كلمة المرور</label>
            <TextField
              fullWidth
              name="password"
              type={showPassword ? "text" : "password"}
              style={{ fontSize: "25px", direction: 'rtl' }}
              value={loginData.password}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }} //fontsize25
              className={"inptstlegod"}
            />
            <Typography variant="caption" id='errorpassword' textAlign={'center'} color="error"></Typography>
          </div>

          <div className="form-options-main">
            <Link to="/user-ForgotPassword" style={{ textDecoration: "none", color: '#fff' }} className="forgot-link">
                نسيت كلمة المرور؟
            </Link>
          </div>

          <button type="submit" className="btnLog" disabled={isLoading.current}>
            {isLoading.current ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <div className="btn-spinner"></div>
                جاري تسجيل الدخول
              </div>
            ) : (
              "تسجيل الدخول"
            )}
          </button>
        </form>

        <div className="signup-link">
          <p>ليس لديك حساب؟</p>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <button className="signup-btn-link">
              إنشاء حساب جديد
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
