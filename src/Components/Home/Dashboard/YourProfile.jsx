import React, { useEffect, useState, Link } from 'react';
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
const [tags, setTags] = useState('X');
const [rating, setRating] = useState('X');
const [gender, setGender] = useState('');
const [video, setVideo] = useState('');
const [highestQualification, setHighestQualification] = useState('');
const [age, setAge] = useState('');
const [email, setEmail] = useState('');
const [qualification, setQualification] = useState('');
const [experienceTime, setExperienceTime] = useState('');
const [languages, setLanguages] = useState([]);
const [salaryType, setSalaryType] = useState(0);
const [salaryPeriod, setSalaryPeriod] = useState(0);

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
const [coordinates, setCoordinates] = useState(["Set to your Location","Set to your Location"]);




const [dob, setDOB] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');
    setEndpoint(type);

    const fetchData = async () => {
      try {
        const response = await fetch(`https://server.avyudha.com/dashboard/${type}`, {
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
          setSalaryPeriod(data.jobAlerts?.maxExpectedSalary.period || '');
          setSalary(data.jobAlerts?.minExpectedSalary.value || '');
          setDescription(data.description || '');
          setparentPhone (data.parentPhone || '');
          
          setLocation(data.location?.city || '');
          setRating (data.rating || '');
          setCategories(data.categories || []);
          setTags(data.tags || '');
        
          setContactAddress(data.location?.address || '');
          setContactAddress1(data.contactNumber || '');
          setVideo(data.video|| '');
          
          setMapsLocation(data.mapsLocation || '');
          setImage(data.image || '');
          // setImage(data.profileImageURL || '');
          setCoordinates(data.location?.coordinates || '');





          setFullName(data.fullName);
          setEmail(data.email);
          setDOB(new Date(data.dob).toISOString().slice(0, 10));


          setGender(data.gender);
          setQualification(data.highestQualification);
          setExperienceTime(data.totalExperience);
          setLanguages(data.languages || []);
          setSalary(data.salary || '');
          setCategories(data.tags || []);
          setDescription(data.description);
          setContactAddress(data.location.address);
          setLocation(data.location.city);
          setMapsLocation(data.location.address);
          setLatitude(data.location.coordinates[1]);
          setLongitude(data.location.coordinates[0]);
          // setImage(data.image || '');
          
          
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Re-run the effect when the type changes
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14601.43043416873!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1720685384704!5m2!1sen!2sin`;

  const addNote = (note, setNotes, setNote) => {
    if (note.trim() !== '') {
      setNotes((prevNotes) => [...prevNotes, note]);
      setNote('');
    }
  };

 // Handler to update latitude state based on user input
 const handleLatitudeChange = (e) => {
  const newLatitude = parseFloat(e.target.value) || 0;
  setLatitude(newLatitude);
};
const qualifications = [
  "B.Sc. in Physics",
  "B.Sc. in Chemistry",
  "B.Sc. in Biology",
  "B.Sc. in Mathematics",
  "B.Sc. in Computer Science",
  "B.Sc. in Environmental Science",
  "B.Sc. in Biotechnology",
  "B.Sc. in Microbiology",
  "B.Sc. in Biochemistry",
  "B.Sc. in Zoology",
  "B.Sc. in Botany",
  "B.Sc. in Geology",
  "B.Sc. in Statistics",
  "B.Sc. in Food Science",
  "B.Sc. in Nutrition",
  "B.Com (General)",
  "B.Com (Honors)",
  "BBA (Bachelor of Business Administration)",
  "BMS (Bachelor of Management Studies)",
  "Finance",
  "Marketing",
  "Human Resource Management",
  "B.A. in English",
  "B.A. in Hindi",
  "B.A. in History",
  "B.A. in Geography",
  "B.A. in Political Science",
  "B.A. in Sociology",
  "B.A. in Psychology",
  "B.A. in Philosophy",
  "B.A. in Economics",
  "B.A. in Anthropology",
  "B.A. in Education",
  "B.A. in Journalism and Mass Communication",
  "B.A. in Fine Arts",
  "B.A. in Performing Arts",
  "B.A. in Sanskrit",
  "B.A. in Regional Languages",
  "B.A. in Foreign Languages",
  "B.Tech/B.E. in Mechanical Engineering",
  "B.Tech/B.E. in Civil Engineering",
  "B.Tech/B.E. in Electrical Engineering",
  "B.Tech/B.E. in Computer Science Engineering",
  "B.Tech/B.E. in Electronics and Communication Engineering",
  "B.Tech/B.E. in Information Technology",
  "B.Tech/B.E. in Chemical Engineering",
  "B.Tech/B.E. in Aeronautical Engineering",
  "B.Tech/B.E. in Biotechnology",
  "B.Tech/B.E. in Environmental Engineering",
  "MBBS (Medicine)",
  "BDS (Dentistry)",
  "BAMS (Ayurvedic Medicine)",
  "BHMS (Homeopathic Medicine)",
  "BPT (Physiotherapy)",
  "B.Sc. Nursing",
  "B.Pharm (Pharmacy)",
  "Bachelor of Occupational Therapy",
  "LLB (Bachelor of Laws)",
  "Integrated Law courses (B.A. LLB, B.Com LLB, B.Sc. LLB)",
  "B.Ed (Bachelor of Education)",
  "BHM (Bachelor of Hotel Management)",
  "BFA (Bachelor of Fine Arts)",
  "B.Des (Bachelor of Design)",
  "BSW (Bachelor of Social Work)",
  "M.Sc. in Physics",
  "M.Sc. in Chemistry",
  "M.Sc. in Biology",
  "M.Sc. in Mathematics",
  "M.Sc. in Computer Science",
  "M.Sc. in Environmental Science",
  "M.Sc. in Biotechnology",
  "M.Sc. in Microbiology",
  "M.Sc. in Biochemistry",
  "M.Sc. in Zoology",
  "M.Sc. in Botany",
  "M.Sc. in Geology",
  "M.Sc. in Statistics",
  "M.Sc. in Food Science",
  "M.Sc. in Nutrition",
  "M.Com (Master of Commerce)",
  "MBA (Master of Business Administration)",
  "M.Fin (Master of Finance)",
  "M.HRM (Master of Human Resource Management)",
  "M.A. in English",
  "M.A. in Hindi",
  "M.A. in History",
  "M.A. in Geography",
  "M.A. in Political Science",
  "M.A. in Sociology",
  "M.A. in Psychology",
  "M.A. in Philosophy",
  "M.A. in Economics",
  "M.A. in Anthropology",
  "M.A. in Education",
  "M.A. in Journalism and Mass Communication",
  "M.A. in Fine Arts",
  "M.A. in Performing Arts",
  "M.A. in Sanskrit",
  "M.A. in Regional Languages",
  "M.A. in Foreign Languages",
  "M.Tech/M.E. in Mechanical Engineering",
  "M.Tech/M.E. in Civil Engineering",
  "M.Tech/M.E. in Electrical Engineering",
  "M.Tech/M.E. in Computer Science Engineering",
  "M.Tech/M.E. in Electronics and Communication Engineering",
  "M.Tech/M.E. in Information Technology",
  "M.Tech/M.E. in Chemical Engineering",
  "M.Tech/M.E. in Aeronautical Engineering",
  "M.Tech/M.E. in Biotechnology",
  "M.Tech/M.E. in Environmental Engineering",
  "MD (Doctor of Medicine)",
  "MS (Master of Surgery)",
  "MDS (Master of Dental Surgery)",
  "MPT (Master of Physiotherapy)",
  "M.Sc. Nursing",
  "M.Pharm (Master of Pharmacy)",
  "Master of Occupational Therapy",
  "LLM (Master of Laws)",
  "M.Ed (Master of Education)",
  "M.Phil in Education",
  "Ph.D. in Education",
  "MHM (Master of Hotel Management)",
  "MFA (Master of Fine Arts)",
  "M.Des (Master of Design)",
  "MSW (Master of Social Work)",
  "Ph.D. in various disciplines",
  "12th Pass",
  "10th Pass"
];

const [highestQualificatio, setHighestQualificatio] = useState('');
const [filteredQualifications, setFilteredQualifications] = useState([]);

const handleInputChange = (e) => {
  const input = e.target.value;
  setHighestQualificatio(input);
  
  // Filter the qualifications based on input
  const filtered = qualifications.filter((q) =>
    q.toLowerCase().includes(input.toLowerCase())
  );
  setFilteredQualifications(filtered);
};
// Handler to update longitude state based on user input
const handleLongitudeChange = (e) => {
  const newLongitude = parseFloat(e.target.value) || 0;
  setLongitude(newLongitude);
};


  const editimage = () => {
    alert('image edited!');
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
  const fetchUserCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude.toString());
          setLongitude(longitude.toString());
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
  const removeSocialNetwork = (index) => {
    const newSocialNetworks = [...socialNetworks];
    newSocialNetworks.splice(index, 1);
    setSocialNetworks(newSocialNetworks);
  };
  const savePersonalInfo2 = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://server.avyudha.com/dashboard/${endpoint}`, {
        method: 'PUT',
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
        const response = await fetch(`https://server.avyudha.com/dashboard/${endpoint}`, {
          method: 'PUT',
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
  
      const response = await fetch(`https://server.avyudha.com/dashboard/${endpoint}`, {
        method: 'PUT',
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
        jobAlerts: {
          minExpectedSalary: { value: salary, period: salaryPeriod },
          maxExpectedSalary: { value: salaryType, period: salaryPeriod },
          // Providing a default value for alertDistance if it's not defined
          alertDistance:   {
            privateTutor: { distance: 0, flag: false },
            organizationEducator: { distance: 0, flag: false }
          }
        },
        contactNumber: contactAddress1,
        description,
        video
      };

      console.log('Request Body:', JSON.stringify(body, null, 2));

      const response = await fetch(`https://server.avyudha.com/dashboard/${endpoint}`, {
        method: 'PUT',
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
        console.log('Response Status:', response.status);
        console.log('Response Message:', responseData.message);
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
        <div className="mt-24 lg:ml-64 lg:mt-12 p-4 lg:p-28">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 mt-12">Your Profile</h1>
          
          {endpoint === 'tutor' && (
            <div className="flex-1 bg-gray-100">
            <Sidebar />
            <div className="">
            <div className="w-full bg-white p-12 mb-4 rounded-lg shadow-md">
             <h2 className="text-xl font-semibold mb-4 text-gray-900">Personal Information</h2>
              {/* <div className="flex mb-8">
                <img
                  src={image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full"
                />
              </div> */}
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">Ratings</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={rating}
                    
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Class Type</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={tags}
                    
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
    <option value="others">Others</option>
  </select>
</div>


<div className="relative">
  <label className="block text-gray-700 text-sm font-bold mb-2">Degree</label>
  <input
    type="text"
    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
    value={highestQualificatio}
    onChange={(e) => {
      setHighestQualificatio(e.target.value);
      const filtered = qualifications.filter(q =>
        q.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredQualifications(filtered);
    }}
  />
 
  {filteredQualifications.length > 0 && (
    <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto z-10">
      {filteredQualifications.map((q, index) => (
        <li
          key={index}
          onClick={() => {
            setHighestQualificatio(q);
            setFilteredQualifications([]);  // Clear the list after selection
          }}
          className="cursor-pointer p-2 hover:bg-gray-100"
        >
          {q}
        </li>
      ))}
    </ul>
  )}
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
                <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Max Salary</label>
  <input
    type="text"
    className="w-full p-2 border border-gray-300 rounded-lg"
    value={salaryType}
    onChange={(e) => setSalaryType(e.target.value)}
  />
</div>

                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Salary Period</label>
                  <select
    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
    value={salaryPeriod}
    onChange={(e) => setSalaryPeriod(e.target.value)}
  >
    <option value="">Select Period</option>
    <option value="monthly">monthly</option>
    <option value="hourly">hourly</option>
    <option value="annually">annually</option>
  </select>
                </div> 
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Introduction Video</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                  />
                </div> 


             

    
                <div className="lg:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Categories</label>

                <div>
                

                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={categories.join(', ')}
                    onChange={(e) => setCategories(e.target.value.split(', '))}
                  />
                </div>
              </div>
              <div className="w-full bg-white p-4 mb-6 rounded-lg shadow-md">
                
    
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
                Save Personal Information
              </button>
    
             
    
              
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
              {/* <div className="flex mb-8">
                <img
                  src={image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full"
                />
              </div> */}
             
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={parentPhone}
                    onChange={(e) => setparentPhone (e.target.value)}
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
                </div></div>
                )}
                {endpoint==='organization' && 
                 <div className="flex flex-col lg:flex-row min-h-screen">
                 <Header />
                 <div className="flex-1 bg-gray-100">
                   <Sidebar />
                 <div className="">
          <h1 className="bold my-4"><em>Employer Profile</em></h1>
               <div className="w-full bg-white p-12 mb-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Personal Information</h2>
                 {/* <div className="flex mb-8">
                   <img
                     src={image}
                     alt="Profile"
                     className="w-32 h-32 rounded-full"
                   />
                 </div> */}
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
       
                   {/* <div>
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
                   </div> */}
       
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
                   <label className="block text-gray-700 text-sm font-bold mb-2">Type of Teachers you require</label>
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
                     <label className="block text-gray-700 text-sm font-bold mb-2">Salary you will offer (₹)</label>
                     <input
                       type="text"
                       className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                       value={salary}
                       onChange={(e) => setSalary(e.target.value)}
                     />
                   </div>
       
                   <div className="lg:col-span-2">
                     <label className="block text-gray-700 text-sm font-bold mb-2">Categories (Teachers) </label>
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
       
             {/* <div className="w-full bg-white p-4 mb-6 rounded-lg shadow-md">
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
                 <button
                   onClick={savePersonalInfo}
                   className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-8"
                 >
                   Save Contact Information
                 </button> */}
       
                 <div className="w-full bg-white p-4 mb-6 rounded-lg shadow-md">
                   <label className="block text-gray-700 text-sm font-bold mb-2">Introduction Video</label>
                   <input
                     type="text"
                     className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                     value={video}
                     onChange={(e) => setVideo(e.target.value)}
                   />
                 </div>
       
                 <button
                   onClick={savePersonalInfo}
                   className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-8"
                 >
                   Save Introduction Video
                 </button>
               </div>
               </div></div>
               }
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
                className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={savePersonalInfoLoc}
              >
                Save Personal Info
              </button>
              
            </div></div>
</div>

  );
};

              {/* Save Buttons */}
  

export default YourProfile;

