import { createClient } from "@/utils/supabase/server";

export type UserMetaDataProps = {
    full_name: string; // Full name of the user
    name: string; // Display name of the user
    user_name: string; // Username
    preferred_username: string; // Preferred username
    email: string; // Email address of the user
    picture: string; // URL to the user's picture
    avatar_url: string; // URL to the avatar
};

const updateUserInfo = async (newUserInfo: UserMetaDataProps) => {
    const supabase = await createClient();
    const loggedInUser = await fetchUser();

    const { error } = await supabase.auth.admin.updateUserById(loggedInUser?.id, {
        user_metadata: {
            ...loggedInUser?.raw_user_meta_data,
            ...newUserInfo
        }
    });

    if (error) {
        console.error("Update user info error:", error);
        return null;
    }

    return true;
};

const fetchUser = async (id?: string) => {
    const supabase = await createClient();
    let fetchedUser = null;

    if (!id) {
        const {
            data: { user }
        } = await supabase.auth.getUser();

        fetchedUser = user;
    } else {
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error("User by id error:", error);
            return null;
        }

        fetchedUser = user;
    }

    return fetchedUser;
};

export { updateUserInfo, fetchUser };
