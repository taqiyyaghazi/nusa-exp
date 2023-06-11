import { useEffect } from 'react';
import Swal from 'sweetalert2';

const useAlert = () => {
    const showAlert = (message, type = 'success') => {
        if (type === 'success') {
            Swal.fire({
                title: 'Success',
                text: message,
                icon: type,
                showConfirmButton: false,
                timer: 3000,
            });
        }
        if (type === 'error') {
            Swal.fire({
                title: 'Oops..',
                text: message,
                icon: type,
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };

    useEffect(() => {
        // Clean up SweetAlert when the component unmounts
        return () => {
            Swal.close();
        };
    }, []);

    return showAlert;
};

export default useAlert;
