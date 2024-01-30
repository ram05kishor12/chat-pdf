"use client";
//import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
//import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { uploadToS3 } from "@/lib/s3";
import toast from "react-hot-toast";

// https://github.com/aws/aws-sdk-js-v3/issues/4126

const FileUpload = () => {
    const [uploading, setUploading] = React.useState(false);
    const {mutate, isLoading} = useMutation(
        {
           mutationFn: async ({file_key,file_name} : {file_key : string , file_name:string}) => {
             const response = await axios.post('/api/create-chat', {file_key,file_name})
             return response.data
           }
        }
    );
    const { getRootProps, getInputProps } = useDropzone(
        {
            accept: {"application/pdf" : [".pdf"]} ,
            maxFiles: 1,
            onDrop: async (acceptedFiles: File[]) => {
                console.log(acceptedFiles);
                const file = acceptedFiles[0]
                if(file.size > 10*1024*1024){
                    toast.error("File size should be less");
                    return
                }

                try{
                const data = await uploadToS3(file)
                if(!data?.file_key || !data?.file_name){
                    toast.error("Error uploading file");
                    return
                }
                mutate(data,{
                    onSuccess: (data) => {
                        console.log(data);
                    },
                    onError: (error) => {
                        toast.error("Error creating chat");
                    },
                })
                console.log(data) 
                }
                catch(err){
                    console.log(err)
                }
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