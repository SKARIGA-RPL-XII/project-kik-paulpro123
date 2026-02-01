import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-blue-50">
            <Head title="Register" />

            <div className="flex min-h-screen items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Card Container */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
                        {/* Logo/Brand Section */}
                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600">
                                <svg
                                    className="h-8 w-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Create Account
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Join Eventime and discover amazing events
                            </p>
                        </div>

                        {/* Register Form */}
                        <Form
                            {...store.form()}
                            resetOnSuccess={[
                                'password',
                                'password_confirmation',
                            ]}
                            disableWhileProcessing
                            className="space-y-5"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-4">
                                        {/* Name Field */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="name"
                                                className="text-sm font-semibold text-gray-700"
                                            >
                                                Full Name
                                            </Label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <svg
                                                        className="h-5 w-5 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                        />
                                                    </svg>
                                                </div>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="name"
                                                    name="name"
                                                    placeholder="John Doe"
                                                    className="h-12 border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                                />
                                            </div>
                                            <InputError message={errors.name} />
                                        </div>

                                        {/* Email Field */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="email"
                                                className="text-sm font-semibold text-gray-700"
                                            >
                                                Email Address
                                            </Label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <svg
                                                        className="h-5 w-5 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                                        />
                                                    </svg>
                                                </div>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="email"
                                                    name="email"
                                                    placeholder="email@example.com"
                                                    className="h-12 border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        {/* Password Field */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="password"
                                                className="text-sm font-semibold text-gray-700"
                                            >
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <svg
                                                        className="h-5 w-5 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                        />
                                                    </svg>
                                                </div>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    required
                                                    tabIndex={3}
                                                    autoComplete="new-password"
                                                    name="password"
                                                    placeholder="Create a strong password"
                                                    className="h-12 border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>

                                        {/* Confirm Password Field */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="password_confirmation"
                                                className="text-sm font-semibold text-gray-700"
                                            >
                                                Confirm Password
                                            </Label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <svg
                                                        className="h-5 w-5 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </div>
                                                <Input
                                                    id="password_confirmation"
                                                    type="password"
                                                    required
                                                    tabIndex={4}
                                                    autoComplete="new-password"
                                                    name="password_confirmation"
                                                    placeholder="Confirm your password"
                                                    className="h-12 border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                                />
                                            </div>
                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                            />
                                        </div>

                                        {/* Terms & Conditions */}
                                        <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                                            <p className="text-xs leading-relaxed text-gray-600">
                                                By creating an account, you
                                                agree to our{' '}
                                                <a
                                                    href="#"
                                                    className="font-medium text-blue-600 hover:underline"
                                                >
                                                    Terms of Service
                                                </a>{' '}
                                                and{' '}
                                                <a
                                                    href="#"
                                                    className="font-medium text-blue-600 hover:underline"
                                                >
                                                    Privacy Policy
                                                </a>
                                            </p>
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="h-12 w-full bg-gradient-to-r from-purple-600 to-blue-600 font-semibold text-white shadow-lg transition-all duration-200 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl"
                                            tabIndex={5}
                                            data-test="register-user-button"
                                        >
                                            {processing && (
                                                <Spinner className="mr-2" />
                                            )}
                                            {processing
                                                ? 'Creating account...'
                                                : 'Create account'}
                                        </Button>
                                    </div>

                                    <div className="mt-6 text-center">
                                        <p className="text-sm text-gray-600">
                                            Already have an account?{' '}
                                            <TextLink
                                                href={login()}
                                                className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
                                            >
                                                Masuk di sini
                                            </TextLink>
                                        </p>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            © 2025 Eventime. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}