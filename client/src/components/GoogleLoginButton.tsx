
import { FcGoogle } from "react-icons/fc";

const handleGoogleLogin = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
};

export default function GoogleLoginButton() {
  return (
    <div>
      {/* Divider */}
      <div className="text-center mt-3 text-gray-500 text-sm">অথবা</div>

      {/* Google Button */}
      <button
        onClick={handleGoogleLogin}
        className="mt-2 w-full flex items-center justify-center gap-3 
        bg-black border border-gray-300 rounded-md px-4 py-2 text-white transition cursor-pointer"
      >
        <p>
          <FcGoogle className="text-2xl font-medium"></FcGoogle>
        </p>
        <span className="text-lg font-medium">
          Google দিয়ে লগইন করুন
        </span>
      </button>
    </div>
  );
}
