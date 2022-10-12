import { useCallback, useEffect, useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import User from "../components/User";


function Followers() {
    const API_URL = "http://localhost:5005";
    const [user, setUser] = useState(null);
    const [followers, setFollowers] = useState(null)
    const { userId } = useParams();

    const getUser = useCallback(() => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${API_URL}/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((userFromApi) => {
                setUser(userFromApi.data);
            })
            .catch((err) => console.log("err", err));
    }, [userId]);
    useEffect(() => { getUser() }, [getUser]);

    const getFollowers = useCallback(() => {
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${API_URL}/api/users/${userId}/followers`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
            .then(followers => setFollowers(followers.data))
            .catch(err => console.log(err))
    }, [userId])
    useEffect(() => { getFollowers() }, [getFollowers])

    if (!user) return "loading";

    return (
        <div className="FollowersList">
            <TopNavbar />
            {followers && (followers.map(el => {
                return (
                    <div key={el._id}>
                        <User value={el}></User>
                    </div>
                )
            }))}
            <BottomNavbar />
        </div>
    )
}
export default Followers;