import { useState } from "react";
import axios from "axios";
import "./CreatePost.css";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [error, setError] = useState("");

  const handleCreatePost = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
    const token = localStorage.getItem("token"); // Получаем токен из локального хранилища
    const formData = new FormData();
    formData.append("content", content);
    if (media) {
      formData.append("media", media); // Если файл есть, добавляем его
    }

    try {
      // Отправляем POST запрос на сервер
      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Post created!");
      setContent(""); // Очистить поле ввода после отправки
      setMedia(null);  // Очистить выбранное изображение
    } catch (error) {
      setError(error.response?.data?.error || "Failed to create post"); // Обработка ошибок
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create Post</h2>
      <form onSubmit={handleCreatePost} className="create-post-form">
        <textarea
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="content-textarea"
        />
        <input
          type="file"
          onChange={(e) => setMedia(e.target.files[0])}
          className="file-input"
        />
        {media && (
          <div className="file-preview">
            <img src={URL.createObjectURL(media)} alt="preview" />
          </div>
        )}
        <button type="submit" className="submit-btn">Post</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}