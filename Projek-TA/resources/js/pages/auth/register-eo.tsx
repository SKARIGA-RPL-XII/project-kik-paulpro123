import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';

export default function RegisterEO() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-blue-50">
            <Head title="Register Event Organizer" />

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
                                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Register Event Organizer
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Create your event organizer account
                            </p>
                        </div>

                        {/* Register Form */}
                        <Form
                            method="post"
                            action="/register/eo"
                            resetOnSuccess={['password', 'password_confirmation']}
                            className="space-y-5"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-4">
                                        {/* Organizer Name Field */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="organizer_name"
                                                className="text-sm font-semibold text-gray-700"
                                            >
                                                Organizer / Company Name
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
                                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                        />
                                                    </svg>
                                                </div>
                                                <Input
                                                    id="organizer_name"
                                                    type="text"
                                                    name="organizer_name"
                                                    required
                                                    autoFocus
                                                    placeholder="Enter company name"
                                                    className="h-12 border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                                />
                                            </div>
                                            <InputError message={errors.organizer_name} />
                                        </div>

                                        {/* PIC Name Field */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="pic_name"
                                                className="text-sm font-semibold text-gray-700"
                                            >
                                                PIC Name
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
                                                    id="pic_name"
                                                    type="text"
                                                    name="pic_name"
                                                    required
                                                    placeholder="Enter PIC name"
                                                    className="h-12 border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                                />
                                            </div>
                                            <InputError message={errors.pic_name} />
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
                                                    name="email"
                                                    required
                                                    placeholder="email@example.com"
                                                    className="h-12 border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                                />
                                            </div>
                                            <InputError message={errors.email} />
                                        </div>

                                        {/* Phone Field */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="phone"
                                                className="text-sm font-semibold text-gray-700"
                                            >
                                                Phone
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
                                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                        />
                                                    </svg>
                                                </div>
                                                <Input
                                                    id="phone"
                                                    type="text"
                                                    name="phone"
                                                    required
                                                    placeholder="Enter phone number"
                                                    className="h-12 border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                                />
                                            </div>
                                            <InputError message={errors.phone} />
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
                                                    name="password"
                                                    required
                                                    placeholder="Create a strong password"
                                                    className="h-12 border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                                />
                                            </div>
                                            <InputError message={errors.password} />
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
                                                    name="password_confirmation"
                                                    required
                                                    placeholder="Confirm your password"
                                                    className="h-12 border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.password_confirmation}
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
                                            disabled={processing}
                                        >
                                            {processing && (
                                                <Spinner className="mr-2" />
                                            )}
                                            {processing
                                                ? 'Creating account...'
                                                : 'Register'}
                                        </Button>
                                    </div>

                                    <div className="mt-6 text-center">
                                        <p className="text-sm text-gray-600">
                                            Sudah punya akun?{' '}
                                            <TextLink
                                                href={login()}
                                                className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
                                            >
                                                Login
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