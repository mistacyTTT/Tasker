"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, CheckSquare, Bell, Settings, LogOut,
  Search, Plus, Mail, User, ChevronLeft, ChevronRight,
  CheckCircle2, Circle, MoreVertical, Briefcase, Users,
  Zap, Calendar, Clock, Play, Pause, X, Flag, Tag, UserPlus, AlarmClock,
} from "lucide-react";

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const calendarRows = [
  [28, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, 31, 1, 2, 3],
];

const CATEGORIES = [
  { name: "Work", Icon: Briefcase },
  { name: "Family", Icon: Users },
  { name: "Freelance work Q1", Icon: Zap },
  { name: "Conference planning", Icon: Calendar },
];

const TRACKING = [
  { name: "Create wireframe", time: "1h 25m 30s", active: true },
  { name: "Slack logo design", time: "30m 18s", active: false },
  { name: "Dashboard design", time: "1h 48m 22s", active: false },
  { name: "Create wireframe", time: "17m 1s", active: false },
  { name: "Mood tracker", time: "15h 5m 58s", active: false },
];

const COMMENTS = [
  { title: "Market research", preview: "Find my keynote attached..." },
  { title: "Market research", preview: "I've added the data. Let's check it out toge..." },
];

const PRIORITY_OPTIONS = ["low", "medium", "high"];

const emptyForm = {
  title: "",
  description: "",
  day: "",
  priority: "",
  tags: "",
  assignee: "",
  notify: "",
};

export default function TaskerDashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Route guard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  // Load tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) setTasks(data.data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async () => {
    setFormError("");

    if (!formData.title.trim()) {
      setFormError("Task title is required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.message || "Failed to create task.");
      } else {
        setTasks([data.data, ...tasks]);
        setFormData(emptyForm);
        setShowModal(false);
      }
    } catch (err) {
      setFormError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden font-sans">

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg mx-4 p-6 shadow-xl">

            {/* Modal header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <CheckSquare size={16} className="text-gray-500" />
              </div>
              <input
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Name of task"
                className="flex-1 text-base font-medium text-gray-800 bg-gray-50 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button onClick={() => { setShowModal(false); setFormError(""); setFormData(emptyForm); }}>
                <X size={20} className="text-gray-400 hover:text-gray-700" />
              </button>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-4">

              {/* Day */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-28 text-sm text-gray-500">
                  <Clock size={15} /> Day
                </div>
                <div className="flex gap-2">
                  {["Today", "Tomorrow"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setFormData({ ...formData, day: d })}
                      className={`px-4 py-1.5 rounded-full text-sm border transition-all
                        ${formData.day === d
                          ? "bg-yellow-400 border-yellow-400 text-gray-900 font-medium"
                          : "border-gray-300 text-gray-600 hover:border-yellow-400"}`}
                    >
                      {d}
                    </button>
                  ))}
                  <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-yellow-400">
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Notification */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-28 text-sm text-gray-500">
                  <AlarmClock size={15} /> Notification
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFormData({ ...formData, notify: "In 1 hour" })}
                    className={`px-4 py-1.5 rounded-full text-sm border transition-all
                      ${formData.notify === "In 1 hour"
                        ? "bg-yellow-400 border-yellow-400 text-gray-900 font-medium"
                        : "border-gray-300 text-gray-600 hover:border-yellow-400"}`}
                  >
                    In 1 hour
                  </button>
                  <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-yellow-400">
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Priority */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-28 text-sm text-gray-500">
                  <Flag size={15} /> Priority
                </div>
                <div className="flex gap-2">
                  {PRIORITY_OPTIONS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setFormData({ ...formData, priority: p })}
                      className={`px-4 py-1.5 rounded-full text-sm border capitalize transition-all
                        ${formData.priority === p
                          ? "bg-yellow-400 border-yellow-400 text-gray-900 font-medium"
                          : "border-gray-300 text-gray-600 hover:border-yellow-400"}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-28 text-sm text-gray-500">
                  <Tag size={15} /> Tags
                </div>
                <input
                  name="tags"
                  value={formData.tags}
                  onChange={handleFormChange}
                  placeholder="+ Add tags (comma separated)"
                  className="flex-1 text-sm text-gray-700 bg-gray-50 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Assignee */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-28 text-sm text-gray-500">
                  <UserPlus size={15} /> Assign
                </div>
                <input
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleFormChange}
                  placeholder="+ Add assignee"
                  className="flex-1 text-sm text-gray-700 bg-gray-50 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Description</span>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Add a description..."
                  rows={3}
                  className="w-full text-sm text-gray-700 bg-gray-50 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                />
              </div>

            </div>

            {/* Error */}
            {formError && (
              <p className="mt-3 text-sm text-red-500">{formError}</p>
            )}

            {/* Create button */}
            <div className="flex justify-end mt-5">
              <button
                onClick={handleCreateTask}
                disabled={submitting}
                className="px-6 py-2.5 bg-yellow-400 text-gray-900 font-semibold text-sm rounded-xl hover:bg-yellow-300 transition-colors disabled:opacity-50"
              >
                {submitting ? "Creating..." : "Create task"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-52 flex flex-col py-6 px-4 shrink-0">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center font-black text-black text-sm">T</div>
          <span className="text-white font-bold text-lg">Tasker</span>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {[
            { key: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
            { key: "tasks", label: "My tasks", Icon: CheckSquare },
            { key: "notifications", label: "Notifications", Icon: Bell },
          ].map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setActiveNav(key)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all
                ${activeNav === key ? "bg-white text-gray-900" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
            >
              <Icon size={17} /> {label}
            </button>
          ))}
        </nav>
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all w-full text-left">
            <Settings size={17} /> Settings
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all w-full text-left"
          >
            <LogOut size={17} /> Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input placeholder="Search" className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none shadow-sm" />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-yellow-400 text-gray-900 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-yellow-300 transition-colors"
          >
            <Plus size={16} /> New task
          </button>
          <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-500 shadow-sm">
            <Mail size={18} />
          </button>
          <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-black">
            <User size={18} />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-3 gap-4">

          {/* Calendar */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-800 text-sm">March 2022</span>
              <div className="flex gap-1">
                <button className="text-gray-400 hover:text-gray-700"><ChevronLeft size={16} /></button>
                <button className="text-gray-400 hover:text-gray-700"><ChevronRight size={16} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 text-center text-xs gap-y-1">
              {DAYS.map((d) => (
                <div key={d} className="text-gray-400 font-medium pb-1">{d}</div>
              ))}
              {calendarRows.flat().map((date, i) => {
                const isToday = date === 3 && i < 7;
                const dim = i < 1 || (i >= 29 && date < 10);
                return (
                  <div key={i} className={`py-1 rounded-full cursor-pointer mx-auto w-7 h-7 flex items-center justify-center
                    ${isToday ? "bg-yellow-400 text-gray-900 font-bold" : dim ? "text-gray-300" : "text-gray-700 hover:bg-gray-100"}`}>
                    {date}
                  </div>
                );
              })}
            </div>
          </div>

          {/* My Tasks */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-800 text-sm">
                My tasks ({tasks.length.toString().padStart(2, "0")})
              </span>
              <MoreVertical size={16} className="text-gray-400" />
            </div>
            <div className="flex flex-col">
              {tasks.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No tasks yet. Create one!</p>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <button onClick={() => toggleTask(task.id)}>
                        {task.done
                          ? <CheckCircle2 size={20} className="text-yellow-400 shrink-0" />
                          : <Circle size={20} className="text-gray-300 shrink-0" />}
                      </button>
                      <span className={`text-sm truncate ${task.done ? "line-through text-gray-400" : "text-gray-700"}`}>
                        {task.title}
                      </span>
                    </div>
                    <span className={`text-xs ml-2 shrink-0 font-medium ${task.day === "Today" ? "text-yellow-500" : "text-gray-400"}`}>
                      {task.day || ""}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* New Comments */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="font-semibold text-gray-800 text-sm mb-4">New comments</p>
            <div className="flex flex-col gap-3">
              {COMMENTS.map((c, i) => (
                <div key={i} className="flex items-start justify-between gap-2 pb-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{c.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.preview}</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-400 mt-1 shrink-0" />
                </div>
              ))}
            </div>
            <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mt-3 font-medium">
              <Plus size={14} /> Add
            </button>
          </div>

          {/* My Categories */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-gray-800 text-sm">My categories</p>
              <MoreVertical size={16} className="text-gray-400" />
            </div>
            <div className="flex flex-col">
              {CATEGORIES.map(({ name, Icon }, i) => (
                <div key={i} className="flex items-center gap-2.5 py-2.5 border-b border-gray-50 last:border-0">
                  <Icon size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-700">{name}</span>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mt-3 font-medium">
              <Plus size={14} /> Add more
            </button>
          </div>

          {/* My Tracking */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="font-semibold text-gray-800 text-sm mb-4">My tracking</p>
            <div className="flex flex-col gap-1">
              {TRACKING.map((item, i) => (
                <div key={i} className={`flex items-center justify-between px-2 py-2.5 rounded-lg
                  ${item.active ? "bg-yellow-50 border-l-4 border-yellow-400" : ""}`}>
                  <div className="flex items-center gap-2 min-w-0">
                    <Clock size={15} className="text-gray-400 shrink-0" />
                    <span className="text-sm text-gray-700 truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 ml-2 shrink-0">
                    <span className={`text-sm font-medium ${item.active ? "text-gray-900" : "text-gray-500"}`}>
                      {item.time}
                    </span>
                    <button className={`w-7 h-7 rounded-full flex items-center justify-center
                      ${item.active ? "bg-yellow-400 text-gray-900" : "bg-gray-100 text-gray-500"}`}>
                      {item.active ? <Pause size={12} /> : <Play size={12} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add widget */}
          <div className="bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/10 transition-colors min-h-[200px]">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
              <Plus size={20} />
            </div>
            <span className="text-gray-400 text-sm font-medium">Add widget</span>
          </div>

        </div>
      </main>
    </div>
  );
}