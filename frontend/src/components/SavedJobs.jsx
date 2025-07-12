import React, { useEffect, useState } from 'react';
import Job from './Job'; // reuse your Job component

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobs(jobs);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Saved Jobs</h1>

      {savedJobs.length === 0 ? (
        <p className="text-gray-600">You haven't saved any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
