const api = "https://reactnd-books-api.udacity.com";

let token = localStorage.token;

// Kiểm tra xem có token hay không, nếu không có thì tạo mới
if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  Accept: "application/json",
  Authorization: token,
};

// Lấy thông tin sách theo ID
export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then((response) => response.json())
    .then((data) => data.book);

// Lấy tất cả sách
export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then((response) => response.json())
    .then((data) => data.books);

// Cập nhật sách
export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  }).then((response) => response.json());

// Tìm kiếm sách
export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, maxResults }),
  })
    .then((response) => response.json())
    .then((data) => data.books);
