import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

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
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold text-2xl mb-4 block text-center">
        Edit a Product
      </h2>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <form onSubmit={updateProduct}>
            <div className="space-y-2">
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Username
                </label>
                <input
                  type="text"
                  value={profile.username}
                  onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="name..."
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Date of birth
                </label>
                <input
                  type="date"
                  value={profile.dob}
                  onChange={(e) =>
                    setProfile({ ...profile, dob: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Quantity"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Beverage
                </label>
                <input
                  type="text"
                  value={profile.beverage}
                  onChange={(e) =>
                    setProfile({ ...profile, beverage: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Price"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Workplace
                </label>
                <input
                  type="text"
                  value={profile.workplace}
                  onChange={(e) =>
                    setProfile({ ...profile, workplace: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Image URL"
                />
                </div>
                <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Favorite
                </label>
                <input
                  type="text"
                  value={profile.favorite}
                  onChange={(e) =>
                    setProfile({ ...profile, favorite: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Image URL"
                />
                </div>
                <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  About
                </label>
                <input
                  type="text"
                  value={profile.about}
                  onChange={(e) =>
                    setProfile({ ...profile, about: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Image URL"
                />
                </div>

                {profile.image && (
                  <div className="w-1/2 border rounded p-2 mt-4 ">
                    <img className="w-full" src={profile.image} />
                  </div>
                )}
              </div>
              <div>
                <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
                  Update
                </button>
              </div>
          </form>
        </>
      )}
    </div>
  );
};

export default EditPage;