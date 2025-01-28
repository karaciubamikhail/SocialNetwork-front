import { useEffect, useState } from "react";
import axios from "axios";
import "./PostList.css"; // Подключаем стили

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <img
              className="author-avatar"
              src={`https://i.pravatar.cc/150?u=${post.author.id}`} // Пример аватара
              alt={post.author.username}
            />
            <div className="author-info">
              <p className="author-name">{post.author.username}</p>
              <p className="post-date">2 hours ago</p> {/* Добавить реальное время позже */}
            </div>
          </div>

          <p className="post-content">{post.content}</p>

          {post.mediaUrl && <img className="post-media" src={post.mediaUrl} alt="Media" />}

          <div className="post-actions">
            <button className="like-button">Like</button>
            <button className="comment-button">Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
}