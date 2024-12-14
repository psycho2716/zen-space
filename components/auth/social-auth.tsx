"use client";

import { socials } from "@/data/socials";
import SocialButton from "../social-btn";
import { Provider } from "@supabase/supabase-js";
import { StatusProps } from "@/types/type";
import { useState } from "react";

const SocialAuth = ({
    status,
    handleSocialAuth
}: {
    status: StatusProps | null;
    handleSocialAuth: (provider: Provider) => void;
}) => {
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

    const handleClick = (provider: Provider) => {
        handleSocialAuth(provider);
        setSelectedProvider(provider);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {socials.map((social) => {
                const provider = social.provider;

                return (
                    <SocialButton
                        key={social.provider} // Add a unique key
                        oauthProvider={provider as Provider}
                        handleClick={() => handleClick(provider as Provider)}
                        icon={social.icon}
                        isLoading={status?.state === "loading" && selectedProvider === provider}
                        disabled={status?.state === "loading" && status?.method === "oauth"}
                        buttonText={social.name}
                    />
                );
            })}
        </div>
    );
};

export default SocialAuth;
