"use client";
import uniqid from 'uniqid';
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { useUser } from "@/hooks/useUser";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';




const UploadModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const {user} = useUser();
  const  supabaseClient =useSupabaseClient();
  const router=useRouter();


  const {
    register,
    handleSubmit,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      category:'',
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
     try{
          setIsLoading(true);
          const imageFile =values.image?.[0];
          const songFile= values.song?.[0];
          console.log('Song MIME type:', songFile?.type);
    console.log('Image MIME type:', imageFile?.type);


          if (!imageFile || !songFile || !user){
            toast.error("missing fields");
            return;
          }

    const uniqueID = uniqid();
              //upload songs//
   //upload songs
    const {data:songData, error:songError} = await supabaseClient
    .storage
    .from('songs') 
    .upload(`song-${values.title}-${uniqueID}`, songFile, {
     cacheControl: '3600',
     upsert: false
     });

        if (songError) {
        setIsLoading(false);
        return toast.error("song upload failed"); 
        }

//upload image
     const {data:imageData, error:imageError} = await supabaseClient
      .storage
      .from('images')
       .upload(`image-${values.title}-${uniqueID}`, imageFile, {
       cacheControl: '3600',
       upsert: false
       });

       if (imageError) {
       setIsLoading(false);
       return toast.error("image upload failed");
        }


    const {error:supabaseError} = await supabaseClient
        .from('songs')
        .insert({
          user_id:user.id,
          title: values.title,     
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
          category:values.category
        });
        if(supabaseError)
        {
            setIsLoading(false);
            return toast.error(supabaseError.message)
        }

        router.refresh();
        setIsLoading(false);
        toast.success("song created !!")
        reset();
        uploadModal.onClose()

     }catch(error){
       toast.error("something went wrong");
     }finally {
      setIsLoading(false)
     }
  };

  return (
    <Modal title="Add a Song" description="Upload an Mp3 file" isOpen={uploadModal.isOpen} onChange={onChange}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
         <Input  id="title" disabled={isLoading} {...register('title',{required: true})} placeholder="Song title"/>
         <Input  id="author" disabled={isLoading} {...register('author',{required: true})} placeholder="Song author"/>
         <Input id="category" disabled={isLoading} {...register('category',{required:true})} placeholder='Category name' />
         <div>
          <div className="pb-1">
               Select a song file
          </div>
          <Input id="song" type="file" accept="audio/*" disabled={isLoading} {...register('song', { required: true })} />
         </div>
         <div>
          <div className="pb-1">
               Select an Image
          </div>
          <Input  id="image" type="file" accept="image/*" disabled={isLoading} {...register('image',{required: true})}/>
         </div>
         <Button disabled={isLoading} type="submit">Create</Button>
      </form>
    </Modal>
  );
};  

export default UploadModal;
