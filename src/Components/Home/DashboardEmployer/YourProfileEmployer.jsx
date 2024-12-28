import React, { useEffect, useRef, useState } from 'react';
import Sidebar from "../Dashboard/Sidebar";
import Header from './HeaderEmployer';
import Map from './Movable';

const YourProfile = () => {
  // State variables
  const [profileUrl, setProfileUrl] = useState('');
  const [aboutCompany, setAboutCompany] = useState('');
  const [socialNetworks, setSocialNetworks] = useState([{ network: '', facebook: '', url: '' }]);
  const networkOptions = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'Other'];
  const [contactAddress, setContactAddress] = useState('');
  const [location, setLocation] = useState('');
  const [mapsLocation, setMapsLocation] = useState('');
  const [image, setImage] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [error, setError] = useState(null);
  const [employerName, setEmployerName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [foundedDate, setFoundedDate] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [introductionVideoURL, setIntroductionVideoURL] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [members, setMembers] = useState([{ isExpanded: false }]);
  const [coordinates, setCoordinates] = useState(["Set to your Location","Set to your Location"]);

  // Function to toggle expansion for a specific member
  const toggleMemberExpansion = (index) => {
    const newMembers = [...members];
    newMembers[index].isExpanded = !newMembers[index].isExpanded;
    setMembers(newMembers);
  };

  // Function to add a new member
  const addMember = () => {
    setMembers([...members, { isExpanded: false }]);
  };


  // Function to remove a member
  const removeMember = (index) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };
  
    const categories = [
      'School',
      'Coaching',
      'Private Tutor',
    ];

  // Construct the Google Maps embed URL using your API key and state values
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14601.43043416873!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1720685384704!5m2!1sen!2sin`;

 // Handler to update latitude state based on user input
 const handleLatitudeChange = (e) => {
  const newLatitude = parseFloat(e.target.value) || 0;
  setLatitude(newLatitude);
};

// Handler to update longitude state based on user input
const handleLongitudeChange = (e) => {
  const newLongitude = parseFloat(e.target.value) || 0;
  setLongitude(newLongitude);
};
  const handleNetworkChange = (index, event) => {
    const newSocialNetworks = socialNetworks.slice();
    newSocialNetworks[index][event.target.name] = event.target.value;
    setSocialNetworks(newSocialNetworks);
  };

  const addSocialNetwork = () => {
    setSocialNetworks([...socialNetworks, { network: '', facebook: '', url: '' }]);
  };

  const removeSocialNetwork = (index) => {
    const newSocialNetworks = socialNetworks.slice();
    newSocialNetworks.splice(index, 1);
    setSocialNetworks(newSocialNetworks);
  };

  const savePersonalInfo = async () => {
    try {
      const response = await fetch('https://server.avyudha.com/dashboard/Organization', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWQwZTc4YjI3ODk0NzIzMzUzZTZiNyIsImlhdCI6MTcyMzgyMDM4NH0.oqjrMP1XvsPhYn2dKpDX4AE8rxC9ZlVWlqzBP7URnHM',  // Replace with actual token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // name: employerName,
          // email: email,
          contactNumber: phoneNumber,
          website: website,
          logo: image,
          description: aboutCompany,
          location: {
            type: "Point",
            coordinates: [longitude, latitude],  // Save latitude and longitude
            address: contactAddress,
          },
          category: selectedCategory,
          socialMediaLinks: socialNetworks.reduce((acc, curr) => {
            if (curr.url) {
              acc[curr.network.toLowerCase()] = curr.url;
            }
            return acc;
          }, {}),
          introductionVideoURL: introductionVideoURL,
          members: members.map((member) => ({
            name: member.name || '',
            designation: member.designation || '',
            experience: member.experience || '',
            profileImage: member.profileImage || '',
            socialLinks: {
              facebook: member.facebook || '',
              twitter: member.twitter || '',
              linkedin: member.linkedin || '',
              dribbble: member.dribbble || '',
            },
          })),
          foundedDate: foundedDate,
          companySize: companySize,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();  // get the error message
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      alert('Profile information saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert(`Failed to save profile: ${error.message}`);
    }
  };
  


  const editimage = () => {
    alert('image edited!');
  };

  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('https://server.avyudha.com/getOrg/66979a00d4e9a63603ba044f', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWQwZTc4YjI3ODk0NzIzMzUzZTZiNyIsImlhdCI6MTcyMzgyMDM4NH0.oqjrMP1XvsPhYn2dKpDX4AE8rxC9ZlVWlqzBP7URnHM',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text(); // get the error message from the response
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const data = await response.json();

        // Update state variables with the fetched data
        setEmployerName(data.name);
        setEmail(data.email);
        setPhoneNumber(data.contactNumber);
        setWebsite(data.website);
        setSelectedCategory(data.category);
        setImage(data.logo);
        setAboutCompany(data.description);
        setContactAddress(data.location.address);
        setLatitude(data.location.coordinates[1]);
        setLongitude(data.location.coordinates[0]);
        setCoordinates(data.location?.coordinates || '');
        setMapsLocation(data.mapsLocation || '');
        setImage(data.image || '');
        setSocialNetworks([
          { network: 'LinkedIn', facebook: '', url: data.socialMediaLinks.link },
        ]);
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
        setError(`Failed to fetch profile data: ${error.message}`);
      }
    };

    fetchProfileData();
  }, []);

  const handleCoordinatesChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
    setLatitude(newCoordinates[0]);
    setLongitude(newCoordinates[1]);
    // Optionally, save the new coordinates here or in your database
  };

  // Define the fetchUserCoordinates function here
  const fetchUserCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setError(null); // Clear any previous errors
        },
        (error) => {
          console.error('Error fetching user coordinates:', error);
          setError('Failed to fetch location. Please allow location access and try again.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setError('Geolocation is not supported by this browser.');
    }
  };
  

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Header />
      <div className="flex-1 bg-gray-100">
        <Sidebar />
        <div className="lg:ml-64 lg:mt-18 p-4 lg:p-28 ">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Profile</h1>
        <div className="w-full bg-white p-12 mb-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">My Profile</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
         {/* Featured Image */}
         <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Logo</label>
              <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
            </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Cover Photo</label>
          <input type="file" className="w-full p-2 border border-gray-300 rounded-lg mb-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Employer Name</label>
              <input
                type="text"
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-1"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Founded Date</label>
              <input
                type="date"
                value={foundedDate}
                onChange={(e) => setFoundedDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Size</label>
              <input
                type="text"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Categories</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg mb-1"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Introduction Video URL</label>
              <input
                type="url"
                value={introductionVideoURL}
                onChange={(e) => setIntroductionVideoURL(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
            </div>
          </div>
        </div>


          <div className="w-full bg-white p-4 mb-6 rounded-lg shadow-md">
             {/* Profile URL */}
             <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Profile URL</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" value={profileUrl} onChange={(e) => setProfileUrl(e.target.value)} />
            </div>

            {/* About Company */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">About Company</label>
              <textarea className="w-full p-2 border border-gray-300 rounded-lg" rows="5" value={aboutCompany} onChange={(e) => setAboutCompany(e.target.value)}></textarea>
            </div>
          </div>

        </div>  
        <div className="w-full bg-white p-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Profile Picture</h2>
           <div className="flex mb-8">
            <img
              src={image}
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
          </div>
          <button
            onClick={editimage}
            className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
          >
            Edit
          </button>
        </div>

    <div className="w-full bg-white p-4 mb-6 rounded-lg shadow-md">
          <label className="block text-gray-700 text-l font-bold mb-2">Social Network</label>
          {socialNetworks.map((socialNetwork, index) => (
            <div key={index} className="mb-4">
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">Network {index + 1}</label>
                <select
                  name="network"
                  className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                  value={socialNetwork.network}
                  onChange={(event) => handleNetworkChange(index, event)}
                >
                  <option value="" disabled>Select Network</option>
                  {networkOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              {socialNetwork.network && (
                <>
                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">{socialNetwork.network}</label>
                    <input
                      type="text"
                      name="facebook"
                      placeholder={`${socialNetwork.network} Username`}
                      className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                      value={socialNetwork.facebook}
                      onChange={(event) => handleNetworkChange(index, event)}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">URL</label>
                    <input
                      type="text"
                      name="url"
                      placeholder="URL"
                      className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                      value={socialNetwork.url}
                      onChange={(event) => handleNetworkChange(index, event)}
                    />
                  </div>
                </>
              )}
              <button
                onClick={() => removeSocialNetwork(index)}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-red-700 mb-4"
              >
                Remove Network
              </button>
            </div>
          ))}
          <button
            onClick={addSocialNetwork}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Another Network
          </button>
        </div>

        <div className="w-full bg-white p-4 mb-6 rounded-lg shadow-md">
          <label className="block text-gray-700 text-l font-bold mb-2">Members</label>

          {members.map((member, index) => (
            <div key={index} className="mb-2">
              <div>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                  onClick={() => toggleMemberExpansion(index)}
                >
                  <option>{`Member ${index + 1}`}</option>
                </select>
              </div>

              {member.isExpanded && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg mb-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Designation</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg mb-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg mb-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                    <input
                      type="file"
                      className="w-full p-2 border border-gray-300 rounded-lg mb-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
                    <input
                      type="url"
                      className="w-full p-2 border border-gray-300 rounded-lg mb-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Twitter URL</label>
                    <input
                      type="url"
                      className="w-full p-2 border border-gray-300 rounded-lg mb-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Google Plus URL</label>
                    <input
                      type="url"
                      className="w-full p-2 border border-gray-300 rounded-lg mb-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                    <input
                      type="url"
                      className="w-full p-2 border border-gray-300 rounded-lg mb-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Dribbble URL</label>
                    <input
                      type="url"
                      className="w-full p-2 border border-gray-300 rounded-lg mb-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-lg mb-1"
                      rows="4"
                    ></textarea>
                  </div>
                  <button
                    onClick={() => removeMember(index)}
                    className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 mb-4"
                  >
                    Remove Member
                  </button>
                </>
              )}
            </div>
          ))}

          <button
            onClick={addMember}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-1"
          >
            Add Another Member
          </button>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Employees</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg mb-1"
            />
          </div>
        </div>

        <div className="">
        <div className="bg-white p-6 rounded-lg  mx-auto ml-24">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6">Job Location</h2>
          
          {coordinates ? (
        <Map coordinates={coordinates} onCoordinatesChange={handleCoordinatesChange} />
      ) : (
        <p>Location not available</p>
      )}
        </div>
        <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Contact Address</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={contactAddress}
                    onChange={(e) => setContactAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
      </div>

          <button
            onClick={savePersonalInfo}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-8"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourProfile;
