import UserForm from "@/components/UserForm";

const Signup = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <UserForm />
      </div>
    </div>
  );
};

export default Signup;
