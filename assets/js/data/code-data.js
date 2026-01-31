export const codeData = [
    {
        title: "Code Practice",
        lessons: [
            { id: 301, name: "Python", keys: "Variables", type: "code", lang: "python", icon: "fab fa-python", color: "#306998" },
            { id: 302, name: "JavaScript", keys: "ES6 Syntax", type: "code", lang: "js", icon: "fab fa-js", color: "#f7df1e" }
        ]
    }
];

export const codeSnippets = {
    python: ["def hello_world():\n    print('Hello World')\n    return True", "x = 10\ny = 20\nsum = x + y\nprint(f'Sum is {sum}')"],
    js: ["const greet = (name) => {\n    console.log(`Hello ${name}`);\n};", "document.getElementById('btn').addEventListener('click', () => {\n    alert('Clicked!');\n});"]
};