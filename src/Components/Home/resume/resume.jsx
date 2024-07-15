import React from 'react';

function Resume({ name, profileImage, sections }) {
  const formatText = (text) => {
    const formattedText = text
        .replace(/\*(.+?)\*/gs, '<b>$1</b>') // 's' flag to handle multiline strings
        .replace(/~(.+?)~/gs, '<i>$1</i>')
        .replace(/_(.+?)_/gs, '<u>$1</u>')
        .replace(/\[(.*?)\]\((.*?)\)/g,'<a href="$2" target="_blank" class=" underline">$1</a>');
        console.log(formattedText);
    return formattedText;
  };

  return (
    <div id="resumePreview" className="resumePreview">
      <div className="mb-1 flex justify-between items-center">
        <div></div>
        <h1 className="text-xl font-bold  uppercase">{name}</h1>
        {profileImage && <img src={profileImage} alt="Profile" className="w-10 h-10" />}
      </div>
      {sections.map((section, index) => (
        <div key={index} className="flex flex-col">
          
          <h4 className='uppercase' ><b>{section.title}</b></h4>
          <div className='h-[2px] bg-black mt-1'></div>
        
          {section.subheadings.map((subheading, subheadingIndex) => (
            <div key={subheadingIndex} className="bg-white p-2 ">
              <p className="" dangerouslySetInnerHTML={{__html:formatText(subheading.subtitle)}}/>
              <ul className="list-inside list-disc ml-5">
                {subheading.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} dangerouslySetInnerHTML={{ __html: formatText(bullet) }} />
                ))}
              </ul>
              {

                subheading.lines.length!=0 && <div className='h-[1px] bg-black'></div>
              }
              
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Resume;
