import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export function useFetchFiles() {
  const [EmployeesFiles, setEmployeesFiles] = useState([]);

  const fetchFiles = useCallback(async () => {
    try {
        // Fetch the list of files in the medarbetare directory
      const response = await axios.get(
        `https://api.github.com/repos/kits-ab/kits/contents/content/medarbetare`,
      );
      if (response.status === 200) {
        const filesData = response.data
          .filter((item: { type: string }) => item.type === 'file')
          // Fetch the content of each file
          .map(async (item: { download_url: string }) => {
            const mdContentResponse = await axios.get(item.download_url);
            const mdContent = mdContentResponse.data;
             // Extract title and alumni attributes from the markdown content
            const titleMatch = mdContent.match(/^title: (.*)$/m);
            const alumniMatch = mdContent.match(/^alumni: (.*)$/m);
            // map the extracted values to an object
            const title = titleMatch ? titleMatch[1] : 'Untitled';
            // set alumni to false if it doesn't exist otherwhise keep the value
            const alumni = alumniMatch ? alumniMatch[1] : false;
            // return the object
            return { title, alumni };
          });

        Promise.all(filesData).then((fileTitles) => {
            // Include files where alumni is false or where the alumni attribute doesn't exist
          const filteredFiles: any = fileTitles.filter(
            (file) => !file.alumni || file.alumni === 'false',
          );
          // Set the files state to the filtered files
          setEmployeesFiles(filteredFiles);
        });
      } else {
        console.error('Error fetching files:', response.statusText);
      }
    } catch (error: any) {
      console.error('Error fetching files:', error.message);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return { EmployeesFiles, fetchFiles };
}