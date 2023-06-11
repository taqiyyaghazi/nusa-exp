import React from 'react';

const Avatar = ({ placeholder }) => {
    return (
        <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                <span>{placeholder}</span>
            </div>
        </div>
    );
};

export default Avatar;
