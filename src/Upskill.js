
import React, { useState, useEffect } from 'react';
import clock from './assets/Upskill/ClockOutline.svg';
import chart from './assets/Upskill/ChartBarOutline.svg';
import doc from './assets/Upskill/doc.svg';
import './App.css';
import ab from './assets/Upskill/Vector.svg';
import cd from './assets/Upskill/Vector (1).svg';
import cal from './assets/Upskill/CalendarOutline.svg';
import cas from './assets/Upskill/BriefcaseOutline.svg';
import video1 from './assets/Upskill/PlayOutline.svg';
import ques from './assets/Upskill/qm.svg';
import code from './assets/Upskill/CodeOutline.svg';
import doc1 from './assets/Upskill/doc1.svg';
import info from './assets/Upskill/InformationCircleOutline.svg';

const typographyStyles = {
    fontFamily: 'DM Sans',
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '44px',
    letterSpacing: '-0.03em',
    textAlign: 'justify',
  };
  const typographyStyles1 = {
    fontFamily: 'DM Sans',
    fontSize: '22px',
    fontWeight: 700,
    lineHeight: '44px',
    letterSpacing: '-0.03em',
    textAlign: 'justify',
  };
const resources = [
    { type: 'Video', icon: video1 },
    { type: 'Article', icon: ques},
    { type: 'Quiz', icon: ques},
    { type: 'Coding Exercise', icon: code },
    { type: 'Combined Resource', icon: doc1},
  ];
const Upskill = () => {
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768);
  const [activeTab, setActiveTab] = useState('mentor');
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [expandedPart, setExpandedPart] = useState(1); // Track which part is expanded

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const chapters = ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5'];

  const renderPartContent = (partNumber, completedPercentage, lastIconText) => (
    <div style={{ textAlign: 'left', marginBottom: '20px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
    <p>PART {partNumber}</p>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'-20px' }}>
       
        <p style={{ ...typographyStyles1, flex: 1 }}><strong>Lorem ipsum dolor sit amet</strong></p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <img src={clock} alt="Clock" style={{ width: '16px', height: '16px' }} />
          <span>02:00:00</span><spacer></spacer>
          <img src={chart} alt="Medium Icon" style={{ width: '16px', height: '16px' }} />
          <span>Medium</span><spacer></spacer>
          <img src={doc} alt="Number Icon" style={{ width: '16px', height: '16px' }} />
          <span>{lastIconText}</span>
          <span onClick={() => setExpandedPart(expandedPart === partNumber ? null : partNumber)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
            {expandedPart === partNumber ? <img src={ab} alt="Number Icon" style={{ width: '16px', height: '16px' }} /> : <img src={cd} alt="Number Icon" style={{ width: '16px', height: '16px' }} />}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
        <div style={{
          padding: '5px 5px',
          backgroundColor: '#EFF5FF',
          color: 'black',
          borderRadius: '4px',
          width:'90px',
          textAlign: 'center',
          marginBottom: '10px',
          fontSize: '13px',
        }}>
          {completedPercentage}% completed
        </div>
      </div>
      <div style={{ backgroundColor: '#F0F0F0', padding: '2px', borderRadius: '8px', marginBottom: '15px' }}>
        <div style={{ backgroundColor: '#000', height: '10px', width: `${completedPercentage}%`, borderRadius: '8px' }}></div>
      </div>
 

{expandedPart === partNumber && (
  <div>
    {resources.map((resource, idx) => (
      <div key={idx} style={{ display: 'flex', alignItems: 'center', marginTop: '15px',marginBottom: '15px', borderBottom: '1px solid',
        borderImageSource: 'linear-gradient(90deg, rgba(23, 43, 77, 0) 0%, #172B4D 49.54%, rgba(5, 68, 94, 0) 100%)', borderImageSlice: 2, paddingTop: '10px' }}>
        <img src={resource.icon} alt={resource.type} style={{ width: '16px', marginRight: '10px' }} />
        <span style={{ ...typographyStyles, flex: 1 }}><strong>{`${resource.type} ${idx + 1}`}</strong></span>
  
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <img src={clock} alt="Clock Icon" style={{ width: '16px' }} />
          <span>10:00</span>
        </div>
      </div>
    ))}
  </div>
)}


    </div>
  );

  return (
    <div style={{ backgroundColor: '#FFFFFF',  height: '100%', position: 'relative', fontFamily: 'DM Sans, sans-serif' }}>
    {isWideScreen ? ( <div className="abc" style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: '#FFFFFF',
        padding: '10px 15px',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'DM Sans',
        fontSize: '16px',
      }}>
         
        <img src={info} alt="How it works icon" style={{ width: '20px', marginRight: '10px' }} /><span>How it works</span></div>
      ) : (
        <div style={{ width: '20px', height: '20px', marginRight: '10px' }}></div>
      )}
      
      <div style={{
        background: 'linear-gradient(180deg, #EFF5FF 0%, rgba(239, 245, 255, 0) 100%)',
        padding: '10px',
        width: '300px',
        borderRadius: '8px',
        display: 'flex',
        gap: '10px',
        marginTop: '10px',
        alignItems: 'center'
      }}>
        <div
          onClick={() => {
            setActiveTab('mentor');
            setSelectedChapter(null);
          }}
          style={{
            backgroundColor: activeTab === 'mentor' ? '#FFFFFF' : '',
            padding: '6px 8px', 
            borderRadius: '8px',
            width: '140px',
            textAlign: 'center',
            cursor: 'pointer',
            border: activeTab === 'mentor' ? '1px solid #000' : 'none',
          }}
        >
          <h3 style={{ fontSize: '12px', margin: 0 }}><img src={cal} alt="Number Icon" style={{ width: '16px', height: '16px', marginBottom:'-3px' }} /><spacer></spacer>&nbsp;Mentor Sessions</h3> {/* Smaller font size */}
        </div>
        <div
          onClick={() => {
            setActiveTab('learning');
            setSelectedChapter(null);
          }}
          style={{
            backgroundColor: activeTab === 'learning' ? '#FFFFFF' : '#F0F0F0',
            padding: '6px 8px', 
            borderRadius: '8px',
            width: '140px',
            textAlign: 'center',
            cursor: 'pointer',
            border: activeTab === 'learning' ? '1px solid #000' : 'none',
          }}
        >
          <h3 style={{ fontSize: '12px', margin: 0 }}><img src={cas} alt="Number Icon" style={{ width: '16px', height: '16px', marginBottom:'-3px' }} /><spacer></spacer>&nbsp;Learning Material</h3> {/* Smaller font size */}
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #D0D0D0', borderRadius: '8px' }}>
        {activeTab === 'mentor' ? (
          <div>
            <h3>Mentor Sessions Content</h3>
            <p>This section provides details and resources for mentor sessions.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: '1',  borderRadius: '8px', padding: '10px' }}>
              <h3>Chapters</h3>
              {chapters.map((chapter, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedChapter(chapter)}
                  style={{
                    cursor: 'pointer',
                    padding: '10px',
                    backgroundColor: selectedChapter === chapter ? '#EFF5FF' : '#FFFFFF',
                     borderRadius: '4px',
                    marginBottom: '8px',
                    borderBottom: '1px solid',
        borderImageSource: 'linear-gradient(90deg, rgba(23, 43, 77, 0) 0%, #172B4D 49.54%, rgba(5, 68, 94, 0) 100%)', borderImageSlice: 2, 
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'DM Sans',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{chapter}</span>
                  {selectedChapter === chapter && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <img
                        src={clock} 
                        alt="Clock"
                        style={{ width: '16px', height: '16px' }}
                      />
                      <span>05:00:00</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ flex: '2', padding: '20px' }}>
              {selectedChapter === 'Chapter 1' ? (
                <>
                  {renderPartContent(1, 45, 5)}
                  {renderPartContent(2, 20, 12)}
                  {renderPartContent(3, 0, 0)}
                </>
              ) : (
                <p>Select Chapter 1 chapter to view details.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upskill;
