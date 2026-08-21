import LoginHero from "../components/auth/LoginHero";
import LoginForm from "../components/auth/LoginForm";

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-alabaster-grey-50 lg:grid lg:grid-cols-2">

            {/* Left Section */}
            <LoginHero />

            {/* Right Section */}
            <div className="flex items-center justify-center p-6 lg:p-12">

                <LoginForm />

            </div>

        </div>
    );
};

export default AuthLayout;