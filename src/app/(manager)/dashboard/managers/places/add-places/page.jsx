/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import AddPlacesForm from '@/components/forms/AddPlacesForm';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { extractURLFromString, getFileBase64 } from '@/utils';
import { useAddPlaceMutation } from '@/services/api/placesApi';
import { useAppSelector } from '@/hooks/useRedux';
import useAlert from '@/hooks/useAlert';
import { useRouter } from 'next/navigation';
import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../../../../../../../firebaseConfig';

const schema = yup
    .object({
        name: yup.string().required(),
        mapsUrl: yup.string().required(),
        address: yup.string().required(),
        village: yup.string().required(),
        subdistrict: yup.string().required(),
        regency: yup.string().required(),
        province: yup.string().required(),
        photo: yup
            .mixed()
            .test('fileType', 'File must be an image', (value) => {
                if (value.length === 0) return false;
                const supportedFormats = [
                    'image/jpeg',
                    'image/png',
                    'image/gif',
                ];
                return !supportedFormats.includes(value.type);
            }),
    })
    .required();

const AddPlaces = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [editorValue = EditorState.createEmpty(), setEditorValue] =
        useState();
    const onEditorChange = (value) => {
        setEditorValue(value);
    };
    const showAlert = useAlert();
    const router = useRouter();
    const [fileUrl, setFileUrl] = useState('');

    const state = useAppSelector((state) => state);
    const [addPlace, { data, isLoading, isError, error }] =
        useAddPlaceMutation();

    const onSubmit = async (data) => {
        const file = data.photo[0];
        const mapsUrl = extractURLFromString(data.mapsUrl);
        const description = draftToHtml(
            convertToRaw(editorValue.getCurrentContent())
        );
        const storageRef = ref(
            storage,
            `places/${Number(new Date())}-${file.name}`
        );
        const uploadFile = uploadBytesResumable(storageRef, file);
        uploadFile.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                showAlert('Gagal upload foto!', 'error');
            },
            () => {
                getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) => {
                    const payload = {
                        ...data,
                        photo: downloadURL,
                        mapsUrl,
                        description: description,
                        filename: data.photo[0].name,
                    };
                    console.log(payload)
                    addPlace(payload)
                });
            }
        );
        if (fileUrl) {
        }
    };

    useEffect(() => {
        if (isError) {
            showAlert(error.data.msg, 'error');
        }
        if (data) {
            showAlert(data.msg, 'success');
            const timeout = setTimeout(() => {
                router.push('/');
            }, 3000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isError, data]);

    return (
        <div>
            <AddPlacesForm
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
                editorValue={editorValue}
                onEditorChange={onEditorChange}
                watch={watch}
                isLoading={isLoading}
            />
        </div>
    );
};

export default AddPlaces;
