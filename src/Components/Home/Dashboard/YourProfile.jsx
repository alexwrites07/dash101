import React, { useEffect, useState, Link, useRef} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Map from '../MapDemo';
import categoriesList from '../Dashboard/AdminPanel/categories.json'
const Modal = ({ isOpen, onClose, onSave, type, data, handleChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed mt-24 inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">{`Add ${type}`}</h3>
        {Object.keys(data).map((key) => (
          <div key={key} className="mb-4">
            <label className="block">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type={key === 'year' || key.includes('date') ? 'date' : 'text'}
              className="border p-2 w-full"
              value={data[key]}
              onChange={(e) => handleChange(e, key)}
            />
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded-md"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onSave(data)}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

const YourProfile = () => {
  
// State variables
const [inputText1, setInputText1] = useState('');
const [educationNote, setEducationNote] = useState('');
const [experienceNote, setExperienceNote] = useState('');
const [isSaving, setIsSaving] = useState(false);
const [pastExperiences, setPastExperiences] = useState([]);
const [social, setSocial] = useState([]);
const [awards, setAwards] = useState([]);
const [education, setEducation] = useState([]);
const [showMap, setShowMap] = useState(false);

const [skillsNote, setSkillsNote] = useState('');
 const suggestionsRef = useRef(null);
const [educationNotes, setEducationNotes] = useState([]);
const [board, setBoard] = useState('');const [teachlvl, setTeachlvl] = useState('');
const [experienceNotes, setExperienceNotes] = useState([]);
const [skillsNotes, setSkillsNotes] = useState([]);
const [facebook, setfaceBook] = useState('');
const [linkedin, setLinkedin] = useState('');
const [insta, setInsta] = useState('');
// const [video, se] = useState('');
const [website, setWebsite] = useState('');
const [name, setName] = useState('');
const [userName, setUserName] = useState('');
const [fullName, setFullName] = useState('');
const [schoolName, setSchoolName] = useState('');
const [parentName, setParentName] = useState('');
const [classes, setclasses] = useState('X');
const [tags, setTags] = useState('X');
const [rating, setRating] = useState('X');
const [formData, setFormData] = useState({ categories: [] });
const [gender, setGender] = useState('');
const [video, setVideo] = useState('');
const [country, setCountry] = useState('');
const [pin, setPin] = useState('');
const [landmark, setLandmark] = useState('');
const [state, setState] = useState('');

const [highestQualification, setHighestQualification] = useState('');
const [age, setAge] = useState('');
const [email, setEmail] = useState('');
const [qualification, setQualification] = useState('');
const [experienceTime, setExperienceTime] = useState('');
const [languages, setLanguages] = useState([]);
const [salaryType, setSalaryType] = useState(0);
const [salary1, setSalary1] = useState(0);
const [salaryPeriod, setSalaryPeriod] = useState(0);

const [salary, setSalary] = useState(0);
const [categories, setCategories] = useState([]);
const [jobTitle, setJobTitle] = useState('');
const [parentPhone, setparentPhone ] = useState('');
const [phone, setPhone ] = useState('');
const [contactNumber, setContactNumber ] = useState('');
const [suggestions1, setSuggestions1] = useState([]);

const [id, setId] = useState('');
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
const suggestions = ["Male", "Female", "Other"].filter((option) => option !== gender);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');
    setEndpoint(type);
  const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setFilteredLang([]);
        setFilteredQualifications([]);
        setFilteredLvl([]);
      }
    };

  
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
        
          setName(data.name ||'');
          setWebsite(data.website ||'');
          setfaceBook(data.facebookId||'');
          // setInsta(data.linkedinId || '');
          setLinkedin(data.linkedinId || '');
          setUserName(data.username || '');
          setclasses(data.class || '');
          setEmail (data.email);
          setBoard (data.boardOfEducation);
          setHighestQualification(data.highestQualification);
          setGender(data.gender || '');
          setEducation(data.education || '');
          setContactNumber(data.contactNumber || '');
          setAge(data.age || '');
          setEmail(data.email || '');
          setHighestQualification(data.highestQualification || '');
          setExperienceTime(data.totalExperience || '');
          setLanguages(data.spokenLanguages || []);
          setId(data._id||'');
          setSalaryType(data.jobAlerts?.maxExpectedSalary.value || '');
          setSalaryPeriod(data.jobAlerts?.maxExpectedSalary.period || '');
          setSalary1(data.jobAlerts?.minExpectedSalary.value || '');
          setDescription(data.description || '');
          setparentPhone (data.parentPhone || '');
          setPhone (data.phone || '');
          setCountry (data.location.country || '');
          setLandmark (data.location.landMark || '');
          setState (data.location.state || '');
          setPin (data.location.pinCode || '');
          setSchoolName(data.schoolName||'');
          setParentName(data.parentName||'');
          setTeachlvl(data.teachingLevels || '');
          setLocation(data.location?.city || '');
          setRating (data.rating || '');
          setCategories(data.categories || []);
          setTags(data.tags || '');
          setAwards(data.awards||'');
        setPastExperiences(data.pastExperiences || '');
        setSocial(data.socialMediaLinks || '');
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
          setQualification(data.qualifications);
          setExperienceTime(data.totalExperience);
         
          setSalary(data.salary || '');
          // setCategories(data.tags || []);
          setDescription(data.description);
          setContactAddress(data.location.address);
          setLocation(data.location.city);
          setMapsLocation(data.location.address);
          setLatitude(data.location.coordinates[0]);
          setLongitude(data.location.coordinates[1]);
          
          // setImage(data.image || '');
          
          
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Re-run the effect when the type changes
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14601.43043416873!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1720685384704!5m2!1sen!2sin`;
  const handleMapChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
   
    setLatitude(newCoordinates[0]);
    setLongitude(newCoordinates[1]);
  };
  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude,longitude } = position.coords;
        setCoordinates([latitude,longitude]);
        setResponses((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            coordinates: [latitude, longitude],
          },
        }));
      }, (error) => {
        console.error("Error fetching location:", error);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleShowMap = () => {
    setShowMap(true);
  };


  const addNote = (note, setNotes, setNote) => {
    if (note.trim() !== '') {
      setNotes((prevNotes) => [...prevNotes, note]);
      setNote('');
    }
  };
  const handleCategoryInputChange = (e) => {
    const input = e.target.value;
    setInputText1(input); // Update the input text for categories
  
    // Filter categories based on input text
    const filteredSuggestions = categoriesList.filter(
      (category) =>
        category.toLowerCase().includes(input.toLowerCase()) &&
        !categories.includes(category) // Ensure it’s not already added
    );
    setSuggestions1(filteredSuggestions);
  };
  
  const handleCategorySelect = (category) => {
    setCategories((prevCategories) => [...prevCategories, category]); // Add selected category
    setInputText1(''); // Clear input text after selecting a category
    setSuggestions1([]); // Clear suggestions after selecting a category
  };
  
  const handleCategoryRemove = (categoryToRemove) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category !== categoryToRemove)
    ); // Remove the category
  };
//   const handleEducationChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedEducation = education.map((edu, i) =>
//         i === index ? { ...edu, [name]: value } : edu
//     );
//     setEducation(updatedEducation);
// };

// const addEducation = () => {
//   setEducation([
//     ...education,
//     { title: '', year: '', academy: '', description: '', new: true },
//   ]);
// };
// const saveEducation = (index) => {
//   const updatedEducation = [...education];
//   updatedEducation[index].new = false; // Mark as saved
//   setEducation(updatedEducation);
// };


// const removeEducation = (index) => {
//     const updatedEducation = education.filter((_, i) => i !== index);
//     setEducation(updatedEducation);
// };

  const handleTagInputChange = (e) => {
    const input = e.target.value;
    setInputText(input); // Update input text
  
    // Filter tags based on input
    const filteredSuggestions = allTags.filter(
      (tag) =>
        tag.toLowerCase().includes(input.toLowerCase()) && !tags.includes(tag)
    );
    setSuggestions(filteredSuggestions);
  };
  
  const handleTagSelect = (tag) => {
    setTags((prevTags) => [...prevTags, tag]); // Add selected tag
    setInputText(''); // Clear input text
    setSuggestions([]); // Clear suggestions
  };
  
  const handleTagRemove = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove)); // Remove tag
  };
//   const handleExperienceChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedExperiences = pastExperiences.map((exp, i) =>
//         i === index ? { ...exp, [name]: value } : exp
//     );
//     setPastExperiences(updatedExperiences);
// };

// const addExperience = () => {
//   setPastExperiences([
//     ...pastExperiences,
//     { title: '', start_date: '', end_date: '', company: '', description: '', new: true },
//   ]);
// };
// const handleSocialChange = (index, e) => {
//   const { name, value } = e.target;
//   const updatedSocial = social.map((exp, i) =>
//       i === index ? { ...exp, [name]: value } : exp
//   );
//   setPastExperiences(updatedSocial);
// };

// const addSocial = () => {
// setSocial([
//   ...pastExperiences,
//   { platform: '', link: '', new: true },
// ]);
// };
// const removeSocial = (index) => {
//   const updatedSocial = pastSocial.filter((_, i) => i !== index);
//   setPastExperiences(updatedSocial);
// };

// const saveExperience = (index) => {
//   const updatedExperiences = [...pastExperiences];
//   updatedExperiences[index].new = false; // Mark as saved
//   setPastExperiences(updatedExperiences);
// };


// const removeExperience = (index) => {
//     const updatedExperiences = pastExperiences.filter((_, i) => i !== index);
//     setPastExperiences(updatedExperiences);
// };


 // Handler to update latitude state based on user input
 const handleLatitudeChange = (e) => {
  const newLatitude = parseFloat(e.target.value) || 0;
  setLatitude(newLatitude);
};
const qualifications1 = [
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
const teachinglvl =
[
  "Primary Teacher (PRT)",
  "Trained Graduate Teacher (TGT)",
  "Post Graduate Teacher (PGT)",
  "Assistant Professor",
  "Associate Professor",
  "Professor",
  "Guest Faculty",
  "Special Educator",
  "Mother Teacher",
  "Assistant Teacher",
  "Fresher"
];

  const language =  [
    "Spoken English",
    "French Language",
    "Hindi Language",
    "German Language",
    "Spanish Language",
    "Japanese Language",
    "Kannada Language",
    "Arabic Language",
    "Phonics",
    "Chinese Language",
    "Tamil Language",
    "Telugu Language",
    "Sanskrit Language",
    "Korean Language",
    "Marathi Speaking",
    "Russian Language",
    "Italian Language",
    "Malayalam Speaking",
    "Bengali Speaking",
    "Urdu Language",
    "Accent Training Classes",
    "Gujarati Speaking",
    "Dutch Language",
    "Punjabi Speaking",
    "Portuguese Language",
    "Swedish Language",
    "Language Translation Services",
    "Persian Language",
    "Thai Language",
    "Elocution",
    "Danish Language",
    "Turkish Language",
    "Polish Language",
    "Finnish Language",
    "Hebrew Language",
    "Latin Language"
  ];



const [highestQualificatio, setHighestQualificatio] = useState('');
const [filteredQualifications, setFilteredQualifications] = useState([]);
const [filteredLang, setFilteredLang] = useState([]);
const [filteredLvl, setFilteredLvl] = useState([]);

const handleInputChange = (e) => {
  const input = e.target.value;
  setHighestQualificatio(input);
  
  // Filter the qualifications based on input
  const filtered = qualifications1.filter((q) =>
    q.toLowerCase().includes(input.toLowerCase())
  );
  setFilteredQualifications(filtered);
};
// Handler to update longitude state based on user input
const handleLongitudeChange = (e) => {
  const newLongitude = parseFloat(e.target.value) || 0;
  setLongitude(newLongitude);
};


const [showExperienceModal, setShowExperienceModal] = useState(false);
const [showAwardModal, setShowAwardModal] = useState(false);
const [showEducationModal, setShowEducationModal] = useState(false);

const [experienceData, setExperienceData] = useState({
  title: '',
  start_date: '',
  end_date: '',
  company: '',
  description: '',
});
const [awardData, setAwardData] = useState({
  title: '',
  year: '',
  description: '',
});
const [educationData, setEducationData] = useState({
  title: '',
  year: '',
  academy: '',
  description: '',
});

const handleExperienceChange = (e, field) => {
  setExperienceData({ ...experienceData, [field]: e.target.value });
};

const handleAwardChange = (e, field) => {
  setAwardData({ ...awardData, [field]: e.target.value });
};

const handleEducationChange = (e, field) => {
  setEducationData({ ...educationData, [field]: e.target.value });
};

const addExperience = () => {
  setShowExperienceModal(true);
};

const addAward = () => {
  setShowAwardModal(true);
};

const addEducation = () => {
  setShowEducationModal(true);
};

const saveExperience = (data) => {
  setPastExperiences([...pastExperiences, data]);
  setExperienceData({
    title: '',
    start_date: '',
    end_date: '',
    company: '',
    description: '',
  });
  setShowExperienceModal(false);
};

const saveAward = (data) => {
  setAwards([...awards, data]);
  setAwardData({
    title: '',
    year: '',
    description: '',
  });
  setShowAwardModal(false);
};

const saveEducation = (data) => {
  setEducation([...education, data]);
  setEducationData({
    title: '',
    year: '',
    academy: '',
    description: '',
  });
  setShowEducationModal(false);
};
const [selectedImage, setSelectedImage] = useState(null);

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedImage(file);
  }
};

const editimage = async () => {
  const type = localStorage.getItem('type'); // Get the user type from local storage
  const token = localStorage.getItem('token'); // Get the token from local storage

  if (!type || !token) {
    alert('Missing user type or token in local storage.');
    return;
  }

  if (!selectedImage) {
    alert('Please select an image first.');
    return;
  }

  let url = '';
  const formData = new FormData();

  // Determine the API endpoint and form field based on the user type
  switch (type) {
    case 'student':
      url = `https://server.avyudha.com/student/upload-dp`;
      formData.append('file', selectedImage);
      break;
    case 'tutor':
      url = `https://server.avyudha.com/tutors/upload/image`;
      formData.append('image', selectedImage);
      break;
    case 'organization':
      url = `https://server.avyudha.com/org/upload/logo`;
      formData.append('logo', selectedImage);
      break;
    default:
      alert('Invalid user type.');
      return;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token
      },
      body: formData, // Send the form data
    });

    if (!response.ok) {
      throw new Error('Failed to update the image.');
    }

    const result = await response.json();
    alert('Image edited successfully!');
    console.log('Server response:', result);

    // Reload the image to reflect the updated profile picture
    setSelectedImage(null);
    window.location.reload();
  } catch (error) {
    console.error('Error editing image:', error.message);
    alert('An error occurred while editing the image.');
  }
};

  const handleCoordinatesChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
    setLatitude(newCoordinates[0]);
    setLongitude(newCoordinates[1]);
    // Optionally, save the new coordinates here or in your database
  };
//   const handleAwardChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedAwards = awards.map((award, i) =>
//         i === index ? { ...award, [name]: value } : award
//     );
//     setAwards(updatedAwards);
// };
// const addAward = () => {
//   setAwards([
//     ...awards,
//     { title: '', year: '', description: '', new: true },
//   ]);
// };
// const saveAward = (index) => {
//   const updatedAwards = [...awards];
//   updatedAwards[index].new = false; // Mark as saved
//   setAwards(updatedAwards);
// };

// const removeAward = (index) => {
//     const updatedAwards = awards.filter((_, i) => i !== index);
//     setAwards(updatedAwards);
// };

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
  const savePersonalInfo22 = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`https://server.avyudha.com/dashboard/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // fullName,
         contactNumber,
         dob,

          
         
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
         gender,
         highestQualification,
         qualifications:qualification,
         experienceTime,
         spokenLanguages:languages,
         jobAlerts: {
          minExpectedSalary: { value: salary1, period: salaryPeriod },
          maxExpectedSalary: { value: salaryType, period: salaryPeriod },
          
         
        },
         teachingLevels:teachlvl,
         video,
         categories,
         description,
         pastExperiences,
         awards,
         education,

        
          // categories,
          // description:description,
          location: {
            
            address: contactAddress,
            city: location,
            coordinates:
            [latitude,longitude]
          },
          
          
        
        }),
      });
      console.log (response);
      console.log(coordinates);
      console.log(token);
      setIsSaving(false);
      if (response.ok) {
        alert('Profile information saved successfully!');
      } else {
        alert('Failed to save profile information.');
        console.log(response);
      }
    } catch (error) {
      console.error('Error saving profile information:', error);
      alert('An error occurred while saving your profile information.');
      setIsSaving(false);
    }
  };
  const savePersonalInfo2 = async () => {
    try {
      setIsSaving(true);
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
          schoolName,
          parentName,
          board,
          dob,
          phone,

        
          // categories,
          // description:description,
          location: {
            
            address: contactAddress,
            city: location,
            pinCode:pin,
            state:state,
            coordinates:
            [latitude,longitude],
          },
          
          
          image,
          
        }),
      });
      console.log (response);
      console.log(coordinates);
      console.log(token); setIsSaving(false);
      if (response.ok) {
        alert('Profile information saved successfully!');
      } else {
        alert('Failed to save profile information.');
        console.log(response);
      }
    } catch (error) {
      console.error('Error saving profile information:', error);
      alert('An error occurred while saving your profile information.'); setIsSaving(false);
    }
  };
  const savePersonalOrg = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`https://server.avyudha.com/dashboard/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // fullName,
          
          
          contactNumber,
          website,
          description,
          facebook,
          linkedin,
          video
         
         
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
          // parentPhone,
          // schoolName,
          // parentName,
          // board,
          // dob,
          // phone,

        
          // categories,
          // description:description,
          // location: {
            
          //   address: contactAddress,
          //   city: location,
          //   coordinates:
          //   [latitude,longitude]
          // },
          
          
         
          
        }),
      });
      console.log (response);
      console.log(coordinates);
      console.log(token); setIsSaving(false);
      if (response.ok) {
        alert('Profile information saved successfully!');
      } else {
        alert('Failed to save profile information.');
        console.log(response);
      }
    } catch (error) {
      console.error('Error saving profile information:', error);
      alert('An error occurred while saving your profile information.'); setIsSaving(false);
    }
  };
  const savePersonalInfoLoc = async () => {
    setIsSaving(true);
      try {
        const token = localStorage.getItem('token');
    
        // Create the body object and assign values using dot notation
        const body = {};
     
    
    
        body.location = {};
        body.location.address = contactAddress;
        body.location.city = location;
        body.location.country = country;
        body.location.state = state;
        body.location.pinCode = pin;
        body.location.landMark = landmark;
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
        setIsSaving(false);
        if (response.ok) {
          alert('Profile information saved successfully!');
        } else {
          alert('Failed to save profile information.');
          console.log(response);
        }
      } catch (error) {
        console.error('Error saving profile information:', error);
        alert('An error occurred while saving your profile information.');
        setIsSaving(false);
      }
  };
  const savePersonalInfo12 = async () => {
    try {
      const token = localStorage.getItem('token');
  
      // Create the body object and assign values using dot notation
      const body = {
        
        jobAlerts: {
          minExpectedSalary: { value: salary1 },
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
          minExpectedSalary: { value: salary1, period: salaryPeriod },
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
      <div className="flex-1 bg-gray-100 ">
        <Sidebar />
        <div className="mt-24 lg:ml-64 lg:mt-12 p-4 lg:p-28">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 mt-12">Your Profile</h1>
          
          {endpoint === 'tutor' && (
            <div className="flex-1 bg-gray-100">
            <Sidebar />
            <div className="">
            <div className="w-full bg-white p-12 mb-4 rounded-lg shadow-md">
             <h2 className="text-xl font-semibold mb-4 text-gray-900">Personal Information</h2>
             <div className="flex mb-8">
        <img
          src={`https://server.avyudha.com/tutors/download/image/${id}?token=${localStorage.getItem('token')}`}
          alt="Profile"
          className="w-32 h-32 rounded-full"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite error loop
            e.target.src = ''; // Provide a fallback image
          }}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      /><br></br>
      <button
        onClick={editimage}
        className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
      >
        Save uploaded picture
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Phone No.</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>
    
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                  />
                </div>

                <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
      {/* Input box for the saved gender value */}
      {/* <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      /> */}

<select
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        {/* Options */}
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>

    
                {/* <div>
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
                </div> */}
    
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">Highest Qualification</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={highestQualification}
                    onChange={(e) => setHighestQualification(e.target.value)}
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
                {/* <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Class Type</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={tags}
                    
                  />
                </div> */}


                <div className="relative">
  <label className="block text-gray-700 text-sm font-bold mb-2">Qualifications</label>
  <input
    type="text"
    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
    value={qualification}
    onChange={(e) => {
      setQualification(e.target.value);
      const lastInput = e.target.value.split(',').pop().trim(); // Get the last part after the last comma
      const filtered = qualifications1.filter(q =>
        q.toLowerCase().includes(lastInput.toLowerCase())
      );
      setFilteredQualifications(filtered);
    }}
  />

  {filteredQualifications.length > 0 && (
    <ul
      ref={suggestionsRef}
      className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto z-10"
    >
      {filteredQualifications.map((q, index) => (
        <li
          key={index}
          onClick={() => {
            const selectedQualifications = qualification
              .split(',')
              .map(qual => qual.trim());
            if (!selectedQualifications.includes(q)) {
              selectedQualifications[selectedQualifications.length - 1] = q; // Replace the last input with the selected suggestion
            }
            setQualification(selectedQualifications.join(', ') + ', '); // Add a comma after the selection
            setFilteredQualifications([]); // Clear the list after selection
          }}
          className="cursor-pointer p-2 hover:bg-gray-100"
        >
          {q}
        </li>
      ))}
    </ul>
  )}
</div>


{/* 
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
                </div> */}
    
                <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Experience</label>
                  <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                      value={experienceTime}
                      onChange={(e) => setExperienceTime(e.target.value)}
                 />
                    
                </div>
    
                <div className="relative">
  <label className="block text-gray-700 text-sm font-bold mb-2">Languages</label>
  <input
    type="text"
    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
    value={languages}
    onChange={(e) => {
      setLanguages(e.target.value);
      const lastInput = e.target.value.split(',').pop().trim();
      const filtered1 = language.filter(q =>
        q.toLowerCase().includes(lastInput.toLowerCase())
      );
      setFilteredLang(filtered1);
    }}
  />
  {filteredLang.length > 0 && (
    <ul
      ref={suggestionsRef}
      className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto z-10"
    >
      {filteredLang.map((q, index) => (
        <li
          key={index}
          onClick={() => {
            const selectedLanguages = languages
              .split(',')
              .map(lang => lang.trim());
            if (!selectedLanguages.includes(q)) {
              selectedLanguages[selectedLanguages.length - 1] = q; // Replace the last input with the selected suggestion
            }
            setLanguages(selectedLanguages.join(', ') + ', '); // Add a comma after the selection
            setFilteredLang([]); // Clear the list after selection
          }}
          className="cursor-pointer p-2 hover:bg-gray-100"
        >
          {q}
        </li>
      ))}
    </ul>
  )}
</div>

    
                {/* <div>

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
                </div> */}
                <div className="mb-4">
<label className="block text-gray-700 text-sm font-bold mb-2">Min Salary</label>
  <input
    type="number"
    className="w-full p-2 border border-gray-300 rounded-lg"
    value={salary1}
    onChange={(e) => setSalary1(e.target.value)}
  />
</div>

                <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Max Salary</label>
  <input
    type="number"
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
                <div className='relative'>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Teching Level</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={teachlvl}
                    onChange={(e) => {
                      setTeachlvl(e.target.value);
                      const filtered12 = teachinglvl.filter(q =>
                        q.toLowerCase().includes(e.target.value.toLowerCase())
                      );
                      setFilteredLvl(filtered12);
                    }}
                    />
                    {filteredLvl.length > 0 && (
                      <ul ref={suggestionsRef} className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto z-10">
                        {filteredLvl.map((q, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setTeachlvl(q);
                              setFilteredLvl([]);  // Clear the list after selection
                            }}
                            className="cursor-pointer p-2 hover:bg-gray-100"
                          >
                            {q}
                          </li>
                        ))}
                      </ul>
                    )}
                 
                </div> 


             

    
                <div className="mb-4">
            <label htmlFor="categories" className="block">Categories:</label>
            <div className="mb-4 relative">
        <input
          type="text"
          value={inputText1}
          onChange={handleCategoryInputChange}
          placeholder="Type to search categories..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        {/* Suggestions Dropdown */}
        {suggestions1.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto z-10">
            {suggestions1.map((category, index) => (
              <li
                key={index}
                onClick={() => handleCategorySelect(category)}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Categories */}
      {categories.length > 0 && (
        <div className="mb-4">
          <h2 className="text-md font-bold mb-2">Selected Categories:</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-3 rounded-lg flex items-center"
              >
                {category}
                <button
                  onClick={() => handleCategoryRemove(category)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
             
              <div >
                
    
                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
           
    
              <button
                onClick={savePersonalInfo22}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-8"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
    
             
    
              
            </div> 
           

                

                {/* <div className="mb-8">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Introduction Video URL</label>
                 <Video><source src={introductionVideo}></source></Video>
                </div> */}

                


                

                
              </div>
             
           
                <div className="mb-4 w-full bg-white p-12 mb-4 rounded-lg shadow-md">
  <h3 className="text-lg font-semibold mb-2">Experience Notes</h3>
  {pastExperiences.map((exp, index) => (
    <div key={index} className="mb-4 border p-4">
      <div className="mb-2">
        <label htmlFor={`experience-title-${index}`} className="block">Job Title:</label>
        <input
          type="text"
          id={`experience-title-${index}`}
          name="title"
          value={exp.title}
          onChange={(e) => handleExperienceChange(index, e)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-2 flex space-x-4">
  <div className="w-full">
    <label htmlFor={`experience-startDate-${index}`} className="block">Start Date:</label>
    <input
      type="date"
      id={`experience-startDate-${index}`}
      name="start_date"
      value={exp.start_date?.split('T')[0]}
      onChange={(e) => handleExperienceChange(index, e)}
      className="border p-2 w-full"
    />
  </div>
  <div className="w-full">
    <label htmlFor={`experience-endDate-${index}`} className="block">End Date:</label>
    <input
      type="date"
      id={`experience-endDate-${index}`}
      name="end_date"
      value={exp.end_date?.split('T')[0]}
      onChange={(e) => handleExperienceChange(index, e)}
      className="border p-2 w-full"
    />
  </div>
</div>

      <div className="mb-2">
        <label htmlFor={`experience-company-${index}`} className="block">Company:</label>
        <input
          type="text"
          id={`experience-company-${index}`}
          name="company"
          value={exp.company}
          onChange={(e) => handleExperienceChange(index, e)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-2">
        <label htmlFor={`experience-description-${index}`} className="block">Description:</label>
        <textarea
          id={`experience-description-${index}`}
          name="description"
          value={exp.description}
          onChange={(e) => handleExperienceChange(index, e)}
          className="border p-2 w-full"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => removeExperience(index)}
          className="bg-red-500 text-white p-2"
        >
          Remove Experience
        </button>
        {/* {exp.new && (
          <button
            type="button"
            onClick={() => saveExperience(index)}
            className="bg-green-500 text-white p-2"
          >
            Save
          </button>
        )} */}
      </div>
    </div>
  ))}
  <button type="button" onClick={addExperience} className="mb-4 bg-blue-500 text-white p-2">
    Add Experience
  </button>
</div>

<div>
      <div className="mb-4 w-full bg-white p-12 mb-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Experience Notes</h3>
        {pastExperiences.map((exp, index) => (
          <div key={index} className="mb-4 border p-4">
            <div className="mb-2">
              <label className="block">Job Title:</label>
              <input
                type="text"
                value={exp.title}
                readOnly
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block">Start Date:</label>
              <input
                type="date"
                value={exp.start_date}
                readOnly
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block">End Date:</label>
              <input
                type="date"
                value={exp.end_date}
                readOnly
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block">Company:</label>
              <input
                type="text"
                value={exp.company}
                readOnly
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block">Description:</label>
              <textarea
                value={exp.description}
                readOnly
                className="border p-2 w-full"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addExperience}
          className="mb-4 bg-blue-500 text-white p-2"
        >
          Add Experience
        </button>
      </div>

      <div className="mb-4 w-full bg-white p-12 mb-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Awards</h3>
        {awards.map((award, index) => (
          <div key={index} className="mb-4 border p-4">
            <div className="mb-2">
              <label className="block">Award Title:</label>
              <input
                type="text"
                value={award.title}
                readOnly
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block">Year:</label>
              <input
                type="date"
                value={award.year}
                readOnly
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block">Description:</label>
              <textarea
                value={award.description}
                readOnly
                className="border p-2 w-full"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addAward}
          className="mb-4 bg-blue-500 text-white p-2"
        >
          Add Award
        </button>
      </div>

      <div className="mb-4 w-full bg-white p-12 mb-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Education</h3>
        {education.map((edu, index) => (
          <div key={index} className="mb-4 border p-4">
            <div className="mb-2">
              <label className="block">Title:</label>
              <input
                type="text"
                value={edu.title}
                readOnly
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block">Year:</label>
              <input
                type="date"
                value={edu.year}
                readOnly
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block">Academy:</label>
              <textarea
                value={edu.academy}
                readOnly
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block">Description:</label>
              <textarea
                value={edu.description}
                readOnly
                className="border p-2 w-full"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addEducation}
          className="mb-4 bg-blue-500 text-white p-2"
        >
          Add Education
        </button>
      </div>

      {/* Modals for adding Experience, Award, and Education */}
      <Modal
        isOpen={showExperienceModal}
        onClose={() => setShowExperienceModal(false)}
        onSave={saveExperience}
        type="Experience"
        data={experienceData}
        handleChange={handleExperienceChange}
      />
      <Modal
        isOpen={showAwardModal}
        onClose={() => setShowAwardModal(false)}
        onSave={saveAward}
        type="Award"
        data={awardData}
        handleChange={handleAwardChange}
      />
      <Modal
        isOpen={showEducationModal}
        onClose={() => setShowEducationModal(false)}
        onSave={saveEducation}
        type="Education"
        data={educationData}
        handleChange={handleEducationChange}
      />
    </div>
<button
                onClick={savePersonalInfo22}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-8"
              >
               {isSaving ? 'Saving...' : 'Save'}
              </button>
</div>

          )}

{endpoint === 'student' && (
            <div className="w-full bg-white p-12 mb-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Student Profile</h2>
              <div className="flex mb-8">
        <img
          src={`https://server.avyudha.com/student/dp/${id}?token=${localStorage.getItem('token')}`}
          alt="Profile"
          className="w-32 h-32 rounded-full"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite error loop
            e.target.src = ''; // Provide a fallback image
          }}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      /><br></br>
      <button
        onClick={editimage}
        className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
      >
        Save uploaded picture
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
                     <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
                     <input
                       type="date"
                       className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                       value={dob?.split('T')[0]}
                       onChange={(e) => setDOB(e.target.value)}
                     />
                   </div>

                {/* <div>
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
            </div> */}


             

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
                  <label className="block text-gray-700 text-sm font-bold mb-2">Board</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={board}
                    onChange={(e) => setBoard(e.target.value)}
                  />
                </div>


           

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Parent Phone Number</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={parentPhone}
                    onChange={(e) => setparentPhone (e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Student Phone No</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={phone}
                    onChange={(e) => setPhone (e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Parent Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={parentName}
                    onChange={(e) => setParentName (e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">School Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={schoolName}
                    onChange={(e) => setSchoolName (e.target.value)}
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
                  onClick={savePersonalInfo2}
                  className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
                >
                 {isSaving ? 'Saving...' : 'Save'}
                </button></div>
                )}
                {endpoint==='organization' && 
                 <div className="flex flex-col lg:flex-row min-h-screen">
                 <Header />
                 <div className="flex-1 bg-gray-100">
                   <Sidebar />
                 <div className="">
        
               <div className="w-full bg-white p-12 mb-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Personal Information</h2>
                <div className="flex mb-8">
        <img
          src={`https://server.avyudha.com/org/download/logo/${id}?token=${localStorage.getItem('token')}`}
          alt="Profile"
          className="w-32 h-32 rounded-full"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite error loop
            e.target.src = ''; // Provide a fallback image
          }}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      /><br></br>
      <button
        onClick={editimage}
        className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
      >
        Save uploaded picture
      </button>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-gray-700 text-sm font-bold mb-2">Organisation Name</label>
                     <input
                       type="text"
                       className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                     />
                   </div>
                   <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
       
                   {/* <div>
                     <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
                     <input
                       type="text"
                       className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                       value={dob?.split('T')[0]}
                       onChange={(e) => setDOB(e.target.value)}
                     />
                   </div> */}
        
       
                   <div>
                     <label className="block text-gray-700 text-sm font-bold mb-2">Organisation Type</label>
                     <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
                     <label className="block text-gray-700 text-sm font-bold mb-2">Phone No.</label>
                     <input
                       type="email"
                       className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                       value={contactNumber}
                       onChange={(e) => setContactNumber(e.target.value)}
                     />
                   </div>
                   {/* <div>
                   <label className="block text-gray-700 text-sm font-bold mb-2">Des</label>
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
                   </div> */}
       
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
                     <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                     <input
                       type="text"
                       className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                       value={description}
                       onChange={(e) => setDescription(e.target.value)}
                     />
                   </div>
       
                   <div>
                   <label className="block text-gray-700 text-sm font-bold mb-2">Website</label>
                   <input
                       type="text"
                       className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                       value={website}
                       onChange={(e) => setWebsite(e.target.value)}
                     />
                   </div>
                 
              
                   {/* <div>
                   <label className="block text-gray-700 text-sm font-bold mb-2">Instagram</label>
                   <input
                       type="text"
                       className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                       value={insta}
                       onChange={(e) => setInsta(e.target.value)}
                     />
                   </div> */}
                   
                 <div>
                   <label className="block text-gray-700 text-sm font-bold mb-2">Introduction Video</label>
                   <input
                     type="text"
                     className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                     value={video}
                     onChange={(e) => setVideo(e.target.value)}
                   />
                 </div>
                   {/* <div>
                     <label className="block text-gray-700 text-sm font-bold mb-2">Salary you will offer (₹)</label>
                     <input
                       type="text"
                       className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                       value={salary}
                       onChange={(e) => setSalary(e.target.value)}
                     />
                   </div> */}
       
                   {/* <div className="lg:col-span-2">
                     <label className="block text-gray-700 text-sm font-bold mb-2">Categories (Teachers) </label>
                     <input
                       type="text"
                       className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                       value={categories.join(', ')}
                       onChange={(e) => setCategories(e.target.value.split(', '))}
                     />
                   </div> */}
                 </div>
       
                 <button
                   onClick={savePersonalOrg}
                   className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-8"
                 >
                  {isSaving ? 'Saving...' : 'Save Personal Info'}
                 </button>
       
                 {/* <div className="w-full bg-white p-4 mb-6 rounded-lg shadow-md">
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
                 </div> */}
       
                 {/* <button
                   onClick={savePersonalInfo}
                   className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-8"
                 >
                   Save Job Information
                 </button> */}
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
       
               
{/*        
                 <button
                   onClick={savePersonalInfo}
                   className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-8"
                 >
                   Save Introduction Video
                 </button> */}
               </div>
               </div></div>
               }
     {/* <button
                  onClick={savePersonalInfo2}
                  className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
                >
                  Save
                </button> */}
          {/* <div className="mt-12">
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

          

</div> */}
<div className="">
        <div className="bg-white p-6 rounded-lg  mx-auto ml-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6 mx-auto">Job Location</h2>
          
          <button
        type="button"
        onClick={handleShowMap}
        className="mb-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded"
      >
        Show Map
      </button>

      {showMap && coordinates && (
        <>
          <Map coordinates={coordinates} onCoordinatesChange={handleMapChange} />
          <button
            type="button"
            onClick={fetchCurrentLocation}
            className="mt-2 bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Get Current Location
          </button>
        </>
      )}

      {showMap && !coordinates && <p>Location not available</p>}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Pincode</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                </div>
               
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">City/District</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
      </div>
      </div>
      <button
                className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={savePersonalInfoLoc}
              > {isSaving ? 'Saving...' : 'Save Personal Info'}
               
              </button>
              
            </div></div>
</div>

  );
};

              {/* Save Buttons */}
  

export default YourProfile;

