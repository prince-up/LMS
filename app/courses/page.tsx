import React from 'react'

export default function page() {
    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/courses');
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };
    
  return (
    <div>
        
    </div>
  )
}
