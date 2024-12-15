"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import SocialAuth from "./social-auth";
import useSupabaseAuth from "@/hooks/useSupabaseAuth";
import AuthDivider from "./auth-divider";
import AuthInput from "./auth-input";
import { authInputs } from "@/data/authInputs";
import { UserProps } from "@/lib/schemas";
import { FormAlert } from "../ui/form-alert";
import Loader from "../ui/loader";

interface FormValues {
    [key: string]: string;
}

export default function AuthForm({ isSignUp }: { isSignUp?: boolean }) {
    const { status, errors, handleUserSocialAuth, handleUserSignIn, handleUserSignUp } =
        useSupabaseAuth();
    const [formValues, setFormValues] = useState<FormValues>({});

    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

    const handleInputChange = (name: string, value: string) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        // Process form values
        if (isSignUp) {
            await handleUserSignUp(formValues as UserProps);
        } else {
            await handleUserSignIn(formValues as UserProps);
        }
    };

    const handlePasswordVisibility = (type: string, name: string) => {
        if (type === "password" && name === "password") {
            setPasswordVisibility((prev) => !prev);
        }
    };

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    return (
        <div className="space-y-6">
            <SocialAuth status={status} handleSocialAuth={handleUserSocialAuth} />

            <AuthDivider />

            <div className="space-y-7">
                <div className="space-y-4">
                    {status?.state === "error" && (
                        <FormAlert type={status?.state} message={status?.message} timeout={3000} />
                    )}
                    {!isSignUp
                        ? authInputs.map((input) =>
                              input.name !== "confirmPassword" ? (
                                  <AuthInput
                                      key={input.label}
                                      onChange={(e) =>
                                          handleInputChange(input.name, e.currentTarget.value)
                                      }
                                      error={
                                          errors?.find((error) => error.field === input.name)
                                              ?.message
                                      }
                                      disabled={status?.state === "loading"}
                                      label={input.label}
                                      name={input.name}
                                      type={
                                          input.name === "password" ||
                                          input.name === "confirmPassword"
                                              ? passwordVisibility
                                                  ? "text"
                                                  : "password"
                                              : input.type
                                      }
                                      placeholder={input.placeholder}
                                      required={input.required}
                                      onIconClick={() =>
                                          handlePasswordVisibility(input.type, input.name)
                                      }
                                      passwordVisibility={passwordVisibility}
                                  />
                              ) : null
                          )
                        : authInputs.map((input) => (
                              <AuthInput
                                  key={input.label}
                                  onChange={(e) =>
                                      handleInputChange(input.name, e.currentTarget.value)
                                  }
                                  error={
                                      errors?.find((error) => error.field === input.name)?.message
                                  }
                                  disabled={status?.state === "loading"}
                                  label={input.label}
                                  name={input.name}
                                  type={
                                      input.name === "password" || input.name === "confirmPassword"
                                          ? passwordVisibility
                                              ? "text"
                                              : "password"
                                          : input.type
                                  }
                                  placeholder={input.placeholder}
                                  required={input.required}
                                  onIconClick={() =>
                                      handlePasswordVisibility(input.type, input.name)
                                  }
                                  passwordVisibility={passwordVisibility}
                              />
                          ))}
                </div>

                <Button
                    onClick={handleSubmit}
                    className="w-full bg-[#20c997] text-white hover:bg-[#20c997]/90"
                    disabled={status?.state === "loading"}
                >
                    {status?.state === "loading" && status?.method === "email" && <Loader />}
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
            </div>
        </div>
    );
}
