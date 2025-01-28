import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostList from "./pages/PostList";
import CreatePost from "./pages/CreatePost";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Добавим состояние загрузки

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));  // После запроса мы меняем статус загрузки
    } else {
      setLoading(false);  // Если токена нет, тоже меняем статус
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Пока данные загружаются, показываем загрузку
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path="/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}