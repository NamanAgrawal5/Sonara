"use client";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import useLibraryModal from "@/hooks/useLibraryModal";
import { toast } from "react-hot-toast";
import { Modal } from "./Modal";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
export const LibraryModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useLibraryModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      image: null,
    },
  });
  const onchange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      if (!imageFile || !user) {
        toast.error("Missing Fields");
        return;
      }
      const uniqueId = uniqid();
      //Upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueId}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload");
      }
      const { error: supabaseError } = await supabaseClient
        .from("libraries")
        .insert({
            title: values.title,
            image_path: imageData.path,
            user_id: user.id,
        });
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success('Library created');
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Something went Wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Create new Playlist"
      description="Add your new Playlist to Library"
      isOpen={uploadModal.isOpen}
      onChange={onchange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Playlist title"
        />
        
        <div>
          <div className="pb-1">Select a Thumbnail</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};
