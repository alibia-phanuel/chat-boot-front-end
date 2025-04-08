import { useState, useEffect } from "react";
import Layout from "../../components/pages/Layout";
import LayouSystem from "../share/LayoutSystem";
import useUserStore from "../../stores/userStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import fetchPosts from "@/api/facebook/GetApiPost";
import ClientComponent from "../ClientComponent";
type Post = {
  id: string;
  message: string;
  created_time: string;
  // ... autres propriétés selon tes données
};
const PostsFacebook = () => {
  const [loading, setLoading] = useState(true);
  const [postsPage1, setPostsPage1] = useState<Post[]>([]);
  const [postsPage2, setPostsPage2] = useState<Post[]>([]);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const navigate = useNavigate();

  const pageId1 = "389037834288932";
  const pageId2 = "101051433077608";
  const accessTokenPage1 = "EAAZASXPS0t6cBO4..."; // tronqué pour lisibilité
  const accessTokenPage2 = "EAAZASXPS0t6cBO9...";

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await fetchUser(); // vérifie l’utilisateur
        const [posts1, posts2] = await Promise.all([
          fetchPosts(pageId1, accessTokenPage1),
          fetchPosts(pageId2, accessTokenPage2),
        ]);
        setPostsPage1(posts1);
        setPostsPage2(posts2);
      } catch (error) {
        toast.error("❌ Une erreur est survenue.");
        console.error(error);
        navigate("/");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000); // Ajoute le petit délai visuel
      }
    };

    fetchAllData();
  }, [fetchUser, navigate]);

  if (loading) {
    return (
      <Layout>
        <LayouSystem>
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
          </div>
        </LayouSystem>
      </Layout>
    );
  }

  return (
    <Layout>
      <LayouSystem>
        <div className="flex-wrap flex justify-center h-full">
          <div className="container h-full text-center  flex justify-center items-center text-red-400">
            <div className="flex  justify-between  w-full h-full max-md:flex-wrap">
              <ClientComponent posts={postsPage1} numberPage={1} />
              <ClientComponent posts={postsPage2} numberPage={2} />
            </div>
          </div>
        </div>
      </LayouSystem>
    </Layout>
  );
};

export default PostsFacebook;
