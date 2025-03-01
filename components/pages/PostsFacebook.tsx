import { useState, useEffect } from "react";
import Layout from "../../components/pages/Layout";
import LayouSystem from "../share/LayoutSystem";

const PostsFacebook = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simule un délai de 1 seconde avant de masquer le loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1000 ms = 1 seconde

    // Cleanup du timer au cas où le composant serait démonté avant la fin du délai
    return () => clearTimeout(timer);
  }, []);

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
        <div className=" flex-wrap flex justify-center h-full">
          <div className="container  h-full text-center flex justify-center items-center text-red-400 ">
            <p className="max-w-[750px]">
              En raison de l'expiration des <strong>access tokens</strong>, il
              est impossible de récupérer les IDs des posts Facebook de ces
              pages. Pour résoudre ce problème, il est nécessaire de renouveler
              les <strong>access tokens</strong> via{" "}
              <a
                className="underline"
                href="https://developers.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Meta for Developers
              </a>{" "}
              afin de pouvoir accéder aux publications.
            </p>
          </div>
        </div>
      </LayouSystem>
    </Layout>
  );
};

export default PostsFacebook;
