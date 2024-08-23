import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Map from './Movable';

const YourProfile = () => {
// State variables
const [educationNote, setEducationNote] = useState('');
const [experienceNote, setExperienceNote] = useState('');
const [skillsNote, setSkillsNote] = useState('');
const [educationNotes, setEducationNotes] = useState([]);
const [experienceNotes, setExperienceNotes] = useState([]);
const [skillsNotes, setSkillsNotes] = useState([]);
const [fullName, setFullName] = useState('');
const [classes, setclasses] = useState('X');
const [gender, setGender] = useState('');
const [highestQualification, setHighestQualification] = useState('');
const [age, setAge] = useState('');
const [email, setEmail] = useState('');
const [qualification, setQualification] = useState('');
const [experienceTime, setExperienceTime] = useState('');
const [languages, setLanguages] = useState([]);
const [salaryType, setSalaryType] = useState(0);

const [coordinates, setCoordinates] = useState({ lat: 51.505, lng: -0.09 });
const [salary, setSalary] = useState(0);
const [categories, setCategories] = useState([]);
const [jobTitle, setJobTitle] = useState('');
const [parentPhone, setparentPhone ] = useState('');
const [description, setDescription] = useState('');
const [socialNetworks, setSocialNetworks] = useState([{ network: '', facebook: '', url: '' }]);
const networkOptions = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'Other'];
const [contactAddress, setContactAddress] = useState('');
const [contactAddress1, setContactAddress1] = useState('');
const [location, setLocation] = useState('');
const [mapsLocation, setMapsLocation] = useState('');
const [introductionVideo, setIntroductionVideo] = useState('');
const [image, setImage] = useState('');
const [latitude, setLatitude] = useState('');
const [longitude, setLongitude] = useState('');
const [error, setError] = useState(null); // To handle errors if geolocation fails
const [endpoint, setEndpoint] = useState('tutor'); // Default to 'tutor'
  useEffect(() => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');
    setEndpoint(type);

    const fetchData = async () => {
      try {
        const response = await fetch(`https://backend.akshayy.tech/dashboard/${type}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          // Update state with fetched data
          setFullName(data.fullName || '');
          setclasses(data.class || '');
          setEmail (data.email);
          setHighestQualification(data.highestQualification);
          setGender(data.gender || '');
          setAge(data.age || '');
          setEmail(data.email || '');
          setHighestQualification(data.highestQualification || '');
          setExperienceTime(data.totalExperience || '');
          setLanguages(data.languages || []);
          setSalaryType(data.jobAlerts?.maxExpectedSalary.value || '');
          setSalary(data.jobAlerts?.minExpectedSalary.value || '');
          setDescription(data.description || '');
          setparentPhone (data.parentPhone || '');
          setIntroductionVideo(data.video);
          setLocation(data.location?.city || '');
          setLatitude(data.location?.coordinates[0]);
          setLatitude(data.location?.coordinates[1]);
          setCategories(data.categories || []);
          
        
          setContactAddress(data.location?.address || '');
          setContactAddress1(data.contactNumber || '');
          
          
          setMapsLocation(data.mapsLocation || '');
          setImage(data.image || '');
          // setImage(data.profileImageURL || '');
          setCoordinates(data.location?.coordinates || '');
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Re-run the effect when the type changes

  const addNote = (note, setNotes, setNote) => {
    if (note.trim() !== '') {
      setNotes((prevNotes) => [...prevNotes, note]);
      setNote('');
    }
  };
  const handleCoordinatesChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
    setLatitude(newCoordinates[0]);
    setLongitude(newCoordinates[1]);
    // Optionally, save the new coordinates here or in your database
  };

  const handleNetworkChange = (index, event) => {
    const newSocialNetworks = [...socialNetworks];
    newSocialNetworks[index][event.target.name] = event.target.value;
    setSocialNetworks(newSocialNetworks);
  };

  const addSocialNetwork = () => {
    setSocialNetworks([...socialNetworks, { network: '', url: '' }]);
  };

  const removeSocialNetwork = (index) => {
    const newSocialNetworks = [...socialNetworks];
    newSocialNetworks.splice(index, 1);
    setSocialNetworks(newSocialNetworks);
  };
  const savePersonalInfo2 = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://backend.akshayy.tech/dashboard/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // fullName,
          class: classes,
          // gender,
          // age,
          // email,
          // highestQualification,
          // totalExperience:experienceTime,
          // languages,
          // jobAlerts: {
          //   minExpectedSalary: {
          //       value: salary,
                
          //   },
          //   maxExpectedSalary: {
          //     value: maxExpectedSalary,
              


          // },
          // },
          parentPhone,
          // categories,
          // description:description,
          location: {
            
            address: contactAddress,
            city: location,
            coordinates:
            [latitude,longitude]
          },
          
          
          image,
          
        }),
      });
      console.log (response);
      console.log(coordinates);
      console.log(token);
      if (response.ok) {
        alert('Profile information saved successfully!');
      } else {
        alert('Failed to save profile information.');
        console.log(response);
      }
    } catch (error) {
      console.error('Error saving profile information:', error);
      alert('An error occurred while saving your profile information.');
    }
  };
  const savePersonalInfoLoc = async () => {
    
      try {
        const token = localStorage.getItem('token');
    
        // Create the body object and assign values using dot notation
        const body = {};
     
    
    
        body.location = {};
        body.location.address = contactAddress;
        body.location.city = location;
        body.location.coordinates = [latitude, longitude];
    
        // body.image = image;
    
        // Send the request
        const response = await fetch(`https://backend.akshayy.tech/dashboard/${endpoint}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
    
        console.log(response);
        console.log(description);
        console.log(token);
    
        if (response.ok) {
          alert('Profile information saved successfully!');
        } else {
          alert('Failed to save profile information.');
          console.log(response);
        }
      } catch (error) {
        console.error('Error saving profile information:', error);
        alert('An error occurred while saving your profile information.');
      }
  };
  const savePersonalInfo12 = async () => {
    try {
      const token = localStorage.getItem('token');
  
      // Create the body object and assign values using dot notation
      const body = {
   
        jobAlerts: {
          minExpectedSalary: { value: salary },
          maxExpectedSalary: { value: salaryType }
        }
      };
  
      console.log('Request Body:', JSON.stringify(body, null, 2));
  
      const response = await fetch(`https://backend.akshayy.tech/dashboard/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      const responseData = await response.json();
      console.log('Response Data:', responseData);
  
      if (response.ok) {
        alert('Profile information saved successfully!');
      } else {
        alert('Failed to save profile information.');
        console.log(response);
      }
    } catch (error) {
      console.error('Error saving profile information:', error);
      alert('An error occurred while saving your profile information.');
    }


  }
  const savePersonalInfo = async () => {
    try {
      const token = localStorage.getItem('token');
  
      // Create the body object and assign values using dot notation
      const body = {
        gender,
        highestQualification,
        totalExperience: experienceTime,

      contactNumber :contactAddress1,
      description : description,
       
      };
  
      console.log('Request Body:', JSON.stringify(body, null, 2));
  
      const response = await fetch(`https://backend.akshayy.tech/dashboard/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      const responseData = await response.json();
      console.log('Response Data:', responseData);
  
      if (response.ok) {
        alert('Profile information saved successfully!');
      } else {
        alert('Failed to save profile information.');
        console.log(response);
      }
    } catch (error) {
      console.error('Error saving profile information:', error);
      alert('An error occurred while saving your profile information.');
    }
  };
  
  

  const saveEducationNotes = () => {
    alert('Education notes saved!');
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
          
          {endpoint === 'tutor' && (
            <div className="w-full bg-white p-12 mb-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Tutor Profile</h2>
              <div className="">
              
                  <label className="block text-gray-700 text-sm font-bold mb-2">Profile Image URL</label><div>
                <img className='w-16 h-16 ' src={image}></img></div>
           
              </div><br></br>
             
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={fullName}
                    
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={email}
                    
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                   
                  </input>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Highest Qualification</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={highestQualification}
                    onChange={(e) => setHighestQualification(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Experience</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={experienceTime}
                    onChange={(e) => setExperienceTime(e.target.value)}
                  />
                </div>

                {/* <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Languages</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={languages.join(', ')}
                    onChange={(e) => setLanguages(e.target.value.split(',').map(lang => lang.trim()))}
                  />
                </div> */}

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Max Salary</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={salaryType}
                    onChange={(e) => setSalaryType(e.target.value)}
                  />
                </div> 

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Min Salary</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Contact Number</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={contactAddress1}
                    onChange={(e) => setContactAddress1(e.target.value)}
                  />
                </div>
                

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                  <textarea
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

           

                

                {/* <div className="mb-8">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Introduction Video URL</label>
                 <Video><source src={introductionVideo}></source></Video>
                </div> */}

                


                

                
              </div>
              <button
                  onClick={savePersonalInfo}
                  className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
                >
                  Save
                </button>
                <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Education Notes</h3>
              <textarea
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={educationNote}
                onChange={(e) => setEducationNote(e.target.value)}
              />
              <button
                onClick={() => addNote(educationNote, setEducationNotes, setEducationNote)}
                className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Note
              </button>
              <ul className="list-disc ml-6 mt-4">
                {educationNotes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Experience Notes</h3>
              <textarea
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={experienceNote}
                onChange={(e) => setExperienceNote(e.target.value)}
              />
              <button
                onClick={() => addNote(experienceNote, setExperienceNotes, setExperienceNote)}
                className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Note
              </button>
              <ul className="list-disc ml-6 mt-4">
                {experienceNotes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Skills Notes</h3>
              <textarea
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={skillsNote}
                onChange={(e) => setSkillsNote(e.target.value)}
              />
              <button
                onClick={() => addNote(skillsNote, setSkillsNotes, setSkillsNote)}
                className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Note
              </button>
              <ul className="list-disc ml-6 mt-4">
                {skillsNotes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
            </div>
          )}

{endpoint === 'student' && (
            <div className="w-full bg-white p-12 mb-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Student Profile</h2>
              <div className="flex mb-8">
                <img
                  src={image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full"
                />
              </div>
             
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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


             

                {/* <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Languages</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={languages.join(', ')}
                    onChange={(e) => setLanguages(e.target.value.split(',').map(lang => lang.trim()))}
                  />
                </div> */}

              


                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Class</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={classes}
                    onChange={(e) => setclasses(e.target.value)}
                  />
                </div>

           

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Contact Number</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={parentPhone}
                    onChange={(e) => setparentPhone (e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={location.city}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                </div></div>
                )}
     <button
                  onClick={savePersonalInfo2}
                  className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
                >
                  Save
                </button>
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Other Sections</h2>
            

           

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Social Networks</h3>
              {socialNetworks.map((network, index) => (
                <div key={index} className="mb-4">
                  <div className="flex mb-2">
                    <input
                      type="text"
                      name="network"
                      value={network.network}
                      onChange={(event) => handleNetworkChange(index, event)}
                      placeholder="Network"
                      className="w-1/3 p-2 border border-gray-300 rounded-lg mr-2"
                    />
                    <input
                      type="text"
                      name="facebook"
                      value={network.facebook}
                      onChange={(event) => handleNetworkChange(index, event)}
                      placeholder="Facebook URL"
                      className="w-1/3 p-2 border border-gray-300 rounded-lg mr-2"
                    />
                    <input
                      type="text"
                      name="url"
                      value={network.url}
                      onChange={(event) => handleNetworkChange(index, event)}
                      placeholder="URL"
                      className="w-1/3 p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button
                    onClick={() => removeSocialNetwork(index)}
                    className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={addSocialNetwork}
                className="py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Network
              </button>
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
      </div>
      <button
                className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={savePersonalInfoLoc}
              >
                Save Personal Info
              </button>
              <button
                className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={savePersonalInfo12}
              >
                Save Job
              </button>
            </div></div>
</div>

  );
};

              {/* Save Buttons */}
  

export default YourProfile;
