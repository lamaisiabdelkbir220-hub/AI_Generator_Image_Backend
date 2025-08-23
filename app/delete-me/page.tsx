"use client";

import { useState } from "react";
import { Button } from "@/components/utils/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/utils/card";
import { Alert, AlertDescription } from "@/components/utils/alert";
import { Trash2, LogIn, CheckCircle, AlertTriangle, Shield, User, ArrowBigLeft } from "lucide-react";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

type AuthState = "unauthenticated" | "authenticated" | "deleting" | "deleted" | "not-found";

interface IAccount {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface IGoogleOAuthData {
    aud: string;
    azp: string;
    email: string;
    email_verified: boolean;
    exp: number;
    family_name: string;
    given_name: string;
    iat: number;
    iss: string;
    jti: string;
    name: string;
    nbf: number;
    picture: string;
    sub: string;
}

export default function DeleteMePage() {
    const [authState, setAuthState] = useState<AuthState>("unauthenticated");
    const [user, setUser] = useState<IAccount | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteAccount = async () => {
        if (!user) return;

        setAuthState("deleting");

        try {
            const response = await fetch("/api/delete-me", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: user.id }),
            });

            if (response.ok) {
                setAuthState("deleted");
            } else {
                setAuthState("not-found");
            }
        } catch (error) {
            console.error("Deletion error:", error);
            setAuthState("not-found");
        }
    };

    const renderContent = () => {
        switch (authState) {
            case "unauthenticated":
                return (
                    <div className="space-y-8 animate-in fade-in-50 duration-700">
                        <div className="text-center space-y-4">
                            <div className="relative">
                                {/* <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div> */}
                                <div className="relative bg-gradient-to-br from-purple-500 to-purple-700 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                                    <Shield className="h-10 w-10 text-white" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                    Account Deletion
                                </h1>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto">
                                    To proceed with account deletion, please authenticate your identity for security
                                    purposes
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                    if (credentialResponse.credential) {
                                        console.log(jwtDecode(credentialResponse.credential))

                                        const user = jwtDecode(credentialResponse.credential) as IGoogleOAuthData;
                                        console.log("user", user);

                                        const account: IAccount = {
                                            id: user.sub,
                                            name: user.name,
                                            email: user.email,
                                            avatar: user.picture,
                                        }

                                        setUser(account);
                                        setAuthState("authenticated");
                                    }
                                }}
                                onError={() => {
                                    setAuthState("unauthenticated");
                                }}
                            />
                        </div>

                        <Alert className="border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-purple-600/10 backdrop-blur-sm">
                            <AlertTriangle className="h-4 w-4 text-purple-400" />
                            <AlertDescription className="text-purple-200">
                                <strong>Important:</strong> This action is irreversible. All your data will be
                                permanently deleted from our systems.
                            </AlertDescription>
                        </Alert>
                    </div>
                );

            case "authenticated":
                return (
                    <div className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
                        <div className="text-center space-y-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                                    <User className="h-10 w-10 text-white" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                    Confirm Deletion
                                </h1>
                                <p className="text-gray-400 text-lg">
                                    Authenticated as{" "}
                                    <span className="text-purple-300 font-semibold">{user?.email}</span>
                                </p>
                            </div>
                        </div>

                        {user && (
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                                <div className="relative flex items-center space-x-4 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                                        <User className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-semibold text-lg">{user.name}</p>
                                        <p className="text-gray-400">{user.email}</p>
                                    </div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        )}

                        {!showConfirmation ? (
                            <Button
                                onClick={() => setShowConfirmation(true)}
                                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-red-500/40 hover:scale-[1.02]"
                                size="lg"
                            >
                                <Trash2 className="mr-3 h-5 w-5" />
                                Delete My Account
                            </Button>
                        ) : (
                            <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                                <Alert className="border-red-500/30 bg-gradient-to-r from-red-500/10 to-red-600/10 backdrop-blur-sm">
                                    <AlertTriangle className="h-4 w-4 text-red-400" />
                                    <AlertDescription className="text-red-200">
                                        <strong>Final Warning:</strong> This action cannot be undone. Your account and
                                        all associated data will be permanently deleted.
                                    </AlertDescription>
                                </Alert>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        onClick={handleDeleteAccount}
                                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-red-500/40"
                                    >
                                        Yes, Delete Forever
                                    </Button>
                                    <Button
                                        onClick={() => setShowConfirmation(false)}
                                        variant="outline"
                                        className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-purple-500/50 transition-all duration-300"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case "deleting":
                return (
                    <div className="space-y-8 text-center animate-in fade-in-50 duration-700">
                        <div className="space-y-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                                <div className="relative mx-auto h-20 w-20 animate-spin rounded-full border-4 border-gray-700 border-t-purple-500 shadow-lg shadow-purple-500/25"></div>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                    Processing Deletion
                                </h1>
                                <p className="text-gray-400 text-lg">
                                    Please wait while we securely remove your account...
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-center space-x-2">
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                                        style={{ animationDelay: `${i * 0.2}s` }}
                                    ></div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500">This may take a few moments</p>
                        </div>
                    </div>
                );

            case "deleted":
                return (
                    <div className="space-y-8 text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
                                <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center animate-in zoom-in-50 duration-500 delay-200">
                                    <CheckCircle className="h-10 w-10 text-white" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                                    Account Deleted
                                </h1>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto">
                                    Your account has been successfully deleted. All data has been permanently removed
                                    from our systems.
                                </p>
                            </div>
                        </div>

                        <Alert className="border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <AlertDescription className="text-green-200">
                                <strong>Deletion Complete:</strong> Thank you for using our service. We're sorry to see
                                you go.
                            </AlertDescription>
                        </Alert>
                    </div>
                );

            case "not-found":
                return (
                    <div className="space-y-8 text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
                                <div className="relative bg-gradient-to-br from-yellow-500 to-orange-600 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                                    <AlertTriangle className="h-10 w-10 text-white" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                                    Account Not Found
                                </h1>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto">
                                    We couldn't locate an account associated with your credentials in our system.
                                </p>
                            </div>
                        </div>

                        <Alert className="border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm">
                            <AlertTriangle className="h-4 w-4 text-yellow-400" />
                            <AlertDescription className="text-yellow-200">
                                <strong>Account Missing:</strong> The account may have already been deleted or never
                                existed in our system.
                            </AlertDescription>
                        </Alert>

                        <Button
                            onClick={() => {
                                setAuthState("unauthenticated");
                                setUser(null);
                                setShowConfirmation(false);
                            }}
                            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]"
                        >
                            Try Again
                        </Button>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

                <Card className="w-full max-w-lg bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl shadow-purple-500/10 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-lg" />
                    <CardHeader className="text-center relative z-10 pb-2">
                        <CardTitle className="text-white text-xl">Account Management</CardTitle>
                        <CardDescription className="text-gray-400">
                            Secure account operations and data management
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10 pt-4">{renderContent()}</CardContent>
                </Card>
            </div>
        </GoogleOAuthProvider>
    );
}
