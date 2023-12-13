import React from 'react'
import { db } from '@/db'
import { notFound } from 'next/navigation'
import Snippeteditform from '@/app/components/snippet-edit-form'

interface SnippetEditPageProps {
    params:{
        id:string
    }
}

export default async function page(props:SnippetEditPageProps) {
    const id= parseInt(props.params.id)
    const snippet = await db.snippet.findFirst({
        where:{id}
    })
    if(!snippet){
        return notFound()
    }

  return (
    <div>
        <Snippeteditform snippet={snippet}/>
    </div>
  )
}
