"use server";

import { log } from "console";
import { z } from "zod";
import { auth } from "@/auth";
import type { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import paths from "@/paths";
import { db } from "@/db";
import { resolve } from "path";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "must be lower case letter or dashed without spaces",
    }),
  description: z.string().min(10),
});

interface createTopicFormState {
  erros: {
    name?: string[];
    description?: string[];
    _form?:string[]
  };
}

export async function createTopic(
  formState: createTopicFormState,
  formData: FormData
): Promise<createTopicFormState> {
  //TODO: revalidate the homepage
 
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });
  if (!result.success) {
    return{
        erros:result.error.flatten().fieldErrors
    }
  }

  const session = await auth();
  if (!session || !session.user){
    return{
        erros:{
            _form:['You must be signed in to do this']
        }
    }
  }
let topic:Topic;
  try{
   topic= await db.topic.create({
        data:{
            slug:result.data.name,
            description: result.data.description
        }
    })
  } catch (err:unknown){
        if(err instanceof Error){
            return{
                erros:{
                    _form:[err.message]
                }
            }
        }else{
            return{
                erros:{
                    _form:['Something went wrong']
                }
            }
        }
  }
  revalidatePath('/')
  redirect(paths.topicShowPath(topic.slug))

//   return {
//     erros:{}
//   };


}
