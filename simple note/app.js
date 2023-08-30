// app.js

import { auth, firestore } from "./firebase";

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const memoTextarea = document.getElementById("memo");
const saveBtn = document.getElementById("saveBtn");

let currentUser = null;

auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    currentUser = null;
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
});

loginBtn.addEventListener("click", () => {
  auth.signInAnonymously().catch(error => {
    console.error("Authentication failed:", error);
  });
});

logoutBtn.addEventListener("click", () => {
  auth.signOut();
});

saveBtn.addEventListener("click", () => {
  if (currentUser) {
    const memoText = memoTextarea.value;
    if (memoText.trim() !== "") {
      firestore.collection("memos").add({
        userId: currentUser.uid,
        content: memoText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      alert("메모가 저장되었습니다.");
    } else {
      alert("메모를 입력하세요.");
    }
  } else {
    alert("로그인이 필요합니다.");
  }
});
