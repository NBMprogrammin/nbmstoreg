import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Chip,
  Divider,
  Container,
  Stack,
  Badge,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CheckCircle,
  Cancel,
  ShoppingCart,
  Work,
  Notifications,
  Warning,
} from "@mui/icons-material";
import Header from "../layoute/Header";
import { useSelector, useDispatch } from "react-redux";
import AvatarImgForAllType from "../Commponent/AvatarImgForAllType";
import { ShowAllsMyMessage } from "../../allsliceproj/Message Alls User/MessageAllsUserSlice";
import { useDialogActionContext } from "../Context/DialogActionContext";
import TitelPage from "../Commponent/TitelPage";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { formatRelativeDate } from "../../utils/dateUtils";

// تنسيقات مخصصة
const MessageCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: "12px",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[3],
    transform: "translateY(-2px)",
  },
}));

const ActionButton = styled(Button)(({ theme, actiontype }) => ({
  borderRadius: "20px",
  textTransform: "none",
  fontWeight: "bold",
  marginLeft: theme.spacing(1),
  ...(actiontype === "accept" && {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  }),
  ...(actiontype === "reject" && {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  }),
}));

let typeShowDataNow = "Show";
let typRequest = "";
let datuserClick = "";
let typActionrespNoew = "";

const Messages = () => {
  const {
    TypeAlearVipNow,
    OpenDialogForActionFound,
    HandleCloseOrOpenReadinPage,
    OpenDialogForActionSuccess,
  } = useDialogActionContext();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [loadingmoredata, setLoadinggmoredata] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const dispatsh = useDispatch();

  // Start Get Alls Data To Do Semthong In The Page Form Slice Controller
  const returndata = useSelector((state) => {
    return state.MessageAllsUser.data;
  });

  const leadingtable = useSelector((state) => {
    return state.MessageAllsUser.isLinding;
  });

  const currentpagenow = useSelector((state) => {
    return state.MessageAllsUser.pagenow;
  });

  const last_page = useSelector((state) => {
    return state.MessageAllsUser.last_page;
  });

  const resultrquestaction = useSelector((state) => {
    return state.MessageAllsUser.resultrquestaction;
  });

  const typRequestNow = useSelector((state) => {
    return state.MessageAllsUser.typRequestNow;
  });

  const lodingtorspact = useSelector((state) => {
    return state.MessageAllsUser.lodingtorspact;
  });
  // End Get Alls Data To Do Semthong In The Page Form Slice Controller ==//

  const ProfileSnageNow = useSelector((state) => {
    return state.datauser.ProfileSnageNow;
  });

  useEffect(() => {
    const checkAuthentication = () => {
      const token = Cookies.get("token");
      if (!token) {
        // إعادة التوجيه بدون إعادة تحميل
        navigate("/home");
        return;
      }
    };
    checkAuthentication();
  }, [navigate === "User-Settings", ProfileSnageNow]);

  // Start Her To Sheck loding Response
  React.useEffect(() => {
    if (lodingtorspact === true) {
      typRequest = typRequestNow;
      HandleCloseOrOpenReadinPage(true);
    } else {
      HandleCloseOrOpenReadinPage(false);
    }
  }, [lodingtorspact]); // End Her To Sheck loding Response

  // Start Her To Sheck loding Response
  React.useEffect(() => {
    if (leadingtable === true) {
      if (typeShowDataNow === "More") {
        setLoadinggmoredata(true);
      } else {
        setLoading(true);
      }
    } else {
      setLoadinggmoredata(false);
      setLoading(false);
    }
  }, [leadingtable]); //== End Her To Sheck loding Response == //

  // Start Sheck Type Request To Show Result For User
  React.useMemo(() => {
    if(typRequest === "Show") {
      if (resultrquestaction === 99) {
        typRequest = "Show";
        OpenDialogForActionFound(
          "حدث خطا فشكة او لمزود لخدمة حاول في وقت لاحق او قم بتحميل صفحة"
        );
        navigate("/dashboard");
      }
    } else if (typRequest === "StartConfirmedaddMyZeboun") {
      typRequest = typActionrespNoew;
      if (resultrquestaction === 1) {
        OpenDialogForActionSuccess(
          `لقد تم موافق على تكوين علاقة زبائنية بنجاح لذا يمكنك انشاء طلبياتك مع تاجر الان كما تم تحديث لبيانات ${datuserClick.NameUserSendMessage} بنجاح `
        );
      } else if (resultrquestaction === 3) {
        OpenDialogForActionFound(
          `سبق و ان وافق على تكوين علاقة زبائنية كما تم تحديث لبيانات ${datuserClick.NameUserSendMessage} بنجاح `
        );
      } else if (resultrquestaction === 4) {
        OpenDialogForActionFound(
          `سبق و ان رفضت على تكوين علاقة زبائنية كما تم تحديث لبيانات ${datuserClick.NameUserSendMessage} بنجاح `
        );
      } else if (resultrquestaction === 2) {
        OpenDialogForActionFound(
          "حدث خطا اثناء تفاعلك مع رسالة ربما رسالة غير موجود او خطا فلشكبة حاول مرة اخرى كما تم تحديث لبيانات"
        );
      } else if (resultrquestaction === 6) {
        OpenDialogForActionFound(
          "يبدو بانك سجلت الخروج من حسابك او تم تغييره سيتم تحميل صفحة و اظهار تحديث",
          "active"
        );
        setTimeout(() => {
          window.location.reload();
        }, 3500);
      } else if (resultrquestaction === 99) {
        OpenDialogForActionFound(
          "حدث خطا فشكة او لمزود لخدمة حاول في وقت لاحق او قم بتحميل صفحة"
        );
      }
    } else if (typRequest === "StartDscConfirmedaddMyZeboun") {
      HandleCloseOrOpenReadinPage(false);
      typRequest = typActionrespNoew;
      if (resultrquestaction === 1) {
        OpenDialogForActionSuccess(
          `لقد تم رفض تكوين علاقة زبائنية بنجاح كما تم تحديث لبيانات ${datuserClick.NameUserSendMessage} `
        );
      } else if (resultrquestaction === 3) {
        OpenDialogForActionFound(
          `سبق و ان وافق على تكوين علاقة زبائنية كما تم تحديث لبيانات ${datuserClick.NameUserSendMessage} بنجاح `
        );
      } else if (resultrquestaction === 4) {
        OpenDialogForActionFound(
          `سبق و ان رفضت على تكوين علاقة زبائنية كما تم تحديث لبيانات ${datuserClick.NameUserSendMessage} بنجاح `
        );
      } else if (resultrquestaction === 2) {
        OpenDialogForActionFound(
          "حدث خطا اثناء تفاعلك مع رسالة ربما رسالة غير موجود او خطا فلشكبة حاول مرة اخرى كما تم تحديث لبيانات"
        );
      } else if (resultrquestaction === 6) {
        OpenDialogForActionFound(
          "يبدو بانك سجلت الخروج من حسابك او تم تغييره سيتم تحميل صفحة و اظهار تحديث",
          "active"
        );
        setTimeout(() => {
          window.location.reload();
        }, 3500);
      } else if (resultrquestaction === 99) {
        OpenDialogForActionFound(
          "حدث خطا فشكة او لمزود لخدمة حاول في وقت لاحق او قم بتحميل صفحة"
        );
      }
    } else if (typRequest === "StartToConfirmedGetMyRatibe") {
      HandleCloseOrOpenReadinPage(false);
      typRequest = typActionrespNoew;
      if (resultrquestaction === 1) {
        OpenDialogForActionSuccess(
          `لقد تم تاكيد على استلام الراب من التاجر ${datuserClick.NameUserSendMessage} بنجاح و بدا العمل في الشهر جديد مع تمنياتنا لكم بلمزيد من نجاح كما تم تحديث لبيانات `
        );
      } else if (resultrquestaction === 12) {
        OpenDialogForActionFound(
          `يبدو بان العلاقة الوضيفية بيك و بين ${datuserClick.NameUserSendMessage} لم تكتمل او ان التاحر الغاها او انك رفضتها لذا لا فائد من رفض الاستلام الراتب كما تم تحديث لبيانات`
        );
      } else if (resultrquestaction === 3) {
        OpenDialogForActionFound(
          `يبدو بانك سبف و قبلت استلام الراتب من تاجر ${datuserClick.NameUserSendMessage} لذا لا يتاح تغيير القرار يمكنك طلب من تاجر ارسالها مرة اخرى كما تم تحديث لبيانات`
        );
      } else if (resultrquestaction === 9) {
        OpenDialogForActionFound(
          `يبدو بانك سبف و رفضت استلام الراتب من تاجر ${datuserClick.NameUserSendMessage} لذا لا يتاح تغيير القرار يمكنك طلب من تاجر ارسالها مرة اخرى كما تم تحديث لبيانات`
        );
      } else if (resultrquestaction === 99) {
        OpenDialogForActionFound(
          "حدث خطا فشكة او لمزود لخدمة حاول في وقت لاحق او قم بتحميل صفحة"
        );
      }
    } else if (typRequest === "StartToDscConfirmedGetMyRatibe") {
      HandleCloseOrOpenReadinPage(false);
      typRequest = typActionrespNoew;
      if (resultrquestaction === 1) {
        OpenDialogForActionSuccess(
          `لقد تم تاكيد على رفض استلام الراب سيتوجب على ${datuserClick.NameUserSendMessage} اغادت ارسال طلبية و نتما ان لا تتكرر مر اخرى كما تم تحديث لبيانات `
        );
      } else if (resultrquestaction === 12) {
        OpenDialogForActionFound(
          `يبدو بان العلاقة الوضيفية بيك و بين ${datuserClick.NameUserSendMessage} لم تكتمل او ان التاحر الغاها او انك رفضتها لذا لا فائد من رفض الاستلام الراتب كما تم تحديث لبيانات`
        );
      } else if (resultrquestaction === 3) {
        OpenDialogForActionFound(
          `يبدو بانك سبف و قبلت استلام الراتب من تاجر ${datuserClick.NameUserSendMessage} لذا لا يتاح تغيير القرار يمكنك طلب من تاجر ارسالها مرة اخرى كما تم تحديث لبيانات`
        );
      } else if (resultrquestaction === 9) {
        OpenDialogForActionFound(
          `يبدو بانك سبف و رفضت استلام الراتب من تاجر ${datuserClick.NameUserSendMessage} لذا لا يتاح تغيير القرار يمكنك طلب من تاجر ارسالها مرة اخرى كما تم تحديث لبيانات`
        );
      } else if (resultrquestaction === 99) {
        OpenDialogForActionFound(
          "حدث خطا فشكة او لمزود لخدمة حاول في وقت لاحق او قم بتحميل صفحة"
        );
      }
    } else if (typRequest === "StartConfirmedDemandTraveForBss") {
      HandleCloseOrOpenReadinPage(false);
      typRequest = typActionrespNoew;
      if (resultrquestaction === 1) {
        OpenDialogForActionSuccess(
          `لقد تمت موافق على توضيفك مع تاجر  ${datuserClick.NameUserSendMessage} بنجاح يمكنك الان دخول للحسابك لوضيفي بعد قليل `,
          "active"
        );
        setTimeout(() => {
          window.location.reload();
        }, 4500);
      } else if (resultrquestaction === 3) {
        OpenDialogForActionFound(
          `سبق و ان وافق على توضيف بغعل و لا يتاح تكرار القرار فرسالة الواحد كما تم تحديث لبيانات ${datuserClick.NameUserSendMessage} بنجاح `
        );
      } else if (resultrquestaction === 4) {
        OpenDialogForActionFound(
          `سبق و ان رفضت على توضيف بغعل و لا يتاح تغيير القرار فرسالة الواحد كما تم تحديث لبيانات ${datuserClick.NameUserSendMessage} بنجاح `
        );
      } else if (resultrquestaction === 99) {
        OpenDialogForActionFound(
          "حدث خطا فشكة او لمزود لخدمة حاول في وقت لاحق او قم بتحميل صفحة"
        );
      }
    } else if (typRequest === "StartDscConfirmedDemandTraveForBss") {
      HandleCloseOrOpenReadinPage(false);
      typRequest = typActionrespNoew;
      if (resultrquestaction === 1) {
        OpenDialogForActionSuccess(
          `لقد تم تاكيد على رفض طلبية توضيف مع تاجر و تم ارسال ردك على طلب ${datuserClick.NameUserSendMessage} بنجاح كما تم تحديث لبيانات `
        );
      } else if (resultrquestaction === 3) {
        OpenDialogForActionFound(
          `سبق و ان وافق على طلبية توضيف بغعل و لا يتاح تكرار القرار فرسالة الواحد كما تم تحديث لبيانات ${datuserClick.NameUserSendMessage} بنجاح `
        );
      } else if (resultrquestaction === 4) {
        OpenDialogForActionFound(
          `سبق و ان رفضت على طلبية توضيف بغعل و لا يتاح تغيير القرار فرسالة الواحد كما تم تحديث لبيانات ${datuserClick.NameUserSendMessage} بنجاح `
        );
      } else if (resultrquestaction === 99) {
        OpenDialogForActionFound(
          "حدث خطا فشكة او لمزود لخدمة حاول في وقت لاحق او قم بتحميل صفحة"
        );
      }
    }
  }, [resultrquestaction]); //== End Sheck Type Request To Show Result For User ==//

  // Start To Confirmed Smenthing Action FoR Mt Message Demand
  const handleSendRequestTureOk = async (Message) => {
    datuserClick = Message;
    switch (Message.sheckMessage) {
      case "zeboune":
        return TypeAlearVipNow(
          {
            id: Message.id,
            currentpagenone: currentpagenow,
          },
          "ConfirmedMessagForAddMyZeboune",
          "",
          "",
          "",
          "",
          `تاكيد موافق على طلبية تكوين علاقة زبائنية ${Message.NameUserSendMessage}`,
          "قبول",
          "",
          "user",
          "هل انت متاكد من رغبتك فتاكيد القرار و قبول علاقة زبائنية مع تاجر المذكور نضرا لعدم قدرتك على تغيير القرار",
          Message.id
        );
      case "tewve":
        return TypeAlearVipNow(
          Message,
          "ConfirmedMessagForAddMyTeweve",
          "",
          "",
          "",
          "",
          `تاكيد موافق على طلبية توضيف من تاجر ${Message.NameUserSendMessage}`,
          "قبول",
          "",
          "user",
          "هل انت متاكد من رغبتك فتاكيد القرار و قبول توضيف نضرا لعدم قدرتك على تغيير القرار",
          Message.id
        );
      case "Ratibe":
        return TypeAlearVipNow(
          Message,
          "ConfirmedGetMyRatibeTeweve",
          "",
          "",
          "",
          "",
          `تاكيد استلام الراتبك من تاجر ${Message.NameUserSendMessage}`,
          "تاكيد",
          "",
          "user",
          "هل انت متاكد من استلام الراتبك بعد موافقتك سيبدا احتساب شهر جديد من العمل ",
          Message.id
        );
    }
  }; // End To Confirmed Smenthing Action For My Message Demand

  const handleSendRequestCoseThisMessage = async (Message) => {
    datuserClick = Message;
    switch (Message.sheckMessage) {
      case "zeboune":
        return TypeAlearVipNow(
          {
            id: Message.id,
            currentpagenone: currentpagenow,
          },
          "DscConfirmedMessagForAddMyZeboune",
          "",
          "",
          "",
          "",
          `تاكيد رفض على طلبية تكوين علاقة زبائنية ${Message.NameUserSendMessage}`,
          "تاكيد",
          "",
          "user",
          "هل انت متاكد من رغبتك في رفرض القرار و عدم تكوين علاقة زبائنية مع تاجر المذكور ",
          Message.id
        );
      case "tewve":
        return TypeAlearVipNow(
          Message,
          "DscConfirmedMessagForAddTewve",
          "",
          "",
          "",
          "",
          `تاكيد رفض على طلبية توضيف من تاجر ${Message.NameUserSendMessage}`,
          "تاكيد",
          "",
          "user",
          "هل انت متاكد من رغبتك في رفض القرار و عدم قبول توضيف",
          Message.id
        );
      case "Ratibe":
        return TypeAlearVipNow(
          {
            id: Message.id,
            currentpagenone: currentpagenow,
          },
          "DscConfirmedGetMyRatibeTeweveUser",
          "",
          "",
          "",
          "",
          `تاكيد رفض استلام الراتبك من تاجر ${Message.NameUserSendMessage}`,
          "تاكيد",
          "",
          "user",
          "هل انت متاكد من عدم استلام الراتبك بعد رفضك سيتم استمرار قي شهر الحالي من دوم تغيير ",
          Message.id
        );
    }
  };

  // تحميل الرسائل
  const loadMessages = useCallback(async (page = 1) => {
    dispatsh(ShowAllsMyMessage({page: page, typ: 'moredata'}));
    typeShowDataNow = "More";
  }, []);

  // تحميل المزيد من الرسائل عند الوصول للأسفل
  const handleScroll = useCallback(() => {
    if (leadingtable || !currentpagenow || last_page == currentpagenow) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // تحميل المزيد عندما يبعد 100px عن الأسفل
    if (scrollTop + windowHeight >= documentHeight - 100) {
      loadMessages(currentpagenow + 1);
    }
  }, [leadingtable, currentpagenow, loadMessages]);

  // مراقبة scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    typeShowDataNow = "More";
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // تحميل الرسائل الأولى
  React.useEffect(() => {
    const token = Cookies.get("token");
    if(token) {
      dispatsh(ShowAllsMyMessage({page: 1, typ: 'first'}));
      typeShowDataNow = "Show";
      typRequest = "Show";
    }
  }, []);
  

  const getCategoryIcon = (category) => {
    switch (category) {
      case "zeboune":
        return <ShoppingCart />;
      case "tewve":
        return <Work />;
      default:
        return <Notifications />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "zeboune":
        return "primary";
      case "tewve":
        return "secondary";
      case "Ratibe":
        return "secondary";
      default:
        return "success";
    }
  };

  const getCategoryTitel = (category) => {
    switch (category) {
      case "zeboune":
        return "علاقة زبائنية";
      case "Ratibe":
        return "توظيف";
      case "tewve":
        return "توظيف";
      default:
        return "اشعار تنبيهي";
    }
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      <Header typeactive={"Message"} />
      <Container maxWidth="md" sx={{ py: 4, mt: "110px" }}>
        {/* رأس الصفحة */}
        <TitelPage TitelPage="البريد الرسائل و الاشعارات العامة" />

        {/* حالة التحميل الأولى */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        )}

        {/* حالة عدم وجود رسائل */}
        {!loading && returndata.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Warning sx={{ fontSize: 60, color: "grey.400", mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              لا توجد رسائل لعرضها
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              صندوق الرسائل فارغ حالياً
            </Typography>
          </Box>
        )}

        {/* قائمة الرسائل */}
        {!loading && returndata.length > 0 && (
          <Stack spacing={2}>
            {returndata.map((message) => (
              <MessageCard key={message.id}>
                <CardContent key={message.id +2321} sx={{ p: 3 }}>
                  {/* رأس الرسالة */}
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}
                  >
                    {/* صورة المرسل */}
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      badgeContent={
                        <Avatar
                          sx={{ width: 24, height: 24, bgcolor: "white" }}
                        >
                          {getCategoryIcon(message.sheckMessage)}
                        </Avatar>
                      }
                    >
                      <AvatarImgForAllType
                        style={{
                          width: "70px",
                          height: "70px",
                          fontSize: "1.8rem",
                          bgcolor: "none",
                        }}
                        MyAvatar={message.image}
                      />
                    </Badge>

                    {/* معلومات المرسل والرسالة */}
                    <Box sx={{ flex: 1, ml: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Box className="stylmessgtitelandnamesend">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <Typography variant="h6" component="h2">
                              {message.titel}
                            </Typography>
                          </Box>
                          <Typography variant="h6">
                            من: {message.NameUserSendMessage}
                          </Typography>
                        </Box>

                        <Box sx={{ textAlign: "left" }}>
                          <Chip
                            label={getCategoryTitel(message.sheckMessage)}
                            size="small"
                            color={getCategoryColor(message.sheckMessage)}
                            variant="outlined"
                            sx={{ mr: 1 }}
                          />
                          <Typography
                            variant="caption"
                            display="block"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            {formatRelativeDate(message.created_at)}
                          </Typography>
                        </Box>
                      </Box>

                      <div className="messagedscandcardtypstyle">
                        {/* محتوى الرسالة */}
                        <Typography
                          variant="body1"
                          color="text.primary"
                          sx={{ mt: 2, mb: 2, lineHeight: 1.6 }}
                        >
                          {message.message}
                        </Typography>
                      </div>

                      <Divider sx={{ my: 2 }} />

                      {/* أزرار الإجراءات للرسائل التفاعلية */}
                      {(message.sheckMessage === "zeboune" &&
                        message.TypeMessage === "Waite" &&
                        message.CloceMessage !== 1) ||
                      (message.sheckMessage === "tewve" &&
                        message.TypeMessage === "Waite" &&
                        message.CloceMessage !== 1) ||
                      (message.sheckMessage === "Ratibe" &&
                        message.TypeMessage === "Waite" &&
                        message.CloceMessage !== 1) &&
                        message.user_id === ProfileSnageNow.user_id ? (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 2,
                          }}
                        >
                          <ActionButton
                            variant="contained"
                            size="medium"
                            startIcon={<CheckCircle />}
                            actiontype="accept"
                            disabled={
                              message.TypeMessage !== "Waite" ||
                              message.CloceMessage === 1
                            }
                            onClick={() => handleSendRequestTureOk(message)}
                          >
                            قبول الطلب
                          </ActionButton>
                          <ActionButton
                            variant="contained"
                            size="medium"
                            startIcon={<Cancel />}
                            actiontype="reject"
                            onClick={() =>
                              handleSendRequestCoseThisMessage(message)
                            }
                            aria-disabled={
                              message.TypeMessage !== "Waite" ||
                              message.CloceMessage == 1
                            }
                          >
                            رفض الطلب
                          </ActionButton>
                        </Box>
                      ) : (
                        ""
                      )}

                      {/* حالة الرسائل التي تم الرد عليها */}
                      {(message.sheckMessage === "zeboune" &&
                        message.TypeMessage !== "Waite") ||
                      (message.sheckMessage === "tewve" &&
                        message.TypeMessage !== "Waite") ||
                      (message.sheckMessage === "Ratibe" &&
                        message.TypeMessage !== "Waite") ? (
                        <Box sx={{ textAlign: "center", py: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                              color:
                                message.TypeMessage === "Confirmed"
                                  ? "success.main"
                                  : "error.main",
                            }}
                          >
                            {message.TypeMessage === "Confirmed"
                              ? "✓ لقد قبلت هذا الطلب"
                              : "" ||
                                message.TypeMessage === "Close" ||
                                message.CloceMessage == 1
                              ? "✗ لقد رفضت هذا الطلب"
                              : "" ||
                                message.TypeMessage === "Stop" ||
                                message.CloceMessage == 2
                              ? "✗ تم العاء الطلب"
                              : ""}
                          </Typography>
                        </Box>
                      ) : (
                        ""
                      )}

                      {/* الرسائل الإشعارية */}
                      {message.sheckMessage !== "zeboune" &&
                        message.sheckMessage !== "tewve" &&
                        message.sheckMessage !== "Ratibe" && (
                          <Box sx={{ textAlign: "center", py: 1 }}>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              fontStyle="italic"
                            >
                              📋 هذه رسالة إعلامية لا تتطلب أي إجراء منك
                            </Typography>
                          </Box>
                        )}
                    </Box>
                  </Box>
                </CardContent>
              </MessageCard>
            ))}

            {/* تحميل المزيد */}
            {loadingmoredata ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                <CircularProgress size={40} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 2, alignSelf: "center" }}
                >
                  جاري تحميل المزيد من الرسائل...
                </Typography>
              </Box>
            ) : (
              ""
            )}

            {/* نهاية القائمة */}
            {last_page == currentpagenow ? (
              <Box sx={{ textAlign: "center", py: 3 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontStyle="italic"
                >
                  🏁 لقد وصلت إلى نهاية الرسائل
                </Typography>
              </Box>
            ) : (
              ""
            )}
          </Stack>
        )}

        {/* Snackbar للإشعارات */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert
            onClose={closeSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default Messages;
