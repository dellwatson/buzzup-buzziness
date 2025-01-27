import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import useAuthStore from "../store/auth-store";

const API_URL = "http://127.0.0.1:54321/functions/v1";

async function apiRequest(endpoint, method, body = {}) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  let url = `${API_URL}/${endpoint}`;

  if (method === "GET") {
    const params = new URLSearchParams(body).toString();
    url += `?${params}`;
  } else {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

// todo: refactor for more options beside address
async function findUserAccount(address) {
  console.log(address, "load address here");

  //endpoint, method, body
  const { data } = await apiRequest("user-find-account", "GET", {
    identifier: address,
    provider: "evm",
  });
  console.log(data, "data accoutn");
  return data;
}

async function fetchUserProfile(userId) {
  const { data } = await apiRequest("user-find", "GET", { id: userId });
  console.log(data, "data profile");

  return data[0];
}

async function registerUser(address) {
  const { data } = await apiRequest("user-register", "POST", {
    identifier: address,
    provider: "evm",
    accountType: "web3",
    identifierType: "eth_address",
  });

  console.log(data, "data register");

  return data;
}

export default function AuthProvider({ children }) {
  const { address, isConnected } = useAccount();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    console.log(address, isConnected, `address, isConnected`);
    const authenticate = async () => {
      if (!isConnected || !address) {
        setUser(null);
        return;
      }

      if (user?.accounts?.[0]?.identifier === address) {
        return; // User is already authenticated
      }

      try {
        const accounts = await findUserAccount(address);

        if (accounts?.length) {
          const userProfile = await fetchUserProfile(accounts[0]?.user_id);
          setUser({ ...userProfile, loggedInAt: new Date().toISOString() });
        } else {
          const newUser = await registerUser(address);
          setUser({ ...newUser, loggedInAt: new Date().toISOString() });
        }
      } catch (error) {
        console.error("Authentication error:", error);
      }
    };

    authenticate();
  }, [address, isConnected]);

  return <>{children}</>;
}
