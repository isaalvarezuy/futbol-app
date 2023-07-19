import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AddTeamForm from "./components/AddTeamForm/AddTeamForm";
import LoggedOutLayout from "./layouts/LoggedOutLayout";
import LoginForm from "./components/LoginForm/LoginForm";
import { ToastContainer } from "react-toastify";
import { useSession } from "./hooks/store/useSession";
import Spinner from "./components/Spinner/Spinner";
import LoadingScreen from "./components/views/Loading/LoadingScreen";

const LazyLoggedInLayout = lazy(
  () => import(/* webpackChunkName: "featureA" */ "./layouts/LoggedInLayout")
);
function App() {
  const queryClient = new QueryClient();
  const token = useSession((state) => state.token);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingScreen />}>
        <BrowserRouter>
          {token ? <LazyLoggedInLayout /> : <LoggedOutLayout />}
          {/*   <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<LoggedOutLayout />} />
            <Route path="/*" element={<LazyLoggedInLayout />} />
          </Routes> */}
        </BrowserRouter>
        <ToastContainer />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
