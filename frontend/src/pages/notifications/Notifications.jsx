function Notifications() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold text-indigo-600">
        Notifications
      </h1>

      <div className="mt-8 space-y-4">

        <div className="bg-white rounded-xl shadow p-5">
          🎉 New job matched: Backend Developer at Google
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          📄 Resume successfully uploaded.
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          💼 Microsoft posted a new Python Developer role.
        </div>

      </div>

    </div>
  );
}

export default Notifications;