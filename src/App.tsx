import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./components/Blog";
import MainLayout from "./components/Layout";
import Categories from "./components/Categories";
import Courses from "./components/Courses";
import Plans from "./components/Plans";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home/>
              </MainLayout>
            }
          />
          <Route
            path="/categories"
            element={
              <MainLayout>
                <Categories />
              </MainLayout>
            }
          />
          <Route
            path="/courses"
            element={
              <MainLayout>
                < Courses />
              </MainLayout>
            }
          />
          <Route
            path="/plans"
            element={
              <MainLayout>
                <Plans/>
              </MainLayout>
            }
          />

          <Route
            path="/blog"
            element={
              <MainLayout>
                <Blog/>
              </MainLayout>
            }
          />

          <Route
            path="/about"
            element={
              <MainLayout>
                <About/>
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <Contact/>
              </MainLayout>
            }
          />

          {/* Catch-all */}
          <Route
            path="*"
            element={
              <MainLayout>
                <NotFound />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
