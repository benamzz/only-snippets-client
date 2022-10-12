import { useCallback, useEffect, useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import User from "../components/User";


function Follows() {
    const API_URL = "http://localhost:5005";
    const { userId } = useParams();
    const [follows, setFollows] = useState(null)

    const getUser = useCallback(() => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${API_URL}/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((userFromApi) => {
                setFollows(userFromApi.data.following);
            })
            .catch((err) => console.log("err", err));
    }, [userId]);
    useEffect(() => { getUser() }, [getUser]);

    if (!follows) return "loading";

    return (
        <div className="FollowersList">
            <TopNavbar />
            {follows && (follows.map(el => {
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
export default Follows;