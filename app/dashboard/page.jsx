"use client";

import { useState } from "react";
import {
  LayoutDashboard, CheckSquare, Bell, Settings, LogOut,
  Search, Plus, Mail, User, ChevronLeft, ChevronRight,
  CheckCircle2, Circle, MoreVertical, Briefcase, Users,
  Zap, Calendar, Clock, Play, Pause,
} from "lucide-react";

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const calendarRows = [
  [28, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, 31, 1, 2, 3],
];

const TASKS = [
  { id: 1, title: "Finish monthly reporting", due: "Today", done: true },
  { id: 2, title: "Contract signing", due: "Today", done: false },
  { id: 3, title: "Market overview keyno...", due: "Tomorrow", done: false },
  { id: 4, title: "Project research", due: "Tomorrow", done: false },
  { id: 5, title: "Prepare invoices", due: "This week", done: false },
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

export default function TaskerDashboard() {
  const [tasks, setTasks] = useState(TASKS);
  const [activeNav, setActiveNav] = useState("dashboard");

  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  return (
    <div className="flex h-screen bg-black overflow-hidden font-sans">

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
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all w-full text-left">
            <LogOut size={17} /> Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6">

        {/* Top bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input placeholder="Search" className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none shadow-sm" />
          </div>
          <button className="flex items-center gap-2 bg-yellow-400 text-gray-900 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-yellow-300 transition-colors">
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
              <span className="font-semibold text-gray-800 text-sm">My tasks (05)</span>
              <MoreVertical size={16} className="text-gray-400" />
            </div>
            <div className="flex flex-col">
              {tasks.map((task) => (
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
                  <span className={`text-xs ml-2 shrink-0 font-medium ${task.due === "Today" ? "text-yellow-500" : "text-gray-400"}`}>
                    {task.due}
                  </span>
                </div>
              ))}
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
