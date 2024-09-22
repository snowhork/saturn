import { useNavigate, useSearchParams } from "@remix-run/react";
import { useEffect } from "react";
import { setGoogleDriveLocalStorage } from "~/components/GoogleDriveAuth";
import { tokenApiOauthNameGoogleDriveTokenPost } from "~/gen/default/default";

const useFetchToken = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");
  const name = searchParams.get("name");

  useEffect(() => {
    if (!code) return;
    if (!name) return;

    tokenApiOauthNameGoogleDriveTokenPost(name, { code }).then((resp) => {
      setGoogleDriveLocalStorage(name, resp.data);
      navigate("/");
    });
  }, [code, name, navigate]);
};

const Page = () => {
  useFetchToken();

  return <div className="p-4 text-center">callbacking...</div>;
};

export default Page;
