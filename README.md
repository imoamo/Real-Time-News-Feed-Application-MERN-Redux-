# 📰 News API Documentation  

## 📌 Overview  
The **News API** provides real-time updates using WebSockets and supports retrieving trending news by category.  

## 🌍 Base URL  
```
http://localhost:5000
```
*(Update this in production as needed.)*  

## 🚀 Features  
✅ Fetch trending news  
✅ Retrieve articles by category  
✅ Real-time WebSocket updates  

---

## 🛠️ Setup & Installation  

### 🔹 Prerequisites  
- **Node.js** & **NPM**  
- **MongoDB Atlas or Local MongoDB**  

### 🔹 Steps to Run  

1. **Clone the repository**  
   ```sh
   git clone https://github.com/imoamo/Real-Time-News-Feed-Application-MERN-Redux-.git
   cd Real-Time-News-Feed-Application-MERN-Redux-
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

3. **Set up environment variables**  
   - Create a `.env` file in the root directory.  
   - Add the following:  
     ```
     MONGO_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/news_app?retryWrites=true&w=majority
     ```

4. **Run the server**  
   ```sh
   npm run dev
   ```

### 📌 You can check the API documentation here:  
➡️ [http://localhost:5000/api-docs/#/](http://localhost:5000/api-docs/#/)  

---

## 📖 API Endpoints  

### 🔥 1. Get Trending News  
#### ➡️ `GET /api/news/trending`  
**Description:** Fetches the **top 5 trending news** articles based on likes and views.  

#### 📤 Response (200 OK)  
```json
[
  {
    "id": "1",
    "title": "Stock Market Crash",
    "content": "Stock markets have plunged today...",
    "category": "Finance",
    "likes": 150,
    "views": 1200,
    "timestamp": "2024-02-26T12:00:00Z"
  }
]
```
> **⚠️ Errors:**  
> `500 Internal Server Error` – If something goes wrong.  

---

### 🏷️ 2. Get News by Category  
#### ➡️ `GET /api/news/{category}`  
**Description:** Retrieves news articles **by category**.  

#### 📥 Path Parameter  
| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `category` | `string` | ✅ Yes | Must be one of: `Tech`, `Business`, `Sports`, `Economy`, `Finance` |

#### 📤 Example Response (200 OK)  
```json
[
  {
    "id": "2",
    "title": "AI Breakthrough",
    "content": "A new AI model surpasses human capabilities...",
    "category": "Tech",
    "likes": 300,
    "views": 5000,
    "timestamp": "2024-02-26T14:30:00Z"
  }
]
```
> **⚠️ Errors:**  
> `500 Internal Server Error` – If something goes wrong.  

---

## 🔄 Real-Time News Updates (WebSockets)  
The API supports real-time news updates via WebSockets.  
Clients can subscribe to a **news category** and receive live updates.  

### 🔔 Subscribe to a Category  
```javascript
const socket = io("http://localhost:5000");
socket.emit("subscribeToCategory", "Tech");

socket.on("newsUpdate", (data) => {
  console.log("New article received:", data);
});
```

### 📥 Incoming News Update (Example Payload)  
```json
{
  "id": "3",
  "title": "5G Expands Globally",
  "content": "5G networks are now available in more countries...",
  "category": "Tech",
  "likes": 100,
  "views": 2500,
  "timestamp": "2024-02-26T16:00:00Z"
}
```

---

## ⚠️ Error Handling  
| Status Code | Meaning |
|-------------|---------|
| `500` | Internal Server Error – Something went wrong on the server. |
| `404` | Not Found – If the resource does not exist. |

---

## 🚀 Deployment  
### ✅ **Deployed Backend:**  
🔗 [https://news-repo-backend.onrender.com](https://news-repo-backend.onrender.com)  

### ✅ **Deployed Full Application:**  
🔗 [https://zingy-pithivier-75fa27.netlify.app/](https://zingy-pithivier-75fa27.netlify.app/)  

---

## 📌 Contributing  
🔹 Fork the repository  
🔹 Create a new branch (`feature/my-feature`)  
🔹 Commit your changes (`git commit -m "Add new feature"`)  
🔹 Push to the branch (`git push origin feature/my-feature`)  
🔹 Open a pull request  

---

## 🌟 Show Your Support!  
⭐ If you found this API helpful, please give it a **star** on GitHub!  
🚀 Happy coding! 🎉
