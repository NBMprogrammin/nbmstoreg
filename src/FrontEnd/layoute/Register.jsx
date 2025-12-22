import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Register.css";
import dayjs from "dayjs";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Alert,
  Box,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Phone,
  LocationOn,
  Home,
  Lock,
  Flag,
  CameraAlt,
  Close,
} from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { useDialogActionContext } from "../Context/DialogActionContext";
import {
  starttocreatenewaccounteforuser,
  stratesendtoconfiremdemailaftercreateacounte,
} from "../../allsliceproj/Controller Data Profile Now/controolerdataprodfilenowSlice";
import Cookies from "js-cookie";
import InputeForDataAndTime from "../Commponent/inpute and from/InputeForDataAndTime";
import CountryInput from "../Commponent/CantryInput";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FaceIcon from '@mui/icons-material/Face';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

let typRequest = "";

// Start Here Alls Cantry Sobore Now
const arabCountries = [
  {
    id: 1,
    code: "SA",
    nameOne: "المملكة العربية السعودية",
    dialCode: "+966",
    TypeData: 'categorys',
  },
  {
    id: 2,
    code: "AE",
    nameOne: "الإمارات العربية المتحدة",
    dialCode: "+971",
    TypeData: 'categorys',
  },
  { id: 3, code: "BH", nameOne: "البحرين", dialCode: "+973", TypeData: 'categorys', },
  { id: 4, code: "DZ", nameOne: "الجزائر", dialCode: "+213", TypeData: 'categorys', },
  { id: 5, code: "EG", nameOne: "مصر", dialCode: "+20", TypeData: 'categorys', },
  { id: 6, code: "IQ", nameOne: "العراق", dialCode: "+964", TypeData: 'categorys', },
  { id: 7, code: "JO", nameOne: "الأردن", dialCode: "+962", TypeData: 'categorys', },
  { id: 8, code: "KW", nameOne: "الكويت", dialCode: "+965", TypeData: 'categorys', },
  { id: 9, code: "LB", nameOne: "لبنان", dialCode: "+961", TypeData: 'categorys', },
  { id: 10, code: "LY", nameOne: "ليبيا", dialCode: "+218", TypeData: 'categorys', },
  { id: 11, code: "MA", nameOne: "المغرب", dialCode: "+212", TypeData: 'categorys', },
  { id: 12, code: "MR", nameOne: "موريتانيا", dialCode: "+222", TypeData: 'categorys', },
  { id: 13, code: "OM", nameOne: "عمان", dialCode: "+968", TypeData: 'categorys', },
  { id: 14, code: "PS", nameOne: "فلسطين", dialCode: "+970", TypeData: 'categorys', },
  { id: 15, code: "QA", nameOne: "قطر", dialCode: "+974", TypeData: 'categorys', },
  { id: 16, code: "SY", nameOne: "سوريا", dialCode: "+963", TypeData: 'categorys', },
  { id: 17, code: "TN", nameOne: "تونس", dialCode: "+216", TypeData: 'categorys', },
  { id: 18, code: "YE", nameOne: "اليمن", dialCode: "+967", TypeData: 'categorys', },
]; //== End Here Alls Cantry Sobore Now ==//

// Start Here Type Gender User
const typeGenderUserNow = [
  {
    id: 1,
    code: "MN",
    nameOne: "الذكر",
    dialCode: "1",
    TypeData: 'noimg',
    image: <AccountCircleIcon style={{ width: '40px', height: '40px' }} />
  },
  {
    id: 2,
    code: "WN",
    nameOne: "امرة",
    dialCode: "2",
    TypeData: 'noimg',
    image: <FaceIcon style={{ width: '40px', height: '40px' }} />
  },
]; //== End Here Type Gender User ==//

// الامتدادات المسموح بها
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", '.png', ".webp"];

const Register = () => {
  const navigate = useNavigate();

  const signupData = useRef({
    firstName: "",
    phone: "",
    country: "",
    typegender: "",
    city: "",
    datatime: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    email: "",
  });

  useEffect(() => {
    const checkAuthentication = () => {
      const token = Cookies.get("token");
      if (token) {
        // إعادة التوجيه بدون إعادة تحميل
        navigate("/dashboard");
        return;
      }
      typRequest = "";
    };
    checkAuthentication();
  }, [navigate === "/register"]);
  
  const errors = useRef();

  const isLoading = useRef(false);
  const [imgprofuser, setiMgprofuser] = useState(false);
  const imagePreview = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [codeCantry, setCodeCantry] = useState('');
  
  // حالات جديدة للتحقق عبر البريد
  const verificationStep = useRef('signup');
  // const TypeToRegisterAcnt = useRef(1);
  const verificationCode = useRef('');
  const [resendTimer, setResendTimer] = useState(0);
  const [typeToRegisterAcnt, setTypeToRegisterAcnt] = useState(1);
  
  const selectedDate = useRef(dayjs(""));

  // Start Here Shange Value Data Of Birth For User
  const handleDateChange = (newValue) => {
    selectedDate.current = newValue;
    
    if (newValue) {
      const age = dayjs().diff(newValue, "year");
      const newErrors = {};
      const errorDiv = document.getElementById("errordatatime");
      if (age < 15) {
        // تنبيه الكونسول عندما يكون العمر أقل من 15
        errorDiv.textContent = `🚨 تنبيه! العمر أقل من 15 سنة: ${age} + سنة`;
        newErrors.datatime = `🚨 تنبيه! العمر أقل من 15 سنة: ${age} + سنة`;
      } else {
        errorDiv.textContent = " ";
        newErrors.datatime = " ";
      }

      errors.current = newErrors;
      return Object.keys(newErrors).length === 0;
    }
  }; // End Here Shange Value Data Of Birth For User ==//

  // دالة للتحقق من امتداد الملف
  const isValidFileExtension = (filename) => {
    const extension = filename
      .toLowerCase()
      .substring(filename.lastIndexOf("."));
    return ALLOWED_EXTENSIONS.includes(extension);
  }

  const dispatsh = useDispatch();
  const {
    OpenDialogForActionFound,
    OpenDialogForActionSuccess,
    HandleCloseOrOpenReadinPage,
  } = useDialogActionContext();

  // Start Get Alls Data To Do Semthong In The Page Form Slice Controller
  const lodingtorspact = useSelector((state) => {
    return state.datauser.lodingtorspact;
  });

  const resultrquestaction = useSelector((state) => {
    return state.datauser.resultrquestaction;
  });

  const typlogoutaccount = useSelector((state) => {
    return state.datauser.typlogoutaccount;
  });

  const typeRequestRsp = useSelector((state) => {
    return state.datauser.typRequestNow;
  });
  //== End Get Alls Data To Do Semthong In The Page Form Slice Controller ==//

  // Start Her To Shange Value typRequest To Do Action
  React.useEffect(() => {
    if (lodingtorspact === true) {
      typRequest = typeRequestRsp;
    }
  }, [lodingtorspact]); // End Her To Shange Value typRequest To Do Action

  // Start Here Change Value Cantry User Now
  const HandleCantryFoMyAcounte = (val) => {
    signupData.current.country = val;
    setCodeCantry(val.dialCode);
    if (errors.country != '' || errors.country != undefined ) {
      const input = document.querySelector(`[name="country"]`);
      if (input) {
        const errorDiv = document.getElementById(`errorcountry`);
        errorDiv.textContent = ' ';
      }
      errors.current = {
        ...errors.current,
        country: ''
      };
    }
  } //== End Here Change Value Cantry User Now ==//

  // Start Here Change Type Gender User Now
  const HandleTypeGenderUser = (val) => {
    signupData.current.typegender = val;
    if (errors.typegender != '' || errors.typegender != undefined ) {
      const input = document.querySelector(`[name="typegender"]`);
      if (input) {
        const errorDiv = document.getElementById(`errortypegender`);
        errorDiv.textContent = ' ';
      }
      errors.current = {
        ...errors.current,
        typegender: ''
      };
    }
  } //== End Here Change Type Gender User Now ==//

  // Start Here To Get Sult For Semthing Request In Page
  React.useEffect(() => {
    if (typRequest === "starttosendconfirmedemailaftercreateacounte") {
      if (resultrquestaction === 1) {
        verificationStep.current = 'verification';
        isLoading.current = false;
        startResendTimer();
      } else if (resultrquestaction === 2) {
        isLoading.current = false;
        OpenDialogForActionFound(
          "يبدو بان البريد الاكتروني مسجل بلفعل من قبل يمكنك تسجيل لدخول"
        );
        setTypeToRegisterAcnt(1);
      } else if (resultrquestaction === 3) {
        isLoading.current = false;
        OpenDialogForActionFound(
          "يبدو بان الرقم الهاتف مسجل بلفعل من قبل يمكنك تسجيل لدخول"
        );
        setTypeToRegisterAcnt(2);
      } else if (resultrquestaction === 3) {
        isLoading.current = false;
        OpenDialogForActionFound(
          "حدث خطا فشل ارسال لكود للبريدك الاكتروني رجا تاكد من لبيانات و حاول مرة اخرى"
        );
        setTypeToRegisterAcnt(1);
      } else if (resultrquestaction === 99) {
        isLoading.current = false;
        verificationStep.current = '';
        setTypeToRegisterAcnt(1);
        OpenDialogForActionFound(
          "حدث خطا فشكة او لمزود لخدمة حاول في وقت لاحق"
        );
      }
    } else if (typRequest === "starttocreatenewaccounteforuser") {
      if (resultrquestaction === 2) {
        isLoading.current = false;
        verificationStep.current = 'signup';
        OpenDialogForActionFound(
          "يبدو بان البريد الاكتروني مسجل بلفعل من قبل يمكنك تسجيل لدخول"
        );
        setTypeToRegisterAcnt(1);
      } else if (resultrquestaction === 3) {
        isLoading.current = false;
        setTypeToRegisterAcnt(2);
        OpenDialogForActionFound(
          "يبدو بان الرقم الهاتف مسجل بلفعل من قبل يمكنك تسجيل لدخول"
        );
      } else if (resultrquestaction === 4) {
        isLoading.current = false;
        OpenDialogForActionFound("الرمز غير صحيح أو منتهي الصلاحية");
      } else if (resultrquestaction === 1) {
        navigate("/dashboard");
      } else if (resultrquestaction === 6) {
        isLoading.current = false;
        verificationStep.current = 'signup';
        setTypeToRegisterAcnt(1)
        OpenDialogForActionFound(
          "حدث خطا فلشبكة اثناء انشاء حسابك قم بتحميل صفحة و حاول مرة اخرى"
        );
      } else if (resultrquestaction === 99) {
        isLoading.current = false;
        verificationStep.current = '';
        OpenDialogForActionFound(
          "حدث خطا فشكة او لمزود لخدمة حاول في وقت لاحق"
        );
      }
    }
  }, [
    resultrquestaction,
    typeRequestRsp === "starttosendconfirmedemailaftercreateacounte",
    typeRequestRsp === "starttocreatenewaccounteforuser",
  ]); //== End Here To Get Sult For Semthing Request In Page ==//

  // Start Here Change Vlaue Alls Inpute
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    signupData.current[name] = value;

    if (errors.current[name] != '' && errors.current[name] != undefined ) {
      const input = document.querySelector(`[name="${name}"]`);
      if (input) {
        input.classList.remove('input-error');
        const errorDiv = document.getElementById(`error${name}`);
        errorDiv.textContent = ' ';
      }
      errors.current = {
        ...errors.current,
        [name]: ''
      };
    }
  }; //== End Here Change Vlaue Alls Inpute ==//

  // Start Change Value Image Profile User
  const handleImageChange = (e) => {
    const { name, value } = e.target;
    const file = e.target.files[0];
    if (file) {
      const newErrors = {};
      const input = document.querySelector(`[name="${name}"]`);
      if (file.size > 5 * 1024 * 1024) {
        if (input) {
          const errorDiv = document.getElementById(`error${name}`);
          errorDiv.textContent = "حجم الصورة يجب أن يكون أقل من 5MB";
        }
        return;
      }

      if (!file.type.startsWith("image/")) {
        if (input) {
          const errorDiv = document.getElementById(`error${name}`);
          errorDiv.textContent = "الملف يجب أن يكون صورة";
        }
        return;
      }

      // تحقق إضافي قبل الرفع
      if (!isValidFileExtension(file.name)) {
        if (input) {
          const errorDiv = document.getElementById(`error${name}`);
          errorDiv.textContent = "❌ يجب ان تكون صورة من احد انواع تالية jpeg او webp او png او jpg";
        }
        return;
      }
    
      newErrors.profileImage = file;
      errors.current = newErrors;
      
      const errorDiv = document.getElementById(`error${name}`);
        errorDiv.textContent = " ";
      errors.current = {
        ...errors.current,
        profileImage: ""
      };
      imagePreview.current = file;
      const reader = new FileReader();
      reader.onload = (e) =>  setiMgprofuser(e.target.result);
      reader.readAsDataURL(file);
    }
  }; //== End Change Value Image Profile User ==//

  // Start Validate Data After Send Request To Do Semthing Action
  const validateForm = () => {
    const newErrors = {};
    
    if(typeToRegisterAcnt === 1) {
      if (signupData.current.firstName.length >= 100)
        newErrors.firstName = "الاسم الأول مطلوب اقل من 100 حرف ";
      if (!signupData.current.firstName) newErrors.firstName = "الاسم الأول مطلوب";
  
      if (!signupData.current.email) {
        newErrors.email = "البريد الإلكتروني مطلوب";
      } else if (!/\S+@\S+\.\S+/.test(signupData.current.email)) {
        newErrors.email = "البريد الإلكتروني غير صالح";
      }
      if (!signupData.current.country) newErrors.country = "البلد مطلوب";
      if (Object.keys(newErrors).length == 0) setTypeToRegisterAcnt(2)
    } else if (typeToRegisterAcnt == 2) {
      if (!signupData.current.phone) {
        newErrors.phone = "رقم الهاتف مطلوب";
      } else if (!/^[0-9]+$/.test(signupData.current.phone)) {
        newErrors.phone = "رقم الهاتف يجب أن يحتوي على أرقام فقط";
      } else if (signupData.current.phone.length >= 15) {
        newErrors.phone = "رقم الهاتف يجب أن يحتوي بلكثير على 15 رقم";
      } else if (signupData.current.phone.length < 8) {
        newErrors.phone = "رقم الهاتف يجب ان يحتوي على الاقل 8 ارقام";
      }

      if (!signupData.current.typegender) newErrors.typegender = "نوع الجنس مطلوب";

      if (signupData.current.city.length >= 100)
        newErrors.city = "المدينة مطلوبة اقل من 100 حرف";
      if (!signupData.current.city) newErrors.city = "المدينة مطلوبة";
      if (Object.keys(newErrors).length == 0) setTypeToRegisterAcnt(3)
    } else if(typeToRegisterAcnt == 3) {
      if (signupData.current.firstName.length >= 100)
        newErrors.firstName = "الاسم الأول مطلوب اقل من 100 حرف ";
      if (!signupData.current.firstName) newErrors.firstName = "الاسم الأول مطلوب";
  
      if (!signupData.current.email) {
        newErrors.email = "البريد الإلكتروني مطلوب";
      } else if (!/\S+@\S+\.\S+/.test(signupData.current.email)) {
        newErrors.email = "البريد الإلكتروني غير صالح";
      }
      if (!signupData.current.country) newErrors.country = "البلد مطلوب";
      if (!signupData.current.phone) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!/^[0-9]+$/.test(signupData.current.phone)) {
      newErrors.phone = "رقم الهاتف يجب أن يحتوي على أرقام فقط";
    } else if (signupData.current.phone.length >= 15) {
      newErrors.phone = "رقم الهاتف يجب أن يحتوي بلكثير على 15 رقم";
    } else if (signupData.current.phone.length < 8) {
      newErrors.phone = "رقم الهاتف يجب ان يحتوي على الاقل 8 ارقام";
    }

    if (!signupData.current.typegender) newErrors.typegender = "نوع الجنس مطلوب";

    if (signupData.current.city.length >= 100)
      newErrors.city = "المدينة مطلوبة اقل من 100 حرف";
    if (!signupData.current.city) newErrors.city = "المدينة مطلوبة";

    if (!selectedDate.current) newErrors.datatime = "اختيار تاريخ الميلاد مطلوب";

    const age = dayjs().diff(selectedDate.current, "year");
    if (age < 15) {
      newErrors.datatime = `🚨 تنبيه! العمر أقل من 15 سنة: ${age} + سنة`;
    }

    if (!signupData.current.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (signupData.current.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    if (!signupData.current.confirmPassword) {
      newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
    } else if (signupData.current.password !== signupData.current.confirmPassword) {
      newErrors.confirmPassword = "كلمة المرور غير متطابقة";
    }
      if (Object.keys(newErrors).length == 0) setTypeToRegisterAcnt(4)
    }
    
    errors.current = newErrors;

    if (Object.keys(newErrors).length > 0) {
      Object.entries(newErrors).forEach(([field, message]) => {
        if (message) {
          const input = document.querySelector(`[name="${field}"]`);
          if (input) {
            const errorDiv = document.getElementById(`error${field}`);
            errorDiv.textContent = message;
          }
        }
      });
    }
    return Object.keys(newErrors).length === 0;
  }; //== End Validate Data After Send Request To Do Semthing Action ==//

  // Start Validate Data And Send Request For verived Email User 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
  
    if(typeToRegisterAcnt === 4) {
      isLoading.current = true;

      const data = {
        email: signupData.current.email,
        phone: signupData.current.phone,
      };
      dispatsh(stratesendtoconfiremdemailaftercreateacounte(data));
    }
  }; //== End Validate Data And Send Request For verived Email User ==//

  // Start Here For Confirmed Time To Send Again Code Email 
  const startResendTimer = () => {
    setResendTimer(60); // 60 ثانية
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }; //== End Here For Confirmed Time To Send Again Code Email ==//

  // Start To Send Request For Send Code Verived Again Email User
  const handleResendCode = async () => {
    // إعادة إرسال الرمز
    startResendTimer();
    const data = {
      email: signupData.current.email,
      phone: signupData.current.phone,
    };
    verificationCode.current = '';
    dispatsh(stratesendtoconfiremdemailaftercreateacounte(data));
  }; //== End To Send Request For Send Code Verived Again Email User ==//

  // Start Here Send Request For Confirmed Code And Email To Create Accounte For User
  const handleVerifyCode = async () => {
    // التحقق من الرمز
    if (verificationCode.current.length === 6) {
      const data = {
        email: signupData.current.email,
        phone: signupData.current.phone,
        profileImage: imagePreview.current,
        firstName: signupData.current.firstName,
        country: signupData.current.country.nameOne,
        typeGender: signupData.current.typegender.dialCode,
        city: signupData.current.city,
        confirmPassword: signupData.current.confirmPassword,
        dialCode: signupData.current.country.dialCode,
        code: verificationCode.current,
        datatime: selectedDate.current,
      };
      isLoading.current = true;
      
      HandleCloseOrOpenReadinPage(true);
      dispatsh(starttocreatenewaccounteforuser(data));
    } else {
      errors.current = {
          ...errors.current,
          verification: "الرجاء إدخال رمز التحقق المكون من 6 أرقام" 
        };
    }
  }; //== End Here Send Request For Confirmed Code And Email To Create Accounte For User ==//

  // تصميم خطوة التسجيل
  const renderSignupStep = () => (
    <Card
      sx={{
        maxWidth: 500,
        width: "100%",
        mx: "auto",
        mt: 4,
        p: 1,
        boxShadow: 3,
        backgroundColor: '#ffffff2e',
        color: '#fff'
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <div className="card-header">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link
              to="/home"
              style={{ textDecoration: "none", width: "fit-content" }}
            >
              <div className="logo-main">
                <div className="logo-icon-main">
                  <span>NBM</span>
                </div>
                <h1>NBMstoreG</h1>
              </div>
            </Link>
          </div>

          <h2>إنشاء حساب جديد</h2>
          <p style={{ color: '#ffffffaa' }}>املأ المعلومات لإنشاء حسابك</p>
        </div>

        {/* رفع الصورة */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <div >
            <input
              name='profileImage'
              accept="image/*"
              style={{ display: "none" }}
              id="profile-image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <div className="stylimguserprogile">
            <label htmlFor="profile-image-upload">
              <IconButton component="span">
                <Avatar src={imgprofuser} sx={{ width: 100, height: 100 }}>
                  <CameraAlt />
                </Avatar>
              </IconButton>
            </label>
            </div>
          </div>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {imgprofuser ? "تغيير الصورة" : "رفع صورة الملف الشخصي"}
          </Typography>
          <Typography variant="caption" id='errorprofileImage' color="error"></Typography>
        </Box>

        <Box component="form" className='stylallinputeregister' onSubmit={handleSubmit}>
          
          {typeToRegisterAcnt === 1 ?
          <>
          {/* الاسم الأول */}
          <div className='stlinpandlableisnace' >
            <label>الاسم الأول</label>
            <TextField
              fullWidth
              name="firstName"
              style={{ fontSize: "25px", direction: 'rtl' }}
              value={signupData.firstName}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <Typography variant="caption" id='errorfirstName' textAlign={'center'} color="error"></Typography>
          </div>

          {/* البريد الإلكتروني */}
          <div className='stlinpandlableisnace' >
            <label>البريد الإلكتروني</label>
            <TextField
              fullWidth
              name="email"
              type="email"
              value={signupData.email}
              onChange={handleInputChange}
              style={{ fontSize: "25px", direction: 'rtl' }}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant="caption" id='erroremail' textAlign={'center'} color="error"></Typography>
          </div>

          {/* لبلد */}
          <div className='stlinpandlableisnace' >
            <label>البلد</label>
            <CountryInput
              name="country"
              TypeShowData={"Sereash"}
              ValueUserSeckeClick={HandleCantryFoMyAcounte}
              dataFeth={arabCountries}
              typShowImg={'icone'}
              style={{
                width: '50px',
                height: '50px',
                direction: 'rtl'
              }}
            />
            <Typography variant="caption" id='errorcountry' textAlign={'center'} color="error"></Typography>
          </div>
          </> : ""}

          {typeToRegisterAcnt === 2 ?
          <>
            {/* رقم الهاتف */}
            <div className='stlinpandlableisnace' >
              <label>رقم الهاتف</label>
              <TextField
                fullWidth
                name="phone"
                value={signupData.phone}
                onChange={handleInputChange}
                style={{ fontSize: "25px", direction: 'rtl' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {codeCantry}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <Typography variant="caption" id='errorphone' textAlign={'center'} color="error"></Typography>
            </div>

            {/* نوع الجنس */}
            <div className='stlinpandlableisnace' >
              <label>نوع الجنس</label>
              <CountryInput
                  name="typegender"
                  TypeShowData={"Sereash"}
                  ValueUserSeckeClick={HandleTypeGenderUser}
                  dataFeth={typeGenderUserNow}
                  typShowImg={'icone'}
                  style={{
                  width: '50px',
                  height: '50px', direction: 'rtl'
                  }}
              />
              <Typography variant="caption" id='errortypegender' textAlign={'center'} color="error"></Typography>
            </div>

              {/* المدينة */}
            <div className='stlinpandlableisnace' >
              <label>المدينة</label>
              <TextField
                fullWidth
                name="city"
                style={{ fontSize: "25px", direction: 'rtl' }}
                value={signupData.city}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <Typography variant="caption" id='errorcity' textAlign={'center'} color="error"></Typography>
            </div>
          </> : ''}

          {typeToRegisterAcnt === 3 || typeToRegisterAcnt === 4 ?
          <>
            {/* اختيار تاريخ لميلاد */}
            <div className='stlinpandlableisnace'>
              <label>تاريخ الميلاد</label>
              <InputeForDataAndTime
                style={{ direction: 'rtl'}}
                handleDateChange={handleDateChange}
                selectedDate={selectedDate.current}
              />
              <Typography variant="caption" id='errordatatime' textAlign={'center'} color="error"></Typography>
            </div>

              {/* كلمة المرور */}
            <div className='stlinpandlableisnace'>
              <label>كلمة المرور</label>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? "text" : "password"}
                style={{ fontSize: "25px", direction: 'rtl' }}
                value={signupData.password}
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
                sx={{ mb: 2 }}
              />
              <Typography variant="caption" id='errorpassword' textAlign={'center'} color="error"></Typography>
            </div>

              {/* تأكيد كلمة المرور */}
            <div className='stlinpandlableisnace'>
              <label>تأكيد كلمة المرور</label>
              <TextField
                fullWidth
                style={{ fontSize: "25px", direction: 'rtl' }}
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={signupData.confirmPassword}
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
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />
              <Typography variant="caption" id='errorconfirmPassword' textAlign={'center'} color="error"></Typography>
            </div>
          </>
           : ''}

          {/* زر الإنشاء */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading.current}
            sx={{ py: 1.5, color: '#fff' }}
            className='btnsubreg'
          >
            {isLoading.current ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <div className="btn-spinner"></div>
                جاري تسجيل الدخول
              </div>
            ) : (
              "إنشاء حساب"
            )}
          </Button>
        </Box>

        {/* رابط تسجيل الدخول */}
        <Box sx={{ textAlign: "center", }}>
          <Typography variant="body2">
            هل لديك حساب بالفعل؟{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button variant="text" target="_self" size="small" sx={{ border: '2px solid #fff', padding: '6px 8px', fontSize: '18px', borderRadius: '12px', color: '#fff'  }}>
                تسجيل الدخول
              </Button>
            </Link>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  // تصميم خطوة التحقق
  const renderVerificationStep = () => (
    <Dialog
      className={"Dialogcontentregister"}
      open={verificationStep.current === "verification"}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h6" align="center">
          التحقق من البريد الإلكتروني
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: "center", py: 2 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            تم إرسال رمز التحقق إلى بريدك الإلكتروني: {signupData.current.email}
          </Alert>

          <TextField
            fullWidth
            label="رمز التحقق"
            onChange={(e) => verificationCode.current = e.target.value}
            inputProps={{ maxLength: 6 }}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              onClick={handleResendCode}
              disabled={resendTimer > 0}
              variant="outlined"
            >
              إعادة الإرسال {resendTimer > 0 ? `(${resendTimer})` : ""}
            </Button>

            <Button
              onClick={handleVerifyCode}
              variant="contained"
              className={isLoading.current ? "dispbtn" : ""}
            >
              تأكيد
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="signup-container">
      {/* خلفية متحركة */}
      <div className="animated-background">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="floating-circle circle-4"></div>
        <div className="floating-circle circle-5"></div>
      </div>
      <Container className="contregis" component="main" maxWidth="sm">
        {renderSignupStep()}
        {renderVerificationStep()}
      </Container>
    </div>
  );
};

export default Register;
