import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import PageNotFound from "../404/PageNotFound";
import Credits from "../Pages/credits/credits";
import AdminAuthentication from "../Pages/Admin_Authentication";
import Layout from "../Pages/Layout";
import useAuth from "../Hooks/AuthContext";
import MyAccount from "../Pages/MyAccount";
import PatientForm from "../Pages/Patient SubCollection/PatientForm";
import CaseForm from "../Pages/Case SubCollection/CaseForm";
import { CaseProvider } from "../Pages/Case SubCollection/CaseProvider";
import RouteData from "./RouteData";
import Consult from "../Pages/Consult";
import { PatientProvider } from "../Pages/Patient SubCollection/PatientProvider";
import Loader from "../Pages/Loader";
import { useNavigate } from "react-router-dom";
import AccountRegistration from "../Pages/AccountRegistration";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useEffect, useState, useCallback } from "react";
import { GetRequest } from "../API/api";
import { User } from "../API/Paths";
import PasswordRecovery from "../Pages/PasswordRecovery";
import axios from "axios";
import HomePage from "../Pages/HomePage";
import Navbar from "../Components/Homepage/Desktop/Navbar";
import DesktopView from "../Pages/Homepage/DesktopView";
import About from "../Components/Homepage/Desktop/About";
import Services from "../Components/Homepage/Desktop/Services";

const LoginPage = lazy(() => import("../Pages/Login"));
const RegisterPage = lazy(() => import("../Pages/Registration"));

const ProtectedRoutes = () => {
  const { user } = useAuth();

  return user === null ? <Navigate to="/login" replace /> : <Outlet />;
};

const AnimatedRoute = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [fetch, setFetch] = useState(true);

  const handleFetch = useCallback(
    (token) => {
      GetRequest({ url: User }, token)
        .then((res) => res.data)
        .then((res) => {
          if (!res.data.status === 200) {
            throw new Error("Bad response", { cause: res });
          }

          const { data } = res;
          setUser(data);
          console.log("Called navigate dashboard");
          if (fetch) {
            navigate("/", { replace: true });
          }
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log("Request canceled:", error.message);
          } else {
            console.log("Error:", error.message);
          }
          setUser(null);
        })
        .finally(() => setFetch(false));
    },
    [setUser, navigate, setFetch, fetch]
  );

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (fetch) {
      handleFetch(cancelTokenSource.token);
    }

    return () => cancelTokenSource.cancel("Request canceled by the user.");
  }, [handleFetch, fetch]);

  return (
    <AnimatePresence>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
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
                    </Routes>
                  </Layout>
                </>
              }
            />
            <Route path="/case-view" element={<Consult />} />
            <Route
              path="/case/form"
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
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/" element={<DesktopView />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminAuthentication />} />
          <Route path="/account-recovery" element={<PasswordRecovery />} />
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
