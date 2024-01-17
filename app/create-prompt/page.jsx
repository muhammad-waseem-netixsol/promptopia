"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [propmptValid, setPromptValid] = useState(true);
  const [tagIsValid, setTagIsValid] = useState(true);
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();
    
    if(post.prompt.trim() === ""){
      setPromptValid(false);
      return ;
    }
    if(post.tag.trim() === ""){
      setTagIsValid(false);
      return ;
    }
    try {
      setIsSubmitting(true);
      setPromptValid(true);
      setTagIsValid(true);
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
      propmtValidity={propmptValid}
      tagValidity={tagIsValid}
    />
  );
};

export default CreatePrompt;
