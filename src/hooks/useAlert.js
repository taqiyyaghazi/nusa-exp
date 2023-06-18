'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const useAlert = () => {
    const router = useRouter();
    const showAlert = (
        message,
        type = 'success',
        confirmMessage = '',
        confirmButtonText = '',
        onConfirm = () => {}
    ) => {
        if (type === 'success') {
            Swal.fire({
                title: 'Success',
                text: message,
                icon: type,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
        if (type === 'error') {
            Swal.fire({
                title: 'Oops..',
                text: message,
                icon: type,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
        if (type === 'confirm') {
            Swal.fire({
                title: 'Apakah anda yakin?',
                text: confirmMessage,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: confirmButtonText,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Success', message, 'success');
                    onConfirm();
                    router.refresh();
                }
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
