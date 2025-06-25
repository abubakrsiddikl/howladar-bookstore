import Image from "next/image";

const handleGoogleLogin = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
};

export default function GoogleLoginButton() {
  return (
    <div>
      {/* Divider */}
      <div className="text-center mt-6 text-gray-500 text-sm">অথবা</div>

      {/* Google Button */}
      <button
        onClick={handleGoogleLogin}
        className="mt-4 w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition"
      >
        <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
        <span className="text-sm font-medium text-gray-700">
          Google দিয়ে লগইন করুন
        </span>
      </button>
    </div>
  );
}
