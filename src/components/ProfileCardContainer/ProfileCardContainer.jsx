import { useState, useEffect } from "react";
import { getCurrentUser } from "../../services/accountServices";
import { errorNavigateRedirect } from "../../hooks/serviceErrorRedirect";
import ProfileCard from "../Profile/Profile";
import Loading from "../Loading/loading";

const ProfileCardContainer = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState();

  const getProfile = async () => {
    const { data } = await getCurrentUser();
    if (!data) {
      dataErrorRedirect();
    }
    setProfile(data);
    setLoading(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return loading ? <Loading /> : <ProfileCard data={profile} />;
};

export default ProfileCardContainer;
