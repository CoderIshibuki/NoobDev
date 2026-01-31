/* assets/js/data/typing-data.js */

import { fixedTexts, fixedTextsVi } from './quotes.js';
import { lessonData, lessonDataVi } from './lessons.js';
import { codeData, codeSnippets } from './code-data.js';

// Export lại để các file khác (như typing.js) vẫn dùng bình thường
export { fixedTexts, fixedTextsVi, lessonData, lessonDataVi, codeData };

export const testData = [
    {
        title: "Speed Tests",
        lessons: [
            { id: 401, name: "30 Seconds", keys: "Sprint", type: "timetest", duration: 30, icon: "fas fa-stopwatch" },
            { id: 402, name: "60 Seconds", keys: "Standard", type: "timetest", duration: 60, icon: "fas fa-clock" },
            { id: 403, name: "2 Minutes", keys: "Endurance", type: "timetest", duration: 120, icon: "fas fa-hourglass-half" }
        ]
    }
];

// 2. HÀM HELPER LẤY TEXT
export function getRandomText(type, subtype, lang = 'en') {
    if (type === 'timetest') {
        const texts = (lang === 'vi') ? fixedTextsVi : fixedTexts;
        return texts[Math.floor(Math.random() * texts.length)];
    }
    if (type === 'code') {
        const arr = codeSnippets[subtype] || codeSnippets['js'];
        return arr[Math.floor(Math.random() * arr.length)];
    }
    return "Welcome to NoobDev Typing Practice. Improve your skills daily.";
}