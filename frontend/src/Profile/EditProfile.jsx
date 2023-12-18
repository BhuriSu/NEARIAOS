import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BackgroundEditContainer, BackgroundEditProfile, SubmitContainer,
  StyledLabel, EditInput, EditButton } from "./profileElements";
const EditPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState({
    username: "",
    dob: "",
    beverage: "",
    workplace: "",
    favorite: "",
    about: "" 
  });

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:27017/profiles/${id}`);
      setProfile({
        username: response.data.username,
        dob: response.data.dob,
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

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:27017/profiles/${id}`, profile);
      toast.success("Updated a product successfully");
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
        Edit a Product
      </BackgroundEditProfile>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <form onSubmit={updateProduct}>
            <SubmitContainer>
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
                  value={profile.dob}
                  onChange={(e) =>
                    setProfile({ ...profile, dob: e.target.value })
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

                {profile.image && (
                  <div className="w-1/2 border rounded p-2 mt-4 ">
                    <img className="w-full" src={profile.image} />
                  </div>
                )}
              </SubmitContainer>
              <div>
                <EditButton>
                  Update
                </EditButton>
              </div>
          </form>
        </>
      )}
    </BackgroundEditContainer>
  );
};

export default EditPage;