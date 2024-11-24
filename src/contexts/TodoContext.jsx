import { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "./AuthContext";

const TodoContext = createContext({});

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth() || { currentUser: null };

  useEffect(() => {
    if (!currentUser) {
      setTodos([]);
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, "todos"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc"),
        limit(10)
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const todoList = [];
          querySnapshot.forEach((doc) => {
            todoList.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setTodos(todoList);
          setLoading(false);
        },
        (error) => {
          console.error("Firestore error:", error);
          setError(error.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Setup error:", err);
      setError(err.message);
      setLoading(false);
    }
  }, [currentUser]);

  const addTodo = async (todoData) => {
    if (!currentUser) throw new Error("Must be logged in");

    try {
      // Validate input data
      if (!todoData.title || typeof todoData.title !== "string") {
        throw new Error("Title is required and must be a string");
      }

      // Create the todo document with validated data
      const newTodo = {
        title: todoData.title.trim(),
        description: todoData.description?.trim() || "",
        userId: currentUser.uid,
        completed: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, "todos"), newTodo);

      return docRef.id;
    } catch (err) {
      console.error("Add todo error:", err);
      throw new Error(err.message);
    }
  };

  const updateTodo = async (id, data) => {
    if (!currentUser) throw new Error("Must be logged in");

    try {
      const todoRef = doc(db, "todos", id);

      const updateData = {
        ...data,
        updatedAt: serverTimestamp(),
      };

      if (data.title !== undefined) {
        updateData.title = Array.isArray(data.title)
          ? data.title.join("")
          : String(data.title).trim();
      }

      if (data.description !== undefined) {
        updateData.description = Array.isArray(data.description)
          ? data.description.join("")
          : String(data.description).trim();
      }

      await updateDoc(todoRef, updateData);
    } catch (err) {
      console.error("Update todo error:", err);
      throw new Error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    if (!currentUser) throw new Error("Must be logged in");

    try {
      const todoRef = doc(db, "todos", id);
      await deleteDoc(todoRef);
    } catch (err) {
      console.error("Delete todo error:", err);
      throw new Error(err.message);
    }
  };

  const searchTodos = async (searchTerm) => {
    if (!currentUser) throw new Error("Must be logged in");
    if (!searchTerm.trim()) {
      // If search term is empty, reset to original todos
      const q = query(
        collection(db, "todos"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc"),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      const todoList = [];
      querySnapshot.forEach((doc) => {
        todoList.push({ id: doc.id, ...doc.data() });
      });
      setTodos(todoList);
      return;
    }

    try {
      // Get all todos for the user
      const q = query(
        collection(db, "todos"),
        where("userId", "==", currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const todoList = [];

      // Filter todos based on search term
      querySnapshot.forEach((doc) => {
        const todo = { id: doc.id, ...doc.data() };
        if (
          todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          todo.description.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          todoList.push(todo);
        }
      });

      // Sort filtered todos by createdAt
      todoList.sort((a, b) => b.createdAt - a.createdAt);
      setTodos(todoList);
    } catch (err) {
      console.error("Search todos error:", err);
      throw new Error(err.message);
    }
  };

  const fetchTodos = async () => {
    if (!currentUser) return;

    try {
      const q = query(
        collection(db, "todos"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const todosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTodos(todosData);
    } catch (err) {
      console.error("Fetch todos error:", err);
    }
  };

  const value = {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    searchTodos,
    fetchTodos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
