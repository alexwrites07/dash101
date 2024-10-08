import React, { useState, useEffect } from 'react';
import { HiSortAscending } from 'react-icons/hi';
import Header from '../Header';
import Sidebar from './AdminSidebar';

const FeaturedCategoryPage = () => {
  const [allTutors, setAllTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [selectedTutors, setSelectedTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterCategory, setFilterCategory] = useState('');

  // New fields array
  const fields = [
    'LKG Tuition',
  'UKG Tuition',
  'Class 1 Tuition',
  'Class 2 Tuition',
  'Class 3 Tuition',
  'Class 4 Tuition',
  'Class 5 Tuition',
  'Class 6 Tuition',
  'Class VI-X Tuition',
  'Class 1-V Tuition',
  'Class 12 Tuition',
  'Class 10 Tuition',
  'Class 11 Tuition',
  'Class 9 Tuition',
  'Nursery-KG Tuition',
  'Class 8 Tuition',
  'BTech Tuition',
  'BSc Tuition',
  'BCom Tuition',
  'BATuition',
  'Engineering Tuition',
  'Diploma Tuition',
  'BCA Tuition',
  'BBA Tuition',
  'MBBS & Medical Tuition',
  'LLB Tuition',
  'MSc Tuition',
  'Pharmacy Tuition',
  'MBA Tuition',
  'B Ed Tuition',
  'MA Tuition',
  'MCom Tuition',
  'MTech Tuition',
  'BMS Tuition',
  'BAF Tuition',
  'Dental Tuition',
  'Bachelor of Ayurvedic Medicine and Surgery Tuition',
  'Bachelor of Homeopathic Medicine and Surgery, Physiotherapy and Occupational Therapy Tuition',
  'BFA Tuition',
  'BFM Tuition',
  'BBI Tuition',
  'DNB Medicine Tuition',
  'Final exam tuition',
  'Exam revision',

  // Language Courses
  'Spoken English',
  'French Language',
  'Hindi Language',
  'German Language',
  'Spanish Language',
  'Japanese Language',
  'Kannada Language',
  'Arabic Language',
  'Phonics',
  'Chinese Language',
  'Tamil Language',
  'Telugu Language',
  'Sanskrit Language',
  'Korean Language',
  'Marathi Speaking',
  'Russian Language',
  'Italian Language',
  'Malayalam Speaking',
  'Bengali Speaking',
  'Urdu language',
  'Accent Training Classes',
  'Gujarati Speaking',
  'Dutch Language',
  'Punjabi Speaking',
  'Portuguese Language',
  'Swedish Language',
  'Language translation services',
  'Persian Language',
  'Thai Language',
  'Elocution',
  'Danish Language',
  'Turkish Language',
  'Polish Language',
  'Finnish Language',
  'Hebrew Language',
  'Latin Language',

  // Art Courses
  'Dance',
  'Handwriting',
  'Summer Camp',
  'Choreography',
  'Rubik\'s cube training',
  'Soap Making',
  'Paper Quilling',
  'Aeromodelling',
  'Graphology',
  'Bag Making',
  'Archery',

  // Music Courses
  'Singing',
  'Violin',
  'Piano',

  // Skill Development Courses
  'Makeup',
  'Handwriting',
  'Microsoft Excel Training',
  'SAP Training',
  'Python Training',
  'Java Training',
  'Computer C Language',
  'Ethical Hacking',
  'C++ Language',
  'Amazon Web Services',
  '.Net Training',
  'Tally Software',
  'Oracle Training',
  'Adobe Photoshop Training',
  'Mobile App Development',
  'Data Science',
  'Selenium',
  'Web Designing',
  'Autocad',
  'DevOps Training',
  'CCNA Training',
  'Big Data',
  'Software Testing',
  'Microsoft Azure Training',
  'Angular',
  'JSP',
  'PHP',
  'Graphic Designing',
  'Tableau',
  'Linux',
  'Web Development',
  'Java Script Training',
  'Microsoft Power BI',
  'Animation & Multimedia',
  'Automation Testing',
  'Informatica',
  'CADMS Office Software Training',
  'RPA Training',
  'Salesforce Developer',
  'React JS',
  'Cyber Security',
  'ServiceNow Training',
  'SQL Server',
  'Cloud Computing',
  'SQL Programming',
  'Unix',
  'Electrical CAD',
  'Active Directory Courses',
  'MS SQL Certification',
  'Hyperion Oracle',
  'MS Word',
  'Microsoft Intune Training',
  'Microstrategy',
  'Hyperion Essbase',
  'ETABS',
  'Agile IT Service Management',
  'Golang',
  'Game development Course',
  'Unity3d course',
  'Open Stack',
  'BizTalk',
  'iPhone Programming',
  'Revit Structure',
  'Telecom Testing',
  'Cloud Storage',
  'Networking Certification',
  'CISSP',
  'CakePHP',
  'Microstrategy BI',
  'Exchange Server',
  'Business Objects Training',
  'Infor ERP',
  'Windows',
  'Advanced VBScript',
  'Protocol Testing',
  'Veritas NetBackup',
  'Web Services',
  'AutoCAD MAP 3D Course',
  'Network Security',
  'Hypermesh',
  'Nagios Administration',
  'ITIL Foundations',
  'Salesforce Lightning Experience',
  'ArcGIS',
  'Baan',
  'Cyber Forensics',
  'Mobile Application Testing Course',
  'ISO27001 & ISO27002',
  'Autodesk Inventor',
  'MS SQL General',
  'HMI Automation',
  'MySQL Certification',
  'Internet & Email',
  'OpenFX',
  'ECSA',
  'EC-Council Certified Security Analyst',
  'SAS On Demand',
  'CAE Computer-Aided Engineering',
  'SSRS',
  'Quickbook',
  'Big Data Testing',
  'ARENA',
  'iOS Development',
  'Sybase DBA',
  'DSPSSAS',
  'Computer Assembling',
  'Apache Tomcat Training',
  'Cassandra',
  'Site Core CMS',
  'Microsoft Dynamics Axapta',
  'LS-Dyna',
  'Microsoft Dynamics NAV',
  'MS CRM',
  'Uni Graphics',
  'COBOL',
  'Data Visualization',
  'Linux Device Driver',
  'VMware vSphere',
  'VMware Cloud',
  'Weblogic',
  'Busy (Accounting Software)',
  'CISA',
  'IBM AIX',
  'RHCE Certification',
  'WebSphere Administrator',
  'OsCommerce',
  'Focus (Accounting Software)',
  'MS SQL Reporting',
  'Adobe Flash',
  'FPGA Design',
  'Logo Design',
  'MS Visio',
  'Cinema 4D',
  'Security Testing',
  'UNIX Certification',
  'MySQL Development',
  'DCS PLC',
  'Finacle',
  'Siebel Business Analyst',
  'VMware ESXi ESXTIBCO Business Works',
  'IBM Tivoli Training',
  'IBM SAN',
  'Solid Edge 3D',
  'RTOS',
  'Cloud Testing',
  'Zend Framework',
  'Hadoop Testing',
  'GD & T',
  'Crystal Reports',
  'Azure Databricks Courses',
  'HP UX11iV3',
  'Adobe Lightroom',
  'SSIS Training',
  'Adobe RoboHelp',
  'Sailpoint Training',
  'DB2',
  'Application Packaging',
  'QRadar Q1 Labs',
  'XML Webservices',
  'JBoss Fuse ESB Course',
  'Adobe Certification',
  'CITRIX XenApp',
  'Course Content Development',
  'Python Training for Kids',
  'Computer Maintenance',
  'ITIL V3 Foundation',
  'Oracle DBA OCP',
  'MS SQL Integration',
  'Visual Studio TFS 20',
  'Bootstrap',
  'MCP Certification',
  'Website Scripting',
  'Cloud Virtualization',
  'Performance testing using NeoLoad',
  'Citrix XenDesktop',
  'A+ Certification',
  'SCJPARMAIX Linux',
  'UniX',
  'Foundry Nuke',
  'Tibco Spotfire',
  'Siebel Administration',
  'Liferay',
  'Cyberark Training',
  'Adobe Dreamweaver',
  'JD Edwards',
  'SaaS',
  'Lean Manufacturing',
  'Salesforce CPQ Courses',
  'Citrix Netscaler',
  'Joomla',
  'PRINCE 2',
  'SCBCDFinal Cut Pro',
  'CCSA R71 CheckPoint',
  'MS Outlook',
  'Adobe PageMaker',
  'CICSTOGAF',
  'Mobile Application Design',
  'MCITP Certification',
  '3d Movie Maker',
  'SUN Certification',
  'MSP',
  'Software Installation',
  'MCTS Certification',
  'Performance engineering',
  'Veritas Cluster Server',
  'VFD PLC',
  'NetApp SAN',
  'MCSD Certification',
  'Static Websites',
  'Ajax Training',
  'Security Auditing',
  'MCA - Certified Architect',
  'Social Networking',
  'VMware vSphere 5.1',
  'Archi CAD',
  'Electronic CAD',
  'Data Mining',
  'Documentum Admin',
  'SAP Solution Manager',
  'Solaris Administrator',
  'Adobe FrameMaker',
  'Internet of Things Security',
  'Siebel Configuration',
  'IBM Websphere Transformation Extender WTX',
  'ITIL V3 Intermediate',
  'ITIL V3 Certification',
  'CISM Certification',
  'Comptia Security+',
  'Win Runner',
  'CSCU Certified Secure Computer User',
  'AIX System Administrator',
  'Storage Virtualization',
  'Digital Publishing',
  'Assembler',
  'IBM COBOL/400',
  'Cisco UCS',
  'Windows 2003 Admin',
  'Windows 7 Admin',
  'UML',
  'Puppet (Software) Training',
  'IIBA CBAP Training',
  'Sun Solaris 10',
  'IMS',
  'Server Management',
  'Cucumber (Tool) Training',
  'Business Objects Enterprise XI',
  'Suse Linux',
  'RHCA - Red Hat Certified Architect',
  'Eclipse',
  'Desktop & Server Security',
  'PL/1',
  'VMware vCenter',
  'E-Learning Animation',
  'ACHNP',
  'Computer Forensics',
  'Flask Framework',
  'Jetking',
  'Adobe Audition',
  'Siebel EAI',
  'Enovia Product lifecycle management',
  'IBM Certification',
  'Pentaho',
  'CCISO',
  'Sketch (Design Application)',
  'HITACHI SAN',
  'MySQL Consultant',
  'AC3D 3D Modeling',
  'Avid',
  'Internet Security',
  'Seamless3d',
  'Malware Analysis',
  'Solaris 11 system administrator',
  'MCSE Win 2000',
  'Microsoft Power Platform',
  'Citrix Virtualization',
  'Image Processing',
  'MCAD',
  'Windows Cluster',
  'Microsoft SCOM training',
  '2D Studio',
  'GIS',
  'Network Monitoring',
  'Terraform',
  'Siebel Real time Projects',
  'Software Configuration Management Course',
  'Safe Agilist Course',
  'ITIL Implementation',
  'REXX',
  'HP Certifications',
  'CompTIA Project+',
  'HyperWorks CAE',
  'CAPM Training',
  'TIBCO Enterprise Message Service (EMS)',
  'Documentum Dev',
  'Perl',
  'CGI',
  'ERWIN',
  'Autosys',
  'MySQL Cluster',
  'MS Windows 2007',
  'Weblogic Developer',
  'Moodle',
  'Microsoft Virtualization',
  'SAP Analytics and Data management Products',
  'Private Cloud',
  'CCSA Certificaiton',
  'XHTML',
  'Balanced Scorecard',
  'Citrix Password Manager',
  'ColdFusion',
  'Pro-E',
  'Macromedia Flash Training',
  'Wintel (System Admin) Courses',
  'PMI-ACP',
  'Action Script',
  'Paint Shop Pro',
  'App Inventor',
  'Google Appengine',
  'Other IM Tools',
  'Symfony',
  'Peachtree',
  'WebFocus',
  'ECSP',
  'Cisco CCENT',
  'BIRTH', // Assuming this is a typo

  // Other Certifications
  'IBM Lotus Notes',
  'Cryptography Stagnog',
  'Oracle DBA OCM',
  'Enovia 3DExperience',
  '3DVIA',
  'EC-Council Certified Security Analyst', // Already included
  'SAS On Demand',
  'CAE Computer-Aided Engineering', // Already included
  '... (list of other certifications)', // Add more as needed

  // Academic Exams
  'AP Computer Science',
  'RSA SecurID',
  'Sage ERP',
  '... (list of other academic exams)', // Add more as needed

  // Skill Development (continued)
  'E-Bus Apps DBA',
  'CCSE R71 CheckPoint',
  'Flash',
  'IBM Datapower',
  'Kanban',
  'Smarty',
  'Servlet',
  'Cisco PIX Firewall',
  'EMC Clariion',
  'Greenplum Database',
  'Authorware',
  'Veritas Volume Manager',
  'JCL',
  'Cisco CCDA',
  'Regression Testing',
  'IIBA CCBA Training',
  'Microsoft App-V',
  'VSP',
  'PgMP Training',
  'CCSE Certification',
  'IBM IID',
  'Template Designing',
  'Pneumatic controls - PLC',
  'EPM',
  'Datacom Testing Course',
  'Lotus Notes Domino',
  'AIX Shell Programming',
  'AutoQ3D',
  'IBM Server Administration',
  'SCSM',
  'Camtasia',
  'Cisco Certified Architect',
  'Titanium Mobile Application',
  'UI Development',
  'Aladdin 4D',
  'Swift 3D',
  'RSA enVision',
  'Adobe Flex',
  'VxWorks',
  'CMDB Training',
  'Interaction design',
  'OOAD',
  'IBM CastIron Cloud',
  'Siebel Analytics',
  'Flex Training',
  'SCDJ',
  'JWSS',
  'SSAS Tabular model',
  'SAP MDG',
  'WSO2 ESB Course',
  'CiscoWorks',
  'ECIH Certified Incidident Handler',
  '... (list of other skill development courses)', // Add more as needed

  // Language Courses (continued)
  // none mentioned in this list

  // Art Courses (continued)
  // none mentioned in this list

  // Music Courses (continued)
  // none mentioned in this list

  // ... other categories mentioned previously (Web Development, etc.)

  // Entrance Exams (new category)
  'UPSC Exam Tuition',
  'IBPS Exam Tuition',
  'Engineering Entrance Tuition',
  'UGC NET Exam Tuition',
  'CA Tuition',
  'MBA Entrance Tuition Coaching',
  'NEET-UG Tuition Coaching',
  'Staff Selection Commission Exam',
  'Bank Clerical Exam Coaching',
  'Medical Entrance Coaching',
  'PTE Academic Exam Coaching',
  'Company Secretary (CS) Coaching',
  'GRE Coaching',
  'GMAT Coaching',
  'Quantitative Aptitude',
  'CET Coaching',
  'SAT Coaching',
  'ICWA(CMA) Coaching',
  'MCA Coaching',
  'Math Olympiad',
  'PSC Exam Coaching',
  'NATA Coaching',
  'CMA Coaching',
  'CLAT Coaching',
  'Railway Exam',
  'SSB Coaching',
  'CFA Coaching',
  'IIT JAM Coaching',
  'Hotel Management Entrance Coaching',
  'ACCA Exam Coaching',
  'AMIE Coaching',
  'Advanced Placement Tests Coaching',
  'B Ed Entrance Coaching',
  'OET Exam Coaching',
  'DHA License Exam',
  'CSIR NET',
  'LAWCET Coaching',
  'Design Entrance Exam Coaching',
  'Career counselling for studies abroad',
  'NISM Training',
  'KAS (Prelims and Mains) Exam Coaching',
  'Duolingo English Exam Coaching',
  'TET Coaching',
  'Sub-Inspector Exam Coaching',
  'Diploma CET Coaching',
  'Judicial Service Exam Coaching',
  'RBI Exam',
  'SBI Exam',
  'CPA Coaching',
  'Sainik School Entrance Coaching',
  'USMLE Coaching',
  'Verbal Aptitude',
  'Science Olympiad',
  'CAIIB Exam Coaching',
  'NIFT Coaching',
  'ACET Coaching',
  'English Olympiad',
  'Jawahar Navodaya Vidyalaya Entrance Coaching',
  'NTSE exam Coaching',
  'DSSSB Exam Coaching',
  'CELPIP Coaching',
  'College Essay Writing',
  'ACT Exam Coaching',
  'CEPTAM (DRDO) Coaching',
  'CDCS Coaching',
  'LSAT Exam Coaching',
  'AFCAT Coaching',
  'JAIIB Exam Coaching',
  'Central Teacher Eligibility Test',
  'BBA Entrance Coaching',
  'National Entrance Screening Test (NEST) Coaching',
  'COMEDK Coaching',
  'MCAT Coaching',
  'AMIETE Coaching',
  'TestDaf',
  'MOH License Exam',
  'Non-Verbal Aptitude',
  'NMAT Exam Coaching',
  'Post Graduate Common Entrance Test',
  'PSAT/NMSQT Coaching',
  'HAAD License Exam',
  'CUET Coaching',
  'National Scholarship Exam(NSE) Coaching',
  'TOEIC Coaching',
  'Public Sector Undertaking Exam',
  'DSH Homi Bhabha Exam Coaching',
  'UCAT Exam Coaching',
  'CIMA CGMA',

  // Other Exams (assuming these are not entrance exams)
  'IIT JEE Coaching',
  'CPT Coaching',
  'IAS Coaching',
  'GATE Coaching',
  'CA IPCC Classes',
  'IPS Coaching',
  'Civil Services (Mains) Coaching',
  'BITSAT Coaching',

  // Tutors
  'English Tutor',
  'Hindi Tutor',
  'Mathematics Tutor',
  'Environmental Studies (EVS) Tutor',
  'General Knowledge (GK) Tutor',
  'Computer Science (Basics) Tutor',
  'Science Tutor',
  'Physics Tutor',
  'Chemistry Tutor',
  'Biology Tutor',
  'Social Science Tutor',
  'History Tutor',
  'Geography Tutor',
  'Civics Tutor',
  'Sanskrit Tutor',

  // Other Subjects
  'Information Technology',
  'Artificial Intelligence',
  'Home Science',
  'Physical Education',

  // Languages
  'French',
  'German',
  'Spanish',
  'Japanese',
  'Russian',

  // Other Fields
  'Computer Applications',
  'Painting',
  'Music (Vocal/Instrumental)',
  'Dance (Indian/Western)',
  'Applied Mathematics',
  'Informatics Practices',
  'Biotechnology',
  'Engineering Graphics',
  'Environmental Science',
  'Psychology',
  'Accountancy',
  'Business Studies',
  'Economics',
  'Entrepreneurship',
  'Legal Studies',
  'Marketing',
  'Political Science',
  'Sociology',
  'Philosophy',
  'Fine Arts (Painting, Sculpture, Graphics)',
  'Fashion Studies',
  'Media Studies',
  'Technical Drawing',
  'Commercial Studies',
  'Performing Arts (Dance, Drama, Music)',

  // Degree Programs
  'M.Tech in various Engineering disciplines',
  'MD (Doctor of Medicine)',
  'MS (Master of Surgery)',
  'M.Pharm (Master of Pharmacy)',
  'LLM (Master of Laws)',
  ];

  // Fetch tutors from the backend API
  useEffect(() => {
    const fetchTutors = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      try {
        const response = await fetch('https://backend.akshayy.tech/getTutors', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAllTutors(data.tutors); // Update allTutors with the fetched data
          setFilteredTutors(data.tutors); // Initial filter
        } else {
          console.error('Failed to fetch tutors');
        }
      } catch (error) {
        console.error('Error fetching tutors:', error);
      }
    };

    fetchTutors();
  }, []);

  // Filter and sort logic
  useEffect(() => {
    const filtered = allTutors.filter(tutor => {
      const matchesSearch = tutor.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory ? tutor.categories[filterCategory]?.length > 0 : true;

      return matchesSearch && matchesCategory;
    });

    const sorted = filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.fullName.localeCompare(b.fullName);
      } else {
        return b.fullName.localeCompare(a.fullName);
      }
    });

    setFilteredTutors(sorted);
  }, [searchQuery, filterCategory, sortOrder, allTutors]);

  const addToSelected = (tutor) => {
    setSelectedTutors([...selectedTutors, tutor]);
    setFilteredTutors(filteredTutors.filter(t => t.username !== tutor.username));
  };

  const removeFromSelected = (tutor) => {
    setFilteredTutors([...filteredTutors, tutor]);
    setSelectedTutors(selectedTutors.filter(t => t.username !== tutor.username));
  };

  // Handle category search and suggestions
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query) {
      // Filter suggestions based on user input
      const filteredSuggestions = fields.filter(field =>
        field.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFilterCategory(suggestion);
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  const handleSearchSubmit = async () => {
    if (filterCategory) {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const url = `https://backend.akshayy.tech/getTutors?categories=${encodeURIComponent(filterCategory)}`;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFilteredTutors(data.tutors);
        } else {
          console.error('Failed to fetch tutors');
        }
      } catch (error) {
        console.error('Error fetching tutors:', error);
      }
    }
  };

  return (
    <div className="md:ml-24">
      <div className="flex flex-col items-center p-6 space-y-6 mt-24">
        <Sidebar />
        <div className="flex flex-col w-3/5 space-y-4 mb-6">
          <Header />
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <HiSortAscending className="w-6 h-6" />
              <span>Sort by Name</span>
            </button>
           
            <div className="relative w-48">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search categories..."
                className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-40 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={handleSearchSubmit}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <span>Search</span>
            </button>
          </div>

          <div className="flex flex-col space-y-6">
            {/* Selected Tutors Section */}
            <div className="space-y-4">
              {selectedTutors.length > 0 ? (
                selectedTutors.map(tutor => (
                  <div key={tutor.username} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                    <div className="flex w-full justify-between space-x-4">
                      <h3 className="text-lg font-medium">{tutor.fullName}</h3>
                      <p className="text-sm text-gray-600">{tutor.categories.qualifications.join(', ')}</p>
                    </div>
                    <button
                      onClick={() => removeFromSelected(tutor)}
                      className="ml-4 text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No selected tutors.</p>
              )}
            </div>

            {/* Unselected Tutors Section */}
          <div className="space-y-4">
  {filteredTutors.length > 0 ? (
    filteredTutors.map(tutor => (
      <div key={tutor.username} className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
        <div className="flex w-full justify-between space-x-4">
          <h3 className="text-lg font-medium">{tutor.fullName}</h3>
          <p className="text-sm text-gray-600">{tutor.categories.qualifications.join(', ')}</p>
        </div>
        <button
          onClick={() => window.location.href = `/edit-category/${tutor._id}`} // Redirect to edit page
          className="ml-4 text-white bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md"
        >
          Edit
        </button>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No unselected tutors.</p>
  )}
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategoryPage;
