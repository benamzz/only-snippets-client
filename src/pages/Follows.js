import { useCallback, useEffect, useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import { useParams } from "react-router-dom";
import User from "../components/User";
import api from "../api"


function Follows() {
    const { userId } = useParams();
    const [follows, setFollows] = useState(null)

    const getFollows = useCallback(() => {
        api.get(`/users/${userId}`)
            .then(userFromApi => setFollows(userFromApi.data.following))
            .catch(err => console.log("err", err));
    }, [userId]);
    useEffect(() => { getFollows() }, [getFollows]);

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