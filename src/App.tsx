import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Layout from "./components/Layout";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Courses from "./components/Courses";
import Plans from "./components/Plans";
import Blog from "./components/Blog";
import About from "./components/About";
import Contact from "./components/Contact";
import MyCourses from "./components/MyCourses";
import ConfirmPage from "./components/ConfirmPage";
import NotFound from "./pages/NotFound";
import CourseDetails from "./components/CourseDetails";

import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
          />
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/categories"
                element={
                  <Layout>
                    <Categories />
                  </Layout>
                }
              />
              <Route
                path="/courses"
                element={
                  <Layout>
                    <Courses />
                  </Layout>
                }
              />
              <Route
                path="/my-courses"
                element={
                  <Layout>
                    <MyCourses />
                  </Layout>
                }
              />
              <Route
                path="/plans"
                element={
                  <Layout>
                    <Plans />
                  </Layout>
                }
              />
              <Route
                path="/blog"
                element={
                  <Layout>
                    <Blog />
                  </Layout>
                }
              />
              <Route
                path="/about"
                element={
                  <Layout>
                    <About />
                  </Layout>
                }
              />
              <Route
                path="/contact"
                element={
                  <Layout>
                    <Contact />
                  </Layout>
                }
              />
              <Route
                path="/confirm"
                element={
                  <Layout>
                    <ConfirmPage />
                  </Layout>
                }
              />

              <Route
                path="/my-courses/:slug"
                element={
                  <Layout>
                    <CourseDetails />
                  </Layout>
                }
              />

              <Route
                path="*"
                element={
                  <Layout>
                    <NotFound />
                  </Layout>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
