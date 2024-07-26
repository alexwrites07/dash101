import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';


const YourProfile = () => {
  const [educationNote, setEducationNote] = useState('');
  const [experienceNote, setExperienceNote] = useState('');
  const [skillsNote, setSkillsNote] = useState('');
  const [educationNotes, setEducationNotes] = useState([]);
  const [experienceNotes, setExperienceNotes] = useState([]);
  const [skillsNotes, setSkillsNotes] = useState([]);
  const [fullName, setFullName] = useState('vikashpanjiyar');
  const [dob, setDOB] = useState('December 26, 2000');
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState('vikashpanjiyar2612@gmail.com');
  const [qualification, setQualification] = useState("");
  const [experienceTime, setExperienceTime] = useState('Fresh');
  const [languages, setLanguages] = useState(['English', 'Turkish', 'Japanese', 'French']);
  const [salaryType, setSalaryType] = useState("");
  const [salary, setSalary] = useState('100000');
  const [categories, setCategories] = useState(['Home Tutor', 'Online Tutor', 'School Tutor', 'Advertising', 'Application', 'Customer', 'Design', 'Developer']);

  const [jobTitle, setJobTitle] = useState("I'm a private tutor");
  const [description, setDescription] = useState('');
  const [socialNetworks, setSocialNetworks] = useState([{ network: '', facebook: '', url: '' }]);
  const networkOptions = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'Other'];
  const [contactAddress, setContactAddress] = useState('B hub, 5th floor');
  const [location, setLocation] = useState('Patna');
  const [mapsLocation, setMapsLocation] = useState('B-HUB, Budh Vihar, Fraser Road Area, Patna, Bihar, India');
  const [introductionVideo, setIntroductionVideo] = useState('https://www.youtube.com/');
  const [image, setImage] = useState('https://static.wixstatic.com/media/5a2bf8_4efbddfdec0c49ed94d0dbf3168d6863~mv2.png/v1/fill/w_460,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PROFILE%20LOGO%20white%20letter.png');
  const [latitude, setLatitude] = useState(25.6094616);
  const [longitude, setLongitude] = useState(85.1350599);
  //const mapRef = useRef(null);
  //const markerRef = useRef(null);

  const mapSrc = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14601.43043416873!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1720685384704!5m2!1sen!2sin`;


  // useEffect(() => {
  //   // Initialize the map with a hidden element
  //   const map = new window.google.maps.Map(mapRef.current, {
  //     center: { lat: latitude, lng: longitude },
  //     zoom: 13,
  //   });

  //   // Initialize the marker
  //   const marker = new window.google.maps.Marker({
  //     position: { lat: latitude, lng: longitude },
  //     map: map,
  //     draggable: true,
  //   });
  //   markerRef.current = marker;

  //   // Add event listener for marker drag end
  //   marker.addListener('dragend', function (event) {
  //     const newLat = event.latLng.lat();
  //     const newLng = event.latLng.lng();
  //     setLatitude(newLat);
  //     setLongitude(newLng);
  //   });

  //   return () => {
  //     window.google.maps.event.clearListeners(marker, 'dragend');
  //   };
  // }, []);

  // useEffect(() => {
  //   if (markerRef.current) {
  //     markerRef.current.setPosition({ lat: latitude, lng: longitude });
  //   }
  // }, [latitude, longitude]);

  const addNote = (note, setNotes, setNote) => {
    if (note.trim() !== '') {
      setNotes((prevNotes) => [...prevNotes, note]);
      setNote('');
    }
  };

  const handleLatitudeChange = (e) => {
    setLatitude(parseFloat(e.target.value));
  };

  const handleLongitudeChange = (e) => {
    setLongitude(parseFloat(e.target.value));
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

  const savePersonalInfo = () => {
    alert('Personal information saved!');
  };

  const saveEducationNotes = () => {
    alert('Education notes saved!');
  };

  const editimage = () => {
    alert('image edited!');
  };

  const saveExperienceNotes = () => {
    alert('Experience notes saved!');
  };

  const saveSkillsNotes = () => {
    alert('Skills notes saved!');
  };

  

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Header />
      <div className="flex-1 bg-gray-100">
        <Sidebar />
        <div className="mt-12 lg:ml-64 lg:mt-12 p-4 lg:p-28">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Profile</h1>
        <div className="w-full bg-white p-12 mb-4 rounded-lg shadow-md">
         <h2 className="text-xl font-semibold mb-4 text-gray-900">Personal Information</h2>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              >
                <option value="">Select Age Range</option>
                <option value="18-20">18-20</option>
                <option value="20-25">20-25</option>
                <option value="25-30">25-30</option>
                <option value="30-35">30-35</option>
                <option value="35-40">35-40</option>
                <option value="40-45">40-45</option>
                <option value="45-50">45-50</option>
                <option value="50-55">50-55</option>
                <option value="55-60">55-60</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Qualification</label>
              <select
                 className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                 value={qualification}
                 onChange={(e) => setQualification(e.target.value)}
              >
                <option value="">Select Qualification</option>
                <option value="Certificate">Certificate</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelor Degree">Bachelor Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate Degree">Doctorate Degree</option>
              </select>
            </div>

            <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Experience Time</label>
              <select
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                  value={experienceTime}
                  onChange={(e) => setExperienceTime(e.target.value)}
              >
                <option value="">Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7+ Year">7+ Year</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Languages</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={languages.join(', ')}
                onChange={(e) => setLanguages(e.target.value.split(', '))}
              />
            </div>

            <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Salary Type</label>
              <select
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                  value={salaryType}
                  onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="">Salary Type</option>
                <option value="Hourly">Hourly</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly<">Yearly</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Salary (₹)</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Categories</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={categories.join(', ')}
                onChange={(e) => setCategories(e.target.value.split(', '))}
              />
            </div>
          </div>

          <button
            onClick={savePersonalInfo}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-8"
          >
            Save Personal Information
          </button>

          <div className="w-full bg-white p-4 mb-6 rounded-lg shadow-md">
            <label className="block text-gray-700 text-sm font-bold mb-2">Job Title</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />

            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            onClick={savePersonalInfo}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-8"
          >
            Save Job Information
          </button>
        </div>  

      <div className="w-full bg-white p-4 mb-6 rounded-lg shadow-md">
          <label className="block text-gray-700 text-sm font-bold mb-2">Social Network</label>
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
                className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 mb-4"
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

          <button
            onClick={savePersonalInfo}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-8"
          >
            Save Social Network Information
          </button>

          <div className="w-full bg-white p-4 mb-6 rounded-lg shadow-md">
            <label className="block text-gray-700 text-sm font-bold mb-2">Contact Information</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={contactAddress}
              onChange={(e) => setContactAddress(e.target.value)}
            />

            <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <label className="block text-gray-700 text-sm font-bold mb-2">Maps Location</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={mapsLocation}
              onChange={(e) => setMapsLocation(e.target.value)}
            />

                <div className="relative mb-4">
                  <div className="relative w-full h-80 border border-gray-300 rounded-lg mb-4">
                    <iframe
                      src={mapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div
                      className="absolute"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -100%)',
                        pointerEvents: 'none',
                      }}
                    >
                      <img
                        src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                        alt="Red Marker"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="latitude" className="block mb-2">
                      Latitude:
                    </label>
                    <input
                      type="text"
                      id="latitude"
                      name="latitude"
                      value={latitude}
                      onChange={handleLatitudeChange}
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="longitude" className="block mb-2">
                      Longitude:
                    </label>
                    <input
                      type="text"
                      id="longitude"
                      name="longitude"
                      value={longitude}
                      onChange={handleLongitudeChange}
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                </div>
            </div>

          <button
            onClick={savePersonalInfo}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-8"
          >
            Save Contact Information
          </button>

          <div className="w-full bg-white p-4 mb-6 rounded-lg shadow-md">
            <label className="block text-gray-700 text-sm font-bold mb-2">Introduction Video</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={introductionVideo}
              onChange={(e) => setIntroductionVideo(e.target.value)}
            />
          </div>

          <button
            onClick={savePersonalInfo}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-8"
          >
            Save Introduction Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourProfile;
