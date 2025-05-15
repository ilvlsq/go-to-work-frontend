import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Відновлення паролю
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Введіть вашу email адресу, і ми надішлемо вам інструкції для відновлення паролю
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
