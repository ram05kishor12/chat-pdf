"use server"

import { Pinecone } from '@pinecone-database/pinecone';
import { get } from 'http';
import { getEmbeddings } from '../openai/route';
import { vectorse } from '../pinecone/constants';

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string })
const index = pc.index("chat-pdf")
const namespace = index.namespace("ns1");

export async function match(){
     const vectors=await getEmbeddings("what is the size of library & its books volume?");
    // try {
    //     const result = await namespace.upsert([{ "id": "3", "values": vectors }]);
    //     console.log("done" + result);
    // }
    // catch (error) {
    //     console.log("error occured" + error);
    // }
    // const fetchResult = await namespace.fetch(['4']);
    //const fetchResults = await namespace.fetch(['3']);
    // console.log(fetchResult.records[3].values);
    
    const queryResponse = await namespace.query({
        vector: vectors,
        topK: 3,
        includeMetadata: true,
        
    })
    // console.log(queryResponse);
    type Metadata={
        data:string
    }
    const qualify=queryResponse.matches.filter((match)=> match.score && match.score >0.7);
    const content=qualify.map((match)=>(match.metadata as Metadata));

   
    console.log(content[0].data);
    return content[0].data;
   
}
