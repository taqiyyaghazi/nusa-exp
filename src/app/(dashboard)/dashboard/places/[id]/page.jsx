/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Maps from '@/components/ui/Maps';
import useAlert from '@/hooks/useAlert';
import {
    useGetWorklistsPlacesByIdQuery,
    usePublishPlaceMutation,
} from '@/services/api/worklistsApi';
import { Button, Card, CardBody, CardFooter } from '@material-tailwind/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const DetailPlaces = () => {
    const params = useParams();
    const id = params.id;
    const { data, error, isLoading } = useGetWorklistsPlacesByIdQuery(id);
    const showAlert = useAlert();
    const router = useRouter();

    const [
        publishPlace,
        {
            data: resultUpdate,
            isLoading: isLoadingUpdate,
            isError: isErrorUpdate,
            error: errorUpdate,
        },
    ] = usePublishPlaceMutation();

    const handleSubmitPublish = (id) => {
        publishPlace(id);
    };

    // TO DO: bikin custom hook untuk handle alert ketika connect api
    useEffect(() => {
        console.log(errorUpdate);
        if (isErrorUpdate) {
            showAlert(errorUpdate.data.msg, 'error');
        }
        if (data) {
            showAlert(resultUpdate.msg, 'success');
            const timeout = setTimeout(() => {
                router.push('/dashboard');
            }, 3000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isErrorUpdate, resultUpdate]);

    if (isLoading) {
        return <p>Loading.....</p>;
    }

    return (
        <Card>
            <CardBody className="p-8">
                <div className="w-full h-60 lg:h-80 relative">
                    <Image
                        src={data?.data.file_url}
                        alt={data?.data.filename}
                        fill={true}
                        className="rounded-xl object-cover"
                    />
                </div>
                <h1 className="font-bold text-2xl mb-2">{data?.data.name}</h1>
                <p className="mb-5">
                    Alamat:{' '}
                    {`${data?.data.address}, ${data?.data.village}, ${data?.data.subdistrict} , ${data?.data.regency}, ${data?.data.province}`}
                </p>
                <div
                    dangerouslySetInnerHTML={{ __html: data?.data.description }}
                    className="mb-5"
                ></div>
                <Maps url={data?.data.maps_url} />
            </CardBody>
            <CardFooter className="flex justify-end">
                <div onClick={() => handleSubmitPublish(id)}>
                    {isLoadingUpdate ? (
                        <Button
                            className="flex items-center justify-center"
                            disabled
                        >
                            {' '}
                            <span className="loading loading-spinner loading-sm"></span>{' '}
                            <p className="ml-2">Loading...</p>
                        </Button>
                    ) : (
                        <Button>Publikasi</Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};

export default DetailPlaces;
