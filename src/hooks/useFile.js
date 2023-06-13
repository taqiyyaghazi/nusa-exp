import { useState } from 'react';

const useFile = () => {
  const [fileData, setFileData] = useState({
    fileName: '',
    base64: ''
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFileData({
        fileName: file.name,
        base64: reader.result
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return { fileData, handleFileChange };
};

export default useFile;
