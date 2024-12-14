import AuthForm from "@/components/auth/auth-form";
import AuthLayout from "@/components/layout/auth-layout";
import MainLayout from "@/components/layout/main-layout";

export default function SignInPage() {
    return (
        <MainLayout className="min-h-screen flex flex-col items-center p-4 pt-20 justify-center">
            <AuthLayout
                title="ZenSpace"
                subTitle="Sign In"
                description="Don't have an account?"
                link="/auth/sign-up"
                linkText="Sign Up"
            >
                <AuthForm isSignUp={false} />
            </AuthLayout>
        </MainLayout>
    );
}
