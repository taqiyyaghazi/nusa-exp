/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import useFile from '@/hooks/useFile';
import Image from 'next/image';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { extractURLFromString } from '@/utils';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });

const AddPlacesForm = ({
    editorValue,
    onEditorChange,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading = false,
    watch,
}) => {
    const [fileData = null, setFileData] = useState();
    const [mapsUrl = null, setMapsUrl] = useState();
    useEffect(() => {
        const fileList = watch('photo');
        if (fileList) {
            const file = fileList[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setFileData({
                    fileName: file.name,
                    base64: reader.result,
                });
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        }
        let maps = watch('mapsUrl');
        if (maps) {
            maps = extractURLFromString(maps);
            setMapsUrl(maps);
        }
    }, [watch('photo'), watch('mapsUrl')]);

    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                            {...register('name')}
                        />
                        {errors.name && (
                            <span className="normal-case text-xs text-red-400">
                                {errors.name.message}
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    {fileData && (
                        <figure className="my-3 h-56 w-full relative">
                            <Image
                                src={fileData.base64}
                                alt={fileData.fileName}
                                fill={true}
                                className="rounded-xl object-cover"
                            />
                        </figure>
                    )}
                    <label
                        htmlFor="photo"
                        className="flex flex-col hover:text-gray-400 items-center justify-center border rounded-md p-5 text-sm font-medium leading-6 text-gray-900 cursor-pointer ease-in-out duration-300"
                    >
                        <ArrowUpOnSquareIcon className="w-10 h-10" />
                        <p>Upload Foto Cover</p>
                    </label>
                    <div className="mt-2">
                        <input
                            id="photo"
                            name="photo"
                            type="file"
                            className="hidden w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                            {...register('photo')}
                        />
                        {errors.photo && (
                            <span className="normal-case text-xs text-red-400">
                                {errors.photo.message}
                            </span>
                        )}
                    </div>
                </div>
                <Editor
                    editorState={editorValue}
                    wrapperClassName="border rounded"
                    editorClassName="p-2 text-gray-900"
                    onEditorStateChange={onEditorChange}
                />
                <div>
                    <label
                        htmlFor="mapsUrl"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Maps Url
                    </label>
                    <div className="mt-2">
                        <input
                            id="mapsUrl"
                            name="mapsUrl"
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                            {...register('mapsUrl')}
                        />
                        {errors.mapsUrl && (
                            <span className="normal-case text-xs text-red-400">
                                {errors.mapsUrl.message}
                            </span>
                        )}
                    </div>
                </div>
                {mapsUrl && (
                    <iframe
                        src={mapsUrl}
                        className="w-full h-72"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                )}

                <div>
                    <label
                        htmlFor="address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Alamat
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="address"
                            name="address"
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                            {...register('address')}
                        />
                        {errors.address && (
                            <span className="normal-case text-xs text-red-400">
                                {errors.address.message}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-x-5">
                    <div className="flex flex-1 items-center gap-x-2">
                        <label
                            htmlFor="village"
                            className="block w-1/3 text-sm font-medium leading-6 text-gray-900"
                        >
                            Desa/Kelurahan
                        </label>
                        <div className="mt-2 w-2/3">
                            <input
                                id="village"
                                name="village"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                {...register('village')}
                            />
                            {errors.village && (
                                <span className="normal-case text-xs text-red-400">
                                    {errors.village.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-1 items-center gap-x-2">
                        <label
                            htmlFor="subdistrict"
                            className="block w-1/3 text-sm font-medium leading-6 text-gray-900"
                        >
                            Kecamatan
                        </label>
                        <div className="mt-2 w-2/3">
                            <input
                                id="subdistrict"
                                name="subdistrict"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                {...register('subdistrict')}
                            />
                            {errors.subdistrict && (
                                <span className="normal-case text-xs text-red-400">
                                    {errors.subdistrict.message}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-x-5">
                    <div className="flex flex-1 items-center gap-x-2">
                        <label
                            htmlFor="regency"
                            className="block w-1/3 text-sm font-medium leading-6 text-gray-900"
                        >
                            Kabupaten
                        </label>
                        <div className="mt-2 w-2/3">
                            <input
                                id="regency"
                                name="regency"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                {...register('regency')}
                            />
                            {errors.regency && (
                                <span className="normal-case text-xs text-red-400">
                                    {errors.regency.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-1 items-center gap-x-2">
                        <label
                            htmlFor="province"
                            className="block w-1/3 text-sm font-medium leading-6 text-gray-900"
                        >
                            Provinsi
                        </label>
                        <div className="mt-2 w-2/3">
                            <input
                                id="province"
                                name="province"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                {...register('province')}
                            />
                            {errors.province && (
                                <span className="normal-case text-xs text-red-400">
                                    {errors.province.message}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                {/* TO DO: Bikin komponen button */}
                <div>
                    {isLoading ? (
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled
                        >
                            <span className="loading loading-spinner loading-sm"></span>{' '}
                            <p className="ml-2">Loading...</p>
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </>
    );
};

export default AddPlacesForm;
