export default function Settings() {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Settings</h2>
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800">Notifications</h3>
                    <div className="mt-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-slate-600">Email notifications for new tests</p>
                            <label className="switch">
                                <input type="checkbox" defaultChecked/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-slate-800">Account</h3>
                     <div className="mt-4">
                         <button className="text-red-600 font-medium hover:underline">Delete Account</button>
                     </div>
                </div>
            </div>
            {/* Basic CSS for the toggle switch */}
            <style jsx>{`
                .switch { position: relative; display: inline-block; width: 60px; height: 34px; }
                .switch input { opacity: 0; width: 0; height: 0; }
                .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; }
                .slider.round { border-radius: 34px; }
                .slider:before { position: absolute; content: ""; height: 26px; width: 26px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }
                input:checked + .slider { background-color: #4f46e5; }
                input:checked + .slider:before { transform: translateX(26px); }
            `}</style>
        </div>
    );
}