import AuthForm from "@/components/auth/auth-form";
import AuthLayout from "@/components/layout/auth-layout";
import MainLayout from "@/components/layout/main-layout";

export default function SignUpPage() {
    return (
        <MainLayout className="min-h-screen flex flex-col items-center p-4 pt-20 justify-center">
            <AuthLayout
                title="ZenSpace"
                subTitle="Sign Up"
                description="Already have an account?"
                link="/auth/sign-in"
                linkText="Sign In"
            >
                <AuthForm isSignUp />
            </AuthLayout>
        </MainLayout>
    );
}
