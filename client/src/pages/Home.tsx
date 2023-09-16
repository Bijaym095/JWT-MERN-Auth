import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Container from "../components/Container";
import useLogout from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";
import { getCurrentUserId } from "../lib/utils";
import { type User } from "../lib/types";

const Home = () => {
  const { logout } = useLogout();
  const { currentUser } = useAuthContext();
  const currentUserId = getCurrentUserId(currentUser);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<User> => {
      const { data } = await axios.get(`/users/${currentUserId}`);

      return data;
    },
  });

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <main>
      <section className="min-h-screen grid place-items-center">
        <Container className="text-center">
          <h1>Hello 👋👋, {user?.email}</h1>
          <button onClick={handleLogout}>Logout</button>
        </Container>
      </section>
    </main>
  );
};

export default Home;
