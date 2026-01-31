import { 
    txtJFSpace, txtURK, txtDEI, txtCGN, txtTSL, txtOBA, txtVHM, txtPeriodComma, txtWXSemi, txtQYPZ,
    txtEasyWords, txtCommonWords, txtCapitalization, txtPunctuation,
    txtNumbers, txtSymbols, txtMath,
    txtStory1, txtStory2, txtStory3,
    txtNgrams, txtTrickyWords, txtPangrams, txtStory4, txtStory5,
    txtEasyWordsVi, txtCommonWordsVi, txtStory1Vi, txtStory2Vi, txtStory3Vi, txtStory4Vi, txtStory5Vi,
    txtProgrammerMode, txtHardSymbols
} from './lesson-texts.js';

export const lessonData = [
    {
        title: "Beginner: Keys",
        lessons: [
            { id: 1, name: "J, F, and Space", keys: "j, f, space", text: txtJFSpace, icon: "fas fa-keyboard" },
            { id: 2, name: "U, R, and K", keys: "u, r, k", text: txtURK, icon: "fas fa-arrow-up" },
            { id: 3, name: "D, E, and I", keys: "d, e, i", text: txtDEI, icon: "fas fa-font" },
            { id: 4, name: "C, G, and N", keys: "c, g, n", text: txtCGN, icon: "fas fa-arrow-down" },
            { id: 5, name: "T, S, and L", keys: "t, s, l", text: txtTSL, icon: "fas fa-align-left" },
            { id: 6, name: "O, B, and A", keys: "o, b, a", text: txtOBA, icon: "fas fa-bold" },
            { id: 7, name: "V, H, and M", keys: "v, h, m", text: txtVHM, icon: "fas fa-text-width" },
            { id: 8, name: "Period and Comma", keys: "., ,", text: txtPeriodComma, icon: "fas fa-ellipsis-h" },
            { id: 9, name: "W, X, and ;", keys: "w, x, ;", text: txtWXSemi, icon: "fas fa-times" },
            { id: 10, name: "Q, Y, P, and Z", keys: "q, y, p, z", text: txtQYPZ, icon: "fas fa-question" }
        ]
    },
    {
        title: "Intermediate: Skills",
        lessons: [
            { id: 101, name: "Easy Words", keys: "Short words", text: txtEasyWords, icon: "fas fa-feather" },
            { id: 102, name: "Common Words", keys: "Top 100 words", text: txtCommonWords, icon: "fas fa-layer-group" },
            { id: 103, name: "Capitalization", keys: "Shift Key", text: txtCapitalization, icon: "fas fa-arrow-circle-up" },
            { id: 104, name: "Punctuation", keys: "., ; ? !", text: txtPunctuation, icon: "fas fa-quote-right" },
            { id: 105, name: "Common N-grams", keys: "th, he, in...", text: txtNgrams, icon: "fas fa-link" },
            { id: 106, name: "Tricky Words", keys: "Complex words", text: txtTrickyWords, icon: "fas fa-skull" }
        ]
    },
    {
        title: "Advanced: Tech",
        lessons: [
            { id: 201, name: "Number Row", keys: "1-0", text: txtNumbers, icon: "fas fa-hashtag" },
            { id: 202, name: "Symbols", keys: "!@#$...", text: txtSymbols, icon: "fas fa-code" },
            { id: 203, name: "Math Equations", keys: "Math", text: txtMath, icon: "fas fa-calculator" },
            { id: 204, name: "Pangrams", keys: "A-Z sentences", text: txtPangrams, icon: "fas fa-font" }
        ]
    },
    {
        title: "Expert: Programmer",
        lessons: [
            { id: 501, name: "Code Syntax", keys: "Mixed Code", text: txtProgrammerMode, icon: "fas fa-laptop-code" },
            { id: 502, name: "Symbol Chaos", keys: "All Symbols", text: txtHardSymbols, icon: "fas fa-skull-crossbones" }
        ]
    },
    {
        title: "Practice: Stories",
        lessons: [
            { id: 301, name: "The Golden Valley", keys: "Paragraph", text: txtStory1, icon: "fas fa-book-open" },
            { id: 302, name: "The Programmer", keys: "Paragraph", text: txtStory2, icon: "fas fa-laptop-code" },
            { id: 303, name: "The Dreamer", keys: "Paragraph", text: txtStory3, icon: "fas fa-moon" },
            { id: 304, name: "The Hidden Garden", keys: "Paragraph", text: txtStory4, icon: "fas fa-leaf" },
            { id: 305, name: "AI Revolution", keys: "Paragraph", text: txtStory5, icon: "fas fa-robot" }
        ]
    }
];

export const lessonDataVi = [
    {
        title: "Cơ bản: Phím",
        lessons: [
            { id: 1, name: "J, F, và Space", keys: "j, f, space", text: txtJFSpace, icon: "fas fa-keyboard" },
            { id: 2, name: "U, R, và K", keys: "u, r, k", text: txtURK, icon: "fas fa-arrow-up" },
            { id: 3, name: "D, E, và I", keys: "d, e, i", text: txtDEI, icon: "fas fa-font" },
            { id: 4, name: "C, G, và N", keys: "c, g, n", text: txtCGN, icon: "fas fa-arrow-down" },
            { id: 5, name: "T, S, và L", keys: "t, s, l", text: txtTSL, icon: "fas fa-align-left" },
            { id: 6, name: "O, B, và A", keys: "o, b, a", text: txtOBA, icon: "fas fa-bold" },
            { id: 7, name: "V, H, và M", keys: "v, h, m", text: txtVHM, icon: "fas fa-text-width" },
            { id: 8, name: "Dấu chấm, Phẩy", keys: "., ,", text: txtPeriodComma, icon: "fas fa-ellipsis-h" },
            { id: 9, name: "W, X, và ;", keys: "w, x, ;", text: txtWXSemi, icon: "fas fa-times" },
            { id: 10, name: "Q, Y, P, và Z", keys: "q, y, p, z", text: txtQYPZ, icon: "fas fa-question" }
        ]
    },
    {
        title: "Trung bình: Kỹ năng",
        lessons: [
            { id: 101, name: "Từ đơn giản", keys: "Từ ngắn", text: txtEasyWordsVi, icon: "fas fa-feather" },
            { id: 102, name: "Từ phổ biến", keys: "Top 100 từ", text: txtCommonWordsVi, icon: "fas fa-layer-group" },
            { id: 103, name: "Viết hoa", keys: "Phím Shift", text: txtCapitalization, icon: "fas fa-arrow-circle-up" },
            { id: 104, name: "Dấu câu", keys: "., ; ? !", text: txtPunctuation, icon: "fas fa-quote-right" }
        ]
    },
    {
        title: "Nâng cao: Công nghệ",
        lessons: [
            { id: 201, name: "Hàng phím số", keys: "1-0", text: txtNumbers, icon: "fas fa-hashtag" },
            { id: 202, name: "Ký tự đặc biệt", keys: "!@#$...", text: txtSymbols, icon: "fas fa-code" },
            { id: 203, name: "Phép toán", keys: "Toán học", text: txtMath, icon: "fas fa-calculator" }
        ]
    },
    {
        title: "Luyện tập: Truyện",
        lessons: [
            { id: 301, name: "Thung lũng vàng", keys: "Đoạn văn", text: txtStory1Vi, icon: "fas fa-book-open" },
            { id: 302, name: "Lập trình viên", keys: "Đoạn văn", text: txtStory2Vi, icon: "fas fa-laptop-code" },
            { id: 303, name: "Kẻ mộng mơ", keys: "Đoạn văn", text: txtStory3Vi, icon: "fas fa-moon" },
            { id: 304, name: "Khu vườn bí mật", keys: "Đoạn văn", text: txtStory4Vi, icon: "fas fa-leaf" },
            { id: 305, name: "Cách mạng AI", keys: "Đoạn văn", text: txtStory5Vi, icon: "fas fa-robot" }
        ]
    }
];
