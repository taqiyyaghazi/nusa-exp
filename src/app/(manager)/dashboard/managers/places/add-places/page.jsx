'use client';
import AddPlacesForm from '@/components/forms/AddPlacesForm';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { extractURLFromString, getFileBase64 } from '@/utils';

const schema = yup
    .object({
        name: yup.string().required(),
        mapsUrl: yup.string().required(),
        address: yup.string().required(),
        village: yup.string().required(),
        subDistrict: yup.string().required(),
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

    const onSubmit = async (data) => {
        const imageBase64 = await getFileBase64(data.photo[0]);
        const mapsUrl = extractURLFromString(data.mapsUrl);
        const description = draftToHtml(
            convertToRaw(editorValue.getCurrentContent())
        );
        console.log({
            ...data,
            photo: imageBase64,
            mapsUrl,
            description: description,
            filename: data.photo[0].name,
        });
    };
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
            />
        </div>
    );
};

export default AddPlaces;
