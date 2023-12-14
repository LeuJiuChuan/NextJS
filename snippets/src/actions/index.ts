"use server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function editSnippet(id: number, code: string) {
  console.log("edit snippet called");
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  revalidatePath(`/snippets/${id}`)
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    //   check the user's inpurt and make sure they're valid
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title nust be longer",
      };
    }
    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "code must be longer",
      };
    }
    //create a new  record in the database
    await db.snippet.create({
      data: {
        title: title,
        code: code,
      },
    });

    // throw new Error('Failed to save to database!!!!') withotu this it wont show any error page
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "Something went wrong...",
      };
    }
  }
  revalidatePath('/')
  //   Redirect the user back to the root route
  //never put redirect statement in trycatch
  redirect("/");
}
