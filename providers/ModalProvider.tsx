"use client"

import { useEffect, useState } from "react"
import AuthModal from "@/components/AuthModal";
import { UploadModal } from "@/components/UploadModal";
import SubscribeModal from "@/components/SubsribeModal";
import { LibraryModal } from "@/components/LibraryModal";
import { ProductWithPrice } from "@/types";
interface ModalProviderProps{
    products: ProductWithPrice[];
}
export const ModalProvider:React.FC<ModalProviderProps> = ({
    products
}) => {
    
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    },[]);
    if(!isMounted){
        return null;
    }
    return (
        <>
        <AuthModal />
        <UploadModal />
        <LibraryModal />
        <SubscribeModal products={products} />
        </>
    )
}