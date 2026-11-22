function Button({
    children,
    type = "button",
    variant = "primary",
    loading = false,
    disabled = false,
    onClick,
    className = ""
}) {
    const baseStyles =
        "w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-500",

        secondary:
            "bg-slate-800 text-slate-200 hover:bg-slate-700 focus:ring-slate-500",

        danger:
            "bg-red-600 text-white hover:bg-red-500 focus:ring-red-500"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
            )}

            {loading ? "Please wait..." : children}
        </button>
    );
}

export default Button;