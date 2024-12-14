import React from "react";
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "./alert-dialog";
import Loader from "./loader";

const DeleteAlert = ({
    id,
    message,
    handleDelete,
    isLoading
}: {
    id: string;
    message?: string;
    handleDelete: (id: string) => void;
    isLoading?: boolean;
}) => {
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. {message}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    disabled={isLoading}
                    className="bg-red-600 focus:ring-red-600 hover:bg-red-700"
                    onClick={() => handleDelete(id)}
                >
                    {isLoading && <Loader />}
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
};

export default DeleteAlert;
