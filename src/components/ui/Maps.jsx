import React from 'react';

const Maps = ({ url }) => {
    return (
        <iframe
            src={url}
            className="w-full h-72"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    );
};

export default Maps;
