// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

"use server"

// snippet-start:[s3.JavaScript.buckets.getobjectV3]
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getEmbeddings } from "../openai/route";
import { Pinecone } from '@pinecone-database/pinecone';
import { embeddings } from "../pinecone/constants";

 const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string})
 const index = pc.index("chat-pdf")
 const namespace=index.namespace("ns1");

const client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
    }
});

export async function getstring() {
    const command = new GetObjectCommand({
        Bucket: "chat-pdf-rk",
        Key: "uploads/demo3.txt",
    });

    try {
        const response = await client.send(command);
        if (!response){
            console.log("No response");
        }
        
            
            const str = await response.Body?.transformToString() as string;
            console.log(str);
            const embedding=await getEmbeddings(str);
            console.log(embedding);
            try{
                const result = await namespace.upsert([{ "id": "5", "values": embedding,"metadata": {data : str}}]);
                console.log("done");
            }
            catch(error){
                console.log(  "error occured"+  error);
            }

            return str;
        
        // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    } catch (err) {
        console.error(err);
    }
};
// snippet-end:[s3.JavaScript.buckets.getobjectV3]

// Invoke main function if this file was run directly.
