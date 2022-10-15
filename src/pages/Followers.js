import { useCallback, useEffect, useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import { useParams } from "react-router-dom";
import User from "../components/User";
import api from "../api"


function Followers() {
    const [followers, setFollowers] = useState(null)
    const { userId } = useParams();

    const getFollowers = useCallback(() => {
        api.get(`/users/${userId}/followers`)
            .then(followers => setFollowers(followers.data))
            .catch(err => console.log(err))
    }, [userId])
    useEffect(() => { getFollowers() }, [getFollowers])


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