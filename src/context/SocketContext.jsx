import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // ✅ Replace with your backend base URL
    const newSocket = io("http://localhost:8000", {
      transports: ["websocket"], // prevent polling flicker
      reconnectionAttempts: 5, // optional: retry limit
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
