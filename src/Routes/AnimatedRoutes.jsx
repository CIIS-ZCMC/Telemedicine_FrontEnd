import axios from "axios";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import Layout from "../Layout/Layout";
import MyAccount from "../Pages/MyAccount";
import PatientForm from "../Pages/Patient SubCollection/PatientForm";
import CaseForm from "../Pages/Case SubCollection/CaseForm";
import { CaseProvider } from "../Pages/Case SubCollection/CaseProvider";
import Consult from "../Pages/Consult";
import { PatientProvider } from "../Pages/Patient SubCollection/PatientProvider";
import Loader from "../Pages/Loader";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useEffect, useState, useCallback } from "react";
import Calendar from "../Pages/Calendar/Calendar";
import PasswordRecovery from "../Pages/PasswordRecovery";
import VideoCall2 from "../Pages/Video Call/VideoCall2";
import useUser from "../Hooks/useUserHook";
import Profile from "../Pages/Profile/Profile";
import useThemeHook from "../Hooks/useThemeHook";
import useUserHook from "../Hooks/useUserHook";

const LoginPage = lazy(() => import("../Pages/Login"));
const RegisterPage = lazy(() => import("../Pages/Registration"));
const Home = lazy(() => import("../Pages/Home"));
const About = lazy(() => import("../Components/Homepage/Desktop/About"));
const Services = lazy(() => import("../Components/Homepage/Desktop/Services"));
const PageNotFound = lazy(() => import("../404/PageNotFound"));
const AccountRegistration = lazy(() => import("../Pages/AccountRegistration"));
const Credits = lazy(() => import("../Pages/credits/credits"));

const ProtectedRoutes = () => {
  const { user } = useUser();

  return user !== null ? <Outlet /> : <Navigate to="/home" />;
};

const AnimatedRoute = () => {
  const { users } = useUserHook();
  const { getFilteredRoutes } = useThemeHook();
  const { validateToken } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [fetch, setFetch] = useState(true);

  const handleValidateToken = useCallback(
    async (token) => {
      await validateToken(token, (status, feedback) => {
        if (status === 200) {
          navigate(feedback, { replace: true });
        }

        setFetch(false);
      });
    },
    [validateToken, navigate]
  );

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (fetch) {
      handleValidateToken(cancelTokenSource.token);
    }
    return () => cancelTokenSource.cancel();
  }, [fetch, handleValidateToken]);

  return (
    <AnimatePresence>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<ProtectedRoutes location={location.pathname} />}>
            <Route
              path="/*"
              exact
              element={
                <>
                  <Layout>
                    <Routes>
                      {getFilteredRoutes(users?.role).map((route, index) => (
                        <Route key={index} {...route} />
                      ))}
                      <Route path="/MyAccount" element={<MyAccount />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/my-calendar" element={<Calendar />} />
                    </Routes>
                  </Layout>
                </>
              }
            />
            <Route path="/case-view" element={<Consult />} />
            <Route
              path="/case/form"
              W
              element={
                <CaseProvider>
                  <CaseForm />
                </CaseProvider>
              }
            />
            <Route
              path="/patients/form"
              element={
                <PatientProvider>
                  <PatientForm />
                </PatientProvider>
              }
            />
          </Route>

          {/* <Route path="/logins" element={<LoginDummy />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account-recovery" element={<PasswordRecovery />} />
          <Route path="/room/:id" element={<VideoCall2 />} />
          <Route path="/account" element={<AccountRegistration />} />

          {/* catch all */}
          <Route path="*" element={<PageNotFound />} />
          <Route path="/credits" element={<Credits />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AnimatedRoute;
