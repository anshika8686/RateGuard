
import { useEffect, useState } from "react";
import {
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey
} from "../services/apiKeyService";

function ApiKeys() {
    const [apiKeys, setApiKeys] = useState([]);
    const [name, setName] = useState("");
    const [rateLimit, setRateLimit] = useState(5);
    const [createdKey, setCreatedKey] = useState("");

    const loadKeys = async () => {
        const data = await fetchApiKeys();
        setApiKeys(data.apiKeys);
    };

    useEffect(() => {
        loadKeys();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();

        const data = await createApiKey({
            name,
            rateLimit: Number(rateLimit)
        });

        setCreatedKey(data.apiKey);
        setName("");
        setRateLimit(5);
        loadKeys();
    };

    const handleToggle = async (key) => {
        await updateApiKey(key._id, {
            active: !key.active
        });

        loadKeys();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this API key?")) return;

        await deleteApiKey(id);
        loadKeys();
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">API Keys</h1>
                <p className="mt-2 text-sm text-slate-400">
                    Create and manage your API keys.
                </p>
            </div>

            {/* Create API Key */}
            <form onSubmit={handleCreate} className="flex flex-wrap gap-3">
                <input
                    type="text"
                    placeholder="API Key Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="rounded-lg border border-slate-700 bg-slate-900 p-3"
                />

                <input
                    type="number"
                    min="1"
                    value={rateLimit}
                    onChange={(e) => setRateLimit(e.target.value)}
                    required
                    className="w-28 rounded-lg border border-slate-700 bg-slate-900 p-3"
                />

                <button className="rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-500 cursor-pointer">
                    Create Key
                </button>
            </form>

            {/* Newly Created Key */}
            {createdKey && (
                <div className="rounded-lg border border-green-500/30 bg-slate-900 p-4">
                    <p className="mb-2 text-sm text-green-400">
                        API Key created! Copy it now; it won't be shown again.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <code className="break-all">{createdKey}</code>

                        <button
                            onClick={() =>
                                navigator.clipboard.writeText(createdKey)
                            }
                            className="text-blue-400 cursor-pointer"
                        >
                            Copy
                        </button>
                    </div>
                </div>
            )}

            {/* API Keys List */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-900 text-slate-400">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Key Prefix</th>
                            <th className="p-4">Rate Limit</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {apiKeys.map((key) => (
                            <tr key={key._id} className="border-t border-slate-800">
                                <td className="p-4">{key.name}</td>
                                <td className="p-4">{key.keyPrefix}••••</td>
                                <td className="p-4">{key.rateLimit}</td>
                                <td className="p-4">
                                    {key.active ? "Active" : "Inactive"}
                                </td>
                                <td className="space-x-3 p-4">
                                    <button
                                        onClick={() => handleToggle(key)}
                                        className="text-blue-400 cursor-pointer"
                                    >
                                        {key.active ? "Deactivate" : "Activate"}
                                    </button>

                                    <button
                                        onClick={() => handleDelete(key._id)}
                                        className="text-red-400 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {apiKeys.length === 0 && (
                    <p className="p-6 text-center text-slate-400">
                        No API keys created yet.
                    </p>
                )}
            </div>
        </div>
    );
}

export default ApiKeys;
