import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BackgroundEditContainer, BackgroundEditProfile, SubmitContainer, StyledLabel, EditInput, EditButton, Avatar, InputAvatar } from "./profileElements";

const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState({
    username: '',
    date: '',
    beverage: '',
    workplace: '',
    favorite: '',
    about: '',
    image: null,
  });

  const [url, setUrl] = useState("");

  const Photo = async (e) => {
    // Your existing Photo function logic for Firebase storage
  };

  const handleImageChange = (e) => {
    Photo(e).then((url) => {
      setUrl(url);
    });
  };

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:27017/profiles/${id}`);
      setProfile({
        username: response.data.username,
        date: response.data.date,
        beverage: response.data.beverage,
        workplace: response.data.workplace,
        favorite: response.data.favorite,
        about: response.data.about,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await Photo(profile.image);

      await axios.patch(`http://localhost:27017/profiles/${id}`, {
        ...profile,
        image: imageUrl,
      });

      toast.success("Updated profile successfully");
      navigate("/profiles");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  
  return (
    <BackgroundEditContainer>
      <BackgroundEditProfile>
        Edit a Profile
      </BackgroundEditProfile>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <form onSubmit={updateProfile}>
            <SubmitContainer>
              
        <div style={{ alignSelf: "center" }}>
        <label htmlFor="image">
        <Avatar style={{ backgroundImage: `url(${url})` } } />
        </label>
        <InputAvatar type="file" id="image" title="upload" onChange={handleImageChange}  />
        </div>

              <div>
                <StyledLabel>
                  Username
                </StyledLabel>
                <EditInput
                  type="text"
                  value={profile.username}
                  onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                  }
                  placeholder="name..."
                />
              </div>
              <div>
                <StyledLabel>
                  Date of birth
                </StyledLabel>
                <EditInput
                  type="date"
                  value={profile.date}
                  onChange={(e) =>
                    setProfile({ ...profile, date: e.target.value })
                  }
                  placeholder="Quantity"
                />
              </div>
              <div>
                <StyledLabel>
                  Beverage
                </StyledLabel>
                <EditInput
                  type="text"
                  value={profile.beverage}
                  onChange={(e) =>
                    setProfile({ ...profile, beverage: e.target.value })
                  }
                  placeholder="Price"
                />
              </div>
              <div>
                <StyledLabel>
                  Workplace
                </StyledLabel>
                <EditInput
                  type="text"
                  value={profile.workplace}
                  onChange={(e) =>
                    setProfile({ ...profile, workplace: e.target.value })
                  }
                  placeholder="Image URL"
                />
                </div>
                <div>
                <StyledLabel>
                  Favorite
                </StyledLabel>
                <EditInput
                  type="text"
                  value={profile.favorite}
                  onChange={(e) =>
                    setProfile({ ...profile, favorite: e.target.value })
                  }
                  placeholder="Image URL"
                />
                </div>
                <div>
                <StyledLabel>
                  About
                </StyledLabel>
                <EditInput
                  type="text"
                  value={profile.about}
                  onChange={(e) =>
                    setProfile({ ...profile, about: e.target.value })
                  }
                  placeholder="Image URL"
                />
                </div>
                <div>
                <EditButton>
                  Update
                </EditButton>
              </div>

              </SubmitContainer>
          </form>
        </>
      )}
    </BackgroundEditContainer>
  );
};

export default EditPage;