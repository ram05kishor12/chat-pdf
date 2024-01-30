"use client";
//import { uploadToS3 } from "@/lib/s3";
//import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
//import axios from "axios";
//import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// https://github.com/aws/aws-sdk-js-v3/issues/4126

const FileUpload = () => {
    const { getRootProps, getInputProps } = useDropzone(
        {
            accept: {"application/pdf" : [".pdf"]} ,
            maxFiles: 1,
            onDrop: (acceptedFiles: File[]) => {
                console.log(acceptedFiles);
            }
        }
    );
    return (
        <div className="p-2 bg-white rounded-xl">
            <div
                {...getRootProps({
                    className:
                        "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
                })}
            >
                <input {...getInputProps()} />

                <>
                    <Inbox className="h-16 w-16 text-gray-400" />
                    <p className="text-gray-400">Drag and drop your PDF here</p>
                </>

            </div>
        </div>
    );
};

export default FileUpload;