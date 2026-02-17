import { useState, useEffect } from "react";

const EditScientistModal = ({ scientist = {}, onClose, onSave }) => {
    const [form, setForm] = useState({
        name: "",
        field: "",
        bio: "",
        tagline: "",
        description: "",
        era: "",
        nationality: "",
        born: "",
        died: "",
        image: "",
        story: [],
        impact: [],
        quotes: [],
        funFacts: [],
    });

    // Update form whenever scientist prop changes
    useEffect(() => {
        if (scientist) {
            setForm({
                name: scientist.name || "",
                field: scientist.field || "",
                bio: scientist.bio || "",
                tagline: scientist.tagline || "",
                description: scientist.description || "",
                era: scientist.era || "",
                nationality: scientist.nationality || "",
                born: scientist.born || "",
                died: scientist.died || "",
                image: scientist.image || "",
                story: scientist.story || [],
                impact: scientist.impact || [],
                quotes: scientist.quotes || [],
                funFacts: scientist.funFacts || [],
            });
        }
    }, [scientist]);

    const handleArrayChange = (key, value) => {
        setForm({ ...form, [key]: value.split(",").map((v) => v.trim()) });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-900 p-6 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-cyan-400">Edit Scientist</h2>
                    <button
                        onClick={onClose}
                        className="text-white/50 hover:text-white text-2xl font-bold"
                    >
                        &times;
                    </button>
                </div>

                <div className="space-y-4">
                    {[
                        "name",
                        "field",
                        "bio",
                        "tagline",
                        "description",
                        "era",
                        "nationality",
                        "born",
                        "died",
                        "image",
                    ].map((key) => (
                        <div key={key}>
                            <label className="block text-white/80 mb-1">{key}</label>
                            <input
                                value={form[key]}
                                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                className="w-full p-2 rounded-md border border-white/20 bg-slate-800 text-white"
                            />
                        </div>
                    ))}

                    {["story", "impact", "quotes", "funFacts"].map((key) => (
                        <div key={key}>
                            <label className="block text-white/80 mb-1">
                                {key} (comma-separated)
                            </label>
                            <input
                                value={form[key].join(", ")}
                                onChange={(e) => handleArrayChange(key, e.target.value)}
                                className="w-full p-2 rounded-md border border-white/20 bg-slate-800 text-white"
                            />
                        </div>
                    ))}

                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                onClose();             // Close the modal immediately
                                onSave({ ...form, _id: scientist._id });  // Send update request
                            }}
                            className="px-4 py-2 bg-cyan-500 rounded-md hover:bg-cyan-400 text-white"
                        >
                            Save
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditScientistModal;
