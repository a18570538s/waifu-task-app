'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tasks = [
  { id: 1, title: "速寫100張" },
  { id: 2, title: "分鏡草圖練習" },
  { id: 3, title: "角色表情練習" },
];

const gachaPool = [
  { id: 1, name: "日常服 Sil", rarity: "R", image: "/gacha/r_sil.png" },
  { id: 2, name: "戰鬥姿 Sil", rarity: "SR", image: "/gacha/sr_sil.png" },
  { id: 3, name: "閃卡 Sil·銀閃降臨", rarity: "UR", image: "/gacha/ur_sil.png" },
];

export default function Page() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [waifuMood, setWaifuMood] = useState("neutral");
  const [gachaResult, setGachaResult] = useState<null | typeof gachaPool[0]>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const toggleTask = (id: number) => {
    setCompleted((prev) => {
      const updated = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      const progress = (updated.length / tasks.length) * 100;
      setWaifuMood(progress === 100 ? "happy" : progress >= 50 ? "smile" : "neutral");
      return updated;
    });
  };

  const drawGacha = () => {
    setShowAnimation(true);
    setTimeout(() => {
      const roll = Math.floor(Math.random() * gachaPool.length);
      setGachaResult(gachaPool[roll]);
      setShowAnimation(false);
    }, 2000);
  };

  return (
    <main className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">🎀 我的任務女友 🎀</h1>
      <div className="flex flex-col items-center space-y-2 p-4 border rounded-xl bg-white shadow">
        <img
          src={
            waifuMood === "happy"
              ? "/waifu_happy.png"
              : waifuMood === "smile"
              ? "/waifu_smile.png"
              : "/waifu_neutral.png"
          }
          alt="waifu"
          className="w-32 h-32 object-contain"
        />
        <p className="text-lg">
          狀態：{waifuMood === "happy" ? "超開心♡" : waifuMood === "smile" ? "不錯喔~" : "快點加油嘛…！"}
        </p>
        <div className="w-full h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-pink-500 rounded transition-all"
            style={{ width: `${(completed.length / tasks.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {tasks.map((task) => (
        <div key={task.id} className="flex justify-between items-center p-4 border rounded-xl bg-white shadow">
          <span>{task.title}</span>
          <button
            onClick={() => toggleTask(task.id)}
            className={`px-3 py-1 rounded ${
              completed.includes(task.id) ? "bg-gray-300" : "bg-pink-400 text-white"
            }`}
          >
            {completed.includes(task.id) ? "已完成" : "完成"}
          </button>
        </div>
      ))}

      {completed.length === tasks.length && (
        <div className="text-center space-y-4">
          <button
            onClick={drawGacha}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            🎁 抽卡！
          </button>
          <AnimatePresence>
            {showAnimation && (
              <motion.div
                className="text-3xl font-bold animate-pulse"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
              >
                正在抽卡中...
              </motion.div>
            )}
          </AnimatePresence>
          {gachaResult && !showAnimation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <p>
                你抽到了：<strong>{gachaResult.name}</strong> ({gachaResult.rarity})
              </p>
              <img
                src={gachaResult.image}
                alt={gachaResult.name}
                className="w-40 h-40 object-contain mx-auto"
              />
            </motion.div>
          )}
        </div>
      )}
    </main>
  );
}