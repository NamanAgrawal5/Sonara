"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

interface USerProviderProps{
    children: React.ReactNode;
};

const UserProvider: React.FC<USerProviderProps> = ({
    children
})=>{
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    )
};
export default UserProvider;