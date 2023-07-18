import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import Layout from "../Pages/Layout";
import MyAccount from "../Pages/MyAccount";
import PatientForm from "../Pages/Patient SubCollection/PatientForm";
import CaseForm from "../Pages/Case SubCollection/CaseForm";
import { CaseProvider } from "../Pages/Case SubCollection/CaseProvider";
import RouteData from "./RouteData";
import Consult from "../Pages/Consult";
import { PatientProvider } from "../Pages/Patient SubCollection/PatientProvider";
import Loader from "../Pages/Loader";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useEffect, useState, useCallback } from "react";
import PasswordRecovery from "../Pages/PasswordRecovery";
import axios from "axios";
import VideoCall2 from "../Pages/Video Call/VideoCall2";
import useUser from "../Hooks/UserHook";
import Profile from "../Pages/Profile/Profile";

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
  const { validateToken } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [fetch, setFetch] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handleValidateToken = useCallback(
    async (token) => {
      await validateToken(token, (status, feedback) => {
        if (status === 200) {
          navigate(feedback, { replace: true });
        }

        setFetch(false);
        setIsLoading(false);
      });
    },
    [validateToken, navigate]
  );

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (fetch) {
      handleValidateToken(cancelTokenSource.token);
    }
    return () => cancelTokenSource.cancel("Request canceled by the user.");
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
                      {RouteData.path.map((data) => {
                        return (
                          <Route
                            key={data.index}
                            path={data.href}
                            element={data.element}
                          />
                        );
                      })}
                      <Route path="/MyAccount" element={<MyAccount />} />
                      <Route path="/profile" element={<Profile />} />
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
