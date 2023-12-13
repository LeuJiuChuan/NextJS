import React from "react";
import { db } from "@/db";
import { redirect } from "next/navigation";

export default function SnippetCreatePage() {
  async function createSnippet(formData:FormData) {
    //this needs to be a server action
    'use server'

    // check the user's inpurt and make sure they're valid
    const title = formData.get('title') as string
    const code = formData.get('code') as string
    //create a new  record in the database
    const snippet=await db.snippet.create({
        data:{
            title:title,
            code:code
        }
    });
    console.log(snippet);
    
    // Redirect the user back to the root route
    redirect('/')
  }

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 ">
          <label className="w-12" htmlFor="title">
            title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>

        <div className="flex gap-4 ">
          <label className="w-12" htmlFor="code">
            code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>
        <button type="submit" className=" rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
