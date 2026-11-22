import { Link } from "react-router-dom";

function AuthCard({ title, subtitle, children, footer }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-4 py-10">

            {/* Brand */}
            <Link to="/" className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
                    R
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">
                    RateGuard
                </span>
            </Link>

            {/* Auth Card */}
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/20">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        {title}
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        {subtitle}
                    </p>
                </div>

                {/* Form Content */}
                <div>
                    {children}
                </div>

                {/* Footer */}
                <div className="mt-7 border-t border-slate-800 pt-6 text-center text-sm text-slate-400">
                    {footer}
                </div>
            </div>

            {/* Copyright */}
            <p className="mt-8 text-xs text-slate-500">
                © 2026 RateGuard. All rights reserved.
            </p>
        </div>
    );
}

export default AuthCard;