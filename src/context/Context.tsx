import { useNavigation } from "@react-navigation/native";
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface DataContextType {
    data: any[];
    setData: Dispatch<SetStateAction<any[]>>;
    isLoading: boolean;
    isShow: boolean;
    isSuccess: boolean;
    isFetching: boolean;
    selectedId: string;
    handleShow: (id?: string) => void;
    handleSuccess: () => void;
    handleCreateSubmit: (data: any) => void;
    handleUpdateSubmit: (id: string, data: any) => void;
    handleDeleteSubmit: () => void;
    handleSelectedId: (id: string) => void;
    fetchData: () => void;
}

export const Context = createContext<DataContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<any[]>([
        {
            id: 1,
            name: 'John Doe',
            age: 30,
        },
        {
            id: 2,
            name: 'Jane Doe',
            age: 25,
        }
    ]);

    const [selectedId, setSelectedId] = useState('');
    const [isShow, setIsShow] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleShow = (id?: string) => {
        id && setSelectedId(id);
        setIsShow(!isShow);
    }

    const handleSuccess = () => {
        setIsSuccess(!isSuccess);
    }

    const handleSelectedId = (id: string) => {
        setSelectedId(id);
    }

    const handleCreateSubmit = async (data: any) => {
        console.log(data);
        fetch(
            `https://crudcrud.com/api/d1704c0ed6294965a6bd9961be2ef599/unicorns`,
            { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            }
        ).then(async (response) => {
            handleSuccess();
        }).catch((err) => 
            console.log(err)
        ).finally(() => {
            setIsLoading(false)
        });    
    }

    const handleUpdateSubmit = async (id: string, data: any) => {
        setIsLoading(true);
        fetch(
            `https://crudcrud.com/api/d1704c0ed6294965a6bd9961be2ef599/unicorns/${id}`,
            { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            }
        ).then(async (response) => {
            handleSuccess();
        }).catch((err) => 
            console.log(err)
        ).finally(() => {
            setIsLoading(false)
        });    
    }

    const handleDeleteSubmit = async () => {
        handleShow();

        setIsLoading(true);
        fetch(
            `https://crudcrud.com/api/d1704c0ed6294965a6bd9961be2ef599/unicorns/${selectedId}`,
            { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(async (response) => {
            handleSuccess();
        }).catch((err) => 
            console.log(err)
        ).finally(() => {
            setIsLoading(false)
        });
    }

    const fetchData = async () => {
        setIsFetching(true);
        fetch(
            'https://crudcrud.com/api/d1704c0ed6294965a6bd9961be2ef599/unicorns',
            { 
                method: 'GET' 
            }
        ).then(async (response) => {
            if (response.ok) {
                const res = await response.json();
                console.log(res);
                setData(res);
            }
        }).catch((err) => 
            console.log(err)
        ).finally(() => setIsFetching(false));
    }

    return (
        <Context.Provider
            value={{
                data,
                setData,
                isLoading,
                isFetching,
                isShow,
                isSuccess,
                selectedId,
                handleSuccess,
                handleShow,
                handleCreateSubmit,
                handleUpdateSubmit,
                handleDeleteSubmit,
                handleSelectedId,
                fetchData
            }}
            children={children}
        />
    );
};

export default Context;
