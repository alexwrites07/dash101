import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const YourProfile = () => {
  const [educationNote, setEducationNote] = useState('');
  const [experienceNote, setExperienceNote] = useState('');
  const [skillsNote, setSkillsNote] = useState('');
  const [educationNotes, setEducationNotes] = useState([]);
  const [experienceNotes, setExperienceNotes] = useState([]);
  const [skillsNotes, setSkillsNotes] = useState([]);
  const [fullName, setFullName] = useState('vikashpanjiyar');
  const [dob, setDOB] = useState('December 26, 2000');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('20-25');
  const [email, setEmail] = useState('vikashpanjiyar2612@gmail.com');
  const [qualification, setQualification] = useState('Bachelor Degree');
  const [experienceTime, setExperienceTime] = useState('Fresh');
  const [languages, setLanguages] = useState(['English', 'Turkish', 'Japanese', 'French']);
  const [salaryType, setSalaryType] = useState('Monthly');
  const [salary, setSalary] = useState('100000');
  const [categories, setCategories] = useState(['Home Tutor', 'Online Tutor', 'School Tutor', 'Advertising', 'Application', 'Customer', 'Design', 'Developer']);
  const [jobTitle, setJobTitle] = useState("I'm a private tutor");
  const [description, setDescription] = useState('');
  const [socialNetworks, setSocialNetworks] = useState(['Network 1']);
  const [contactAddress, setContactAddress] = useState('B hub, 5th floor');
  const [location, setLocation] = useState('Patna');
  const [mapsLocation, setMapsLocation] = useState('B-HUB, Budh Vihar, Fraser Road Area, Patna, Bihar, India');
  const [introductionVideo, setIntroductionVideo] = useState('https://www.youtube.com/');
  const [image, setImage] = useState('https://static.wixstatic.com/media/5a2bf8_4efbddfdec0c49ed94d0dbf3168d6863~mv2.png/v1/fill/w_460,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PROFILE%20LOGO%20white%20letter.png');
  const [latitude, setLatitude] = useState('25.6094616');
  const [longitude, setLongitude] = useState('85.1350599');

  const addNote = (note, setNotes, setNote) => {
    if (note.trim() !== '') {
      setNotes((prevNotes) => [...prevNotes, note]);
      setNote('');
    }
  };

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const addSocialNetwork = () => {
    setSocialNetworks((prevNetworks) => [...prevNetworks, `Network ${prevNetworks.length + 1}`]);
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
        <div className="mt-24 lg:ml-64 lg:mt-24 p-4 lg:p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Profile</h1>
        <div className="w-full bg-white p-4 mb-6 rounded-lg shadow-md">
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
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
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
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Experience Time</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={experienceTime}
                onChange={(e) => setExperienceTime(e.target.value)}
              />
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
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              />
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
            {socialNetworks.map((network, index) => (
              <input
                key={index}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={network}
                readOnly
              />
            ))}
            <button
              onClick={addSocialNetwork}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
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
                <div id="map" className="w-full h-80 border border-gray-300 rounded-lg mb-4">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14601.43043416873!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1720685384704!5m2!1sen!2sin`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
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
