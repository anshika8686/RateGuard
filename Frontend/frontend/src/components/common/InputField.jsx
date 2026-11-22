function InputField({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    name
}) {
    return (
        <div className="w-full">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-slate-300 mb-2"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full rounded-lg border bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition
                    focus:ring-2 focus:ring-blue-500/30
                    ${
                        error
                            ? "border-red-500 focus:border-red-500"
                            : "border-slate-700 focus:border-blue-500"
                    }`}
            />

            {error && (
                <p className="mt-1.5 text-xs text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}

export default InputField;