import React from "react";
function JobPostCard({ job_title, job_type, location, obj }) {
    return (
        <div className="border rounded-lg p-4 shadow-md">
            <h1 className="text-xl font-bold">{job_title}</h1>
            <p className="text-sm text-gray-600">{job_type}</p>
            <p className="text-sm text-gray-600">{location}</p>
            {/* Access other properties as needed */}
            {obj.company_name && <p className="mt-2">Company: {obj.company_name}</p>}
            {obj.experience_level && <p>Experience: {obj.experience_level}</p>}
            {/* Don't render the entire obj directly */}
        </div>
    );
}

export default JobPostCard;