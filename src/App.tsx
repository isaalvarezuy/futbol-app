import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTeamForm from "./components/AddTeamForm/AddTeamForm";
import LoggedOutLayout from "./layouts/LoggedOutLayout";
import LoginForm from "./components/LoginForm/LoginForm";

const LazyLoggedInLayout = lazy(
  () => import(/* webpackChunkName: "featureA" */ "./layouts/LoggedInLayout")
);
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<p className="bg-red-200">loading....</p>}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<LoggedOutLayout />} />
            <Route path="/*" element={<LazyLoggedInLayout />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
