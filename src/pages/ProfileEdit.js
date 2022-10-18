import { useState, useContext } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";

function ProfileEdit() {
    const { user, refresh: refreshUser } = useContext(AuthContext);
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [location, setLocation] = useState("")
    const [tags, setTags] = useState([])
    const [website, setWebsite] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [github, setGithub] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("")
    const { userId } = useParams()

    const navigate = useNavigate()

    const handleUsernameInput = e => setUsername(e.target.value);
    const handleBioInput = e => setBio(e.target.value);
    const handleLocationInput = e => setLocation(e.target.value);
    const handleTagsInput = e => {
        const arr = e.target.value.push
        setTags(arr)
    };
    const handleWebsiteInput = e => setWebsite(e.target.value);
    const handleLinkedinInput = e => setLinkedin(e.target.value);
    const handleGithubInput = e => setGithub(e.target.value);

    const handleFileUpload = (e) => {
        console.log("e.target.files", e.target.files[0])
        const uploadData = new FormData();
        uploadData.append("avatarUrl", e.target.files[0]);
        api().post(`/upload`, uploadData)
            .then((response) => {
                setAvatarUrl(response.data)
            })
            .catch(err => console.log("Error while uploading file:", err))
    };


    const handleProfileSubmit = (e) => {
        e.preventDefault();
        const requestBody = { username, bio, location, tags, website, linkedin, github, avatarUrl };
        api().patch(`/users/${user._id}`, requestBody)
            .then(() => {
                refreshUser()
                navigate(`/users/${userId}`)
            })
            .catch(err => console.log(err));
    };

    if (!user) return "loading"

    return (
        <div className="ProfileEdit">
            <TopNavbar />
            <form onSubmit={handleProfileSubmit}>
                <label>
                    Username : <input type="text" name="username" value={username} onChange={handleUsernameInput} placeholder={user.username} />
                </label>
                <label>
                    Bio : <input type="text" name="bio" value={bio} onChange={handleBioInput} placeholder={user.bio} />
                </label>
                <label>
                    Location : <input type="text" name="location" value={location} onChange={handleLocationInput} placeholder={user.location} />
                </label>
                <label>
                    Tags : <select name="tags" value={tags} onChange={handleTagsInput} placeholder={user.tags} multiple>
                        <option value=""></option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JS">JS</option>
                        <option value="TYPESCRIPT">TYPESCRIPT</option>
                        <option value="PYTHON">PYTHON</option>
                        <option value="C">C</option>
                        <option value="PHP">PHP</option>
                        <option value="PYTHON">PYTHON</option>
                        <option value="C#">C#</option>
                        <option value="c++">c++</option>
                        <option value="REACTJS">REACTJS</option>
                        <option value="VUEJS">VUEJS</option>
                        <option value="NEXTJS">NEXTJS</option>
                    </select>
                </label>
                <label>
                    Website : http://www.<input type="text" name="website" value={website} onChange={handleWebsiteInput} placeholder={`  ${user.website}`} />
                </label>
                <label>
                    Linkedin : http://www.<input type="text" name="linkedin" value={linkedin} onChange={handleLinkedinInput} placeholder={`  ${user.linkedin}`} />
                </label>
                <label>
                    Github : http://www.<input type="text" name="github" value={github} onChange={handleGithubInput} placeholder={`  ${user.github}`} />
                </label>
                <label>
                    Profile image<input type="file" name="avatarUrl" id="uploadImg  " onChange={handleFileUpload} />
                </label>
                <button type="submit">SUBMIT</button>
            </form>
            <BottomNavbar />
        </div>)
}

export default ProfileEdit