import React from 'react';
import './StartNewProject.css'; // Import a CSS file for styling (optional)

const items = [
    'BUSINESS CARD',
    'BROCHURE/FLYER/POSTER',
    'LOGO',
    'MOTION GRAPHIC',
    'BOOKLET MAGAZINE',
    'EMAIL/TEMPLATE',
    'BANNER/SIGNAGE',
    'ILLUSTRATION'
];

const StartNewProject = () => {
    return (
        <div className="start-new-project">
            <h2>Select a Project Type</h2>
            <div className="project-items">
                {items.map((item, index) => (
                    <div className="project-item" key={index}>
                        <img src={`${process.env.PUBLIC_URL}/imageprojects/icprojects${index + 1}.png`} alt={item} />
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StartNewProject;
