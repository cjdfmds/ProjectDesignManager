import React from 'react';
import './HolyMotherOf.css';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material'; // Import Material UI components

const items = [
    { label: 'BUSINESS CARD', image: 'icprojects1.png' },
    { label: 'BROCHURE/ FLYER/ POSTER', image: 'icprojects2.png' },
    { label: 'LOGO', image: 'icprojects3.png' },
    { label: 'MOTION GRAPHIC', image: 'icprojects4.png' },
    { label: 'BOOKLET MAGAZINE', image: 'icprojects5.png' },
    { label: 'EMAIL/ TEMPLATE', image: 'icprojects6.png' },
    { label: 'BANNER/ SIGNAGE', image: 'icprojects7.png' },
    { label: 'ILLUSTRATION', image: 'icprojects8.png' }
];

const StartNewProject = () => {
    return (
        <div className="start-new-project">
            <h2>Select a Project Type</h2>
            <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
                {items.map((item, index) => (
                    <Card className="project-card" key={index}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={process.env.PUBLIC_URL + `/imageprojects/${item.image}`}
                                alt={item.label}
                                className="project-card-media"
                            />
                            <CardContent className="project-card-content">
                                <Typography variant="h7" component="p" align="center" className="project-card-text">
                                    {item.label}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </div>
    );
};

export default StartNewProject;
