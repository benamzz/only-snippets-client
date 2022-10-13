import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function ProfileEdit() {
    const { user } = useContext(AuthContext);
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [location, setLocation] = useState("")
    const [tags, setTags] = useState([])
    const [website, setWebsite] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [github, setGithub] = useState("")
    const [file, setFile] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState("")
    const { userId } = useParams()
    const API_URL = "http://localhost:5005";
    const storedToken = localStorage.getItem("authToken");

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
    const handleAvatarInput = e => setFile(e.target.files[0])

    const fileUploadHandler = () => {
        axios.post(`${API_URL}/api/upload`, file,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then((response) => { setAvatarUrl(response) })
            .catch(err => console.log(err))
    }

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        if (file) {
            fileUploadHandler()
        }
        const requestBody = { username, bio, location, tags, website, linkedin, github, avatarUrl };
        axios.patch(`${API_URL}/api/users/${user._id}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                fileUploadHandler()
                navigate(`/users/${userId}`)
            })
            .catch(err => console.log(err));
    };

    console.log("file", file)

    if (!user) return "loading"

    return (<div className="ProfileEdit">
        <form onSubmit={handleProfileSubmit}>
            <label>
                Username<input type="text" name="username" value={username} onChange={handleUsernameInput} placeholder={user.username} />
            </label>
            <label>
                Bio<input type="text" name="bio" value={bio} onChange={handleBioInput} placeholder={user.bio} />
            </label>
            <label>
                Location<input type="text" name="location" value={location} onChange={handleLocationInput} placeholder={user.location} />
            </label>
            <label>
                Tags<select name="tags" value={tags} onChange={handleTagsInput} placeholder={user.tags} multiple>
                    <option value=""></option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JS">JS</option>
                    <option value="PYTHON">PYTHON</option>
                    <option value="C">C</option>
                </select>
            </label>
            <label>
                Website<input type="text" name="website" value={website} onChange={handleWebsiteInput} placeholder={user.website} />
            </label>
            <label>
                Linkedin<input type="text" name="linkedin" value={linkedin} onChange={handleLinkedinInput} placeholder={user.linkedin} />
            </label>
            <label>
                Github<input type="text" name="github" value={github} onChange={handleGithubInput} placeholder={user.github} />
            </label>
            <label>
                Avatar <input type="file" name="avatarUrl" onChange={handleAvatarInput} />
                <button type="submit" onClick={fileUploadHandler}>Upload image</button>
            </label>
            <button type="submit">SUBMIT</button>
        </form>
    </div>)
}

export default ProfileEdit