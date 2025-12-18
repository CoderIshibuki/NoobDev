/* --- LƯU TẠI: assets/js/typing.js --- */

// ======================================================
// 1. KHO DỮ LIỆU VĂN BẢN (DATA SOURCES)
// ======================================================

// [TIMED TESTS] Kho văn bản cho bài kiểm tra thời gian
const fixedTexts = [
    "We often like to think of ourselves as rational beings who make conscious decisions about every action we take. In reality, a vast portion of our daily lives is governed by habit. Psychologists estimate that up to 40% of our daily actions are not actual decisions but automated behaviors. This is the brain's way of saving energy; by automating routine tasks like brushing teeth, driving to work, or typing on a keyboard, the brain frees up mental resources for more complex problem-solving. Understanding this habit loop—cue, routine, and reward—is the key to personal transformation. /n When we want to build a new habit, such as exercising or reading, we often rely solely on willpower. But willpower is a finite resource that gets depleted throughout the day. A more effective strategy is to design your environment to make the good habit the path of least resistance. If you want to practice guitar, put the guitar in the middle of the living room, not in the closet. If you want to eat healthier, place apples on the counter and hide the cookies. Conversely, breaking a bad habit requires identifying the cue that triggers it. Do you check social media when you are bored, or when you are anxious? By recognizing the trigger, you can experiment with replacing the routine while keeping the reward. Mastering your habits is effectively mastering your future self.",
    "Plastic is one of the most versatile and ubiquitous materials ever invented. It is lightweight, durable, waterproof, and incredibly cheap to produce. These qualities have made it essential for modern life, used in everything from medical devices and food preservation to cars and computers. However, the very properties that make plastic so useful also make it an environmental nightmare. Because it is designed to last, it does not biodegrade in a human timeframe. Instead, it breaks down into smaller and smaller particles known as microplastics, which have now permeated every corner of the globe, from the deepest ocean trenches to the peaks of the Himalayas, and even into the human bloodstream. /n The challenge we face is that we cannot simply ban all plastic overnight without causing significant economic and logistical disruption. For example, plastic packaging significantly reduces food waste by keeping produce fresh during transport. The solution, therefore, requires a multi-pronged approach: reducing unnecessary single-use plastics, improving recycling infrastructure (which is currently woefully inadequate), and investing heavily in the development of biodegradable alternatives. We are at a crossroads where we must decide whether convenience is worth the long-term cost to our planetary health. The transition to a circular economy, where materials are kept in use for as long as possible, is no longer just an ideal—it is a necessity for survival.",
    "Đối với người Việt Nam, Tết Nguyên Đán không chỉ đơn thuần là sự chuyển giao giữa năm cũ và năm mới tính theo âm lịch, mà nó còn mang ý nghĩa tâm linh và văn hóa vô cùng sâu sắc. Đây là dịp để mọi người hướng về cội nguồn, tưởng nhớ tổ tiên và thắt chặt tình cảm gia đình. Dù làm ăn xa xôi ở đâu, người Việt vẫn luôn cố gắng về quê ăn Tết, bởi lẽ, sự đoàn viên chính là giá trị cốt lõi nhất của ngày lễ này. Những ngày trước Tết, không khí nhộn nhịp bao trùm khắp các nẻo đường, từ việc dọn dẹp, trang hoàng nhà cửa đến việc đi chợ hoa sắm sửa cành đào, cây mai.",
    "The Industrial Revolution, which began in Britain in the late 18th century, marks one of the most significant turning points in human history. Before this period, most people lived in rural areas, and their lives revolved around agriculture. Production was slow, manual, and localized. The invention of the steam engine changed everything. Suddenly, machines could do the work of a hundred men and horses. Factories sprang up, drawing millions of people from the countryside into rapidly expanding cities. This shift fundamentally altered the social fabric, giving rise to a new working class and a wealthy industrialist class. /n While the Industrial Revolution brought about an explosion of goods, lower prices, and technological advancements like the railway and the telegraph, it also created immense suffering. Early factory conditions were often brutal, with long hours, dangerous machinery, and child labor being the norm. The smog-choked cities became breeding grounds for disease and poverty. It took decades of labor movements and political reform to establish workers' rights and safety standards. Today, as we stand on the brink of the Fourth Industrial Revolution—characterized by AI and robotics—we would do well to study this history. It serves as a reminder that technological progress does not automatically equate to human progress unless it is guided by ethical considerations and social policies that protect the vulnerable.",
    "Mâm cơm ngày Tết cũng chứa đựng cả một bầu trời văn hóa ẩm thực. Bánh chưng vuông tượng trưng cho đất, bánh giầy tròn tượng trưng cho trời, thể hiện triết lý âm dương hòa hợp của cư dân nông nghiệp lúa nước. Bên cạnh đó, phong tục chúc Tết và mừng tuổi (lì xì) là nét đẹp thể hiện sự quan tâm, mong muốn những điều tốt lành nhất sẽ đến với người thân, bạn bè. Người lớn chúc trẻ con hay ăn chóng lớn, ngoan ngoãn; con cháu chúc ông bà, cha mẹ sống lâu trăm tuổi, sức khỏe dồi dào. Mặc dù cuộc sống hiện đại có nhiều đổi thay, nhưng những giá trị truyền thống của ngày Tết vẫn luôn được gìn giữ, như một sợi dây vô hình kết nối quá khứ, hiện tại và tương lai của dân tộc.",
    "Nằm trên cao nguyên Lâm Viên, Đà Lạt từ lâu đã trở thành điểm đến lý tưởng cho những ai muốn trốn chạy cái nắng oi ả của vùng nhiệt đới. Với độ cao 1.500 mét so với mực nước biển, thành phố này được thiên nhiên ưu đãi một khí hậu ôn hòa, mát mẻ quanh năm, tựa như một châu Âu thu nhỏ giữa lòng Việt Nam. Đà Lạt hiện lên trong tâm trí du khách với những đồi thông reo vi vu trong gió, những con đường dốc quanh co sương mù bao phủ và những biệt thự cổ kính mang kiến trúc Pháp đầy hoài niệm.",
    "Không chỉ có khí hậu tuyệt vời, Đà Lạt còn được mệnh danh là Thành phố ngàn hoa. Đi đâu người ta cũng thấy hoa: hoa dã quỳ vàng rực rỡ ven đường, hoa cẩm tú cầu tròn đầy kiêu hãnh, hoa mai anh đào hồng phớt báo hiệu xuân về. Hồ Xuân Hương nằm giữa trung tâm thành phố như một viên ngọc bích, phản chiếu bầu trời xanh thẳm và những hàng liễu rủ bóng thướt tha. Đà Lạt buồn nhưng lãng mạn. Cái buồn của Đà Lạt không làm người ta bi lụy, mà khiến lòng người lắng lại, sống chậm hơn để cảm nhận hơi thở của thiên nhiên. Đó là nơi người ta tìm đến để thưởng thức một ly cà phê nóng trong tiết trời se lạnh, để nghe một bản nhạc Trịnh và để tìm lại sự bình yên trong tâm hồn sau những bộn bề của cuộc sống mưu sinh."
];

// [PAGE TESTS] Kho văn bản cho bài kiểm tra theo trang
const pageTexts = {
    short: [
        "Typing is a skill that can significantly improve your productivity. Focus on accuracy first, and speed will follow naturally over time.",
        "The sun set behind the mountains, painting the sky in shades of orange and pink. It was a beautiful end to a long day.",
        "Coding is like writing a poem for a computer. Every line has a purpose, and when it all comes together, it creates something magical.",
        "Success is the sum of small efforts, repeated day in and day out. Do not wait for the perfect moment; take the moment and make it perfect through your own hard work.",
        "The morning sun peeked over the mountains, bathing the valley in soft, golden light. Birds chirped melodiously from the trees, waking the world up to a brand new day full of possibilities.",
        "Computers are incredibly fast, accurate, and stupid. Human beings are incredibly slow, inaccurate, and brilliant. Together they are powerful beyond imagination, creating a future that was once only seen in science fiction.",
        "Happiness is not something ready-made. It comes from your own actions. You have the power to create the life you want by choosing positivity, kindness, and gratitude every single day.",
        "Education is the most powerful weapon which you can use to change the world. It opens doors, breaks down barriers, and allows us to understand perspectives that are different from our own.",
        "Failure is simply the opportunity to begin again, this time more intelligently. Do not fear mistakes; fear only the absence of creative, constructive, and corrective responses to those mistakes.",
        "A real friend is one who walks in when the rest of the world walks out. True friendship is not about being inseparable, but about being separated and knowing nothing will change.",
        "Take care of your body. It is the only place you have to live. Eat fresh food, drink water, move daily, and sleep well to maintain your energy and vitality.",
        "Starve your distractions and feed your focus. In a world full of noise, the ability to concentrate on a single task is a superpower that will set you apart from the crowd."
    ],
    medium: [
        "The concept of 'touch typing' involves using muscle memory to find keys without looking at the keyboard. This method is far superior to the 'hunt and peck' method. To master touch typing, one must practice regularly and maintain good posture to avoid fatigue.",
        "Nature does not hurry, yet everything is accomplished. Trees grow, rivers flow, and seasons change in their own time. We can learn a lot from this patience, applying it to our own lives and goals.",
        "Music has the power to heal the soul. Whether you are listening to a calming melody or an energetic beat, it can change your mood instantly and bring back memories long forgotten.",
        "The Roman Emperor Marcus Aurelius wrote in his personal journal, You have power over your mind - not outside events. Realize this, and you will find strength. He believed that while we cannot control the chaos of the world around us, we always retain the ability to choose our reaction to it, which is the ultimate form of freedom.",
        "In the dimly lit room, the Don sat behind his desk, stroking a cat. He looked at the nervous man standing before him and said in a raspy voice, I'm going to make him an offer he can't refuse. This line has become one of the most iconic quotes in cinema history, representing the absolute power of the mafia.",
        "Building new habits is difficult, but James Clear offers a simple strategy. He writes, You do not rise to the level of your goals. You fall to the level of your systems. Instead of focusing intensely on the end result, we should focus on the daily routines—the systems—that make those results inevitable over a long period of time.",
        "Looking at a photograph of Earth taken from deep space, the astronomer Carl Sagan famously wrote, Look again at that dot. That's here. That's home. That's us. He reminded humanity that every person we have ever known lived out their lives on a mote of dust suspended in a sunbeam, urging us to cherish our pale blue dot.",
        "Standing on the steps of the Lincoln Memorial, Dr. King delivered a speech that changed history. He declared, I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character. His voice rang out with hope.",
        "A famous business mantra states, The customer is always right. While this is debated, the core message is about empathy. When a client complains, they are actually giving you an opportunity to improve. As Bill Gates once observed, Your most unhappy customers are your greatest source of learning. Listening to them can transform a failure into a success.",
        "Carol Dweck, a Stanford psychologist, coined the term growth mindset. She explains, In a fixed mindset, students believe their basic abilities, their intelligence, their talents, are just fixed traits. However, she argues that successful people believe their talents can be developed through hard work, good strategies, and input from others, which creates a love for learning.",
        "The boy looked at the vast desert and felt a sense of fear mixed with excitement. The Alchemist turned to him and whispered, There is only one thing that makes a dream impossible to achieve: the fear of failure. Those words echoed in the boy's mind, giving him the courage to take the first step into the unknown."
    ],
    full: [
        "Typing is a skill that can significantly improve your productivity in the digital age. Whether you are writing an email, coding a software application, or writing a novel, the ability to type quickly and accurately allows you to translate your thoughts into text with minimal friction. The concept of 'touch typing' involves using muscle memory to find keys without looking at the keyboard. Remember to maintain good posture, keep your wrists elevated, and take breaks to stretch your hands. Happy typing!",
        "The history of computers dates back to the 19th century with Charles Babbage's Analytical Engine. However, it wasn't until the mid-20th century that electronic computers were developed. Since then, computing power has increased exponentially, following Moore's Law. Today, we carry more computing power in our pockets than was available to the entire world just a few decades ago.",
        "Journaling is often dismissed as a teenage pastime, but it is actually one of the most effective tools for mental clarity and productivity. Throughout history, great minds from Marcus Aurelius to Albert Einstein kept journals to organize their thoughts. Writing down your thoughts forces you to articulate complex emotions and ideas that might otherwise remain abstract and overwhelming in your head. It is a process of mental decluttering. When you transfer your worries from your mind to paper, you free up cognitive resources to focus on solving problems rather than ruminating on them. \n Beyond stress relief, journaling is a powerful method for goal setting. A study by Dr. Gail Matthews found that people who wrote down their goals were 42% more likely to achieve them than those who didn't. By writing down your intentions for the day or reviewing your achievements at night, you create a feedback loop of accountability. You can track your personal growth, identify recurring patterns in your behavior, and celebrate small wins that you might otherwise forget. \n To start, you do not need to write a novel. A simple bullet journal or a five-minute journal approach is sufficient. Write down three things you are grateful for, three things that would make today great, and one daily affirmation. The key is consistency, not length. Over time, this small habit can lead to significant shifts in your mindset, helping you become more self-aware, focused, and emotionally resilient in the face of daily challenges.",
        "Gratitude is often viewed as a soft emotion, but scientific research has shown it to be a powerhouse for mental and physical health. The human brain has a natural negativity bias, meaning it is wired to focus more on threats and problems than on positive experiences. This was useful for our ancestors surviving in the wild, but in modern life, it leads to chronic stress and dissatisfaction. Practicing gratitude is the act of consciously retraining the brain to scan the world for the good. \n Implementing a gratitude practice can be as simple as writing down three things you are thankful for every morning or evening. These do not have to be grand achievements; in fact, focusing on small pleasures is often more effective. It could be the warmth of the sun, a good cup of coffee, or a kind text from a friend. When you force your brain to identify these moments, you release serotonin and dopamine, the neurotransmitters responsible for happiness. Over time, this rewires your neural pathways, making optimism your default setting. \n The ripple effects of gratitude extend to our relationships as well. When we express appreciation to others—thanking a colleague for their help or telling a partner we value them—we strengthen our social bonds. People feel seen and validated, which reduces conflict and fosters trust. Gratitude shifts our focus from what we lack to what we have, turning a mindset of scarcity into a mindset of abundance. As the writer Melody Beattie said, Gratitude turns what we have into enough.",
        "Glossophobia, or the fear of public speaking, is one of the most common phobias in the world, often ranking higher than the fear of death. The physical symptoms—sweaty palms, racing heart, and trembling voice—are the body’s ancient fight or flight response to perceived danger. However, in the modern world, public speaking is a critical skill for career advancement. Whether it is presenting a project to your team, pitching an idea to a client, or giving a toast at a wedding, the ability to articulate your thoughts clearly to an audience is invaluable. \n The secret to overcoming this fear is preparation and reframing. Most anxiety comes from the fear of the unknown or the fear of judgment. You can mitigate this by practicing your speech out loud multiple times, recording yourself, or rehearsing in front of a mirror. When you know your material inside and out, you can focus on the delivery rather than scrambling for words. Additionally, reframe your nervousness as excitement. The physical sensation of anxiety is nearly identical to excitement; tell yourself, I am excited to share this information, rather than I am terrified. \n Finally, remember that the audience is usually on your side. They want you to succeed because they want to learn something or be entertained. They are not scrutinizing your every breath; they are focusing on your message. Start by seeking low-stakes opportunities to speak, such as asking a question in a meeting or volunteering to introduce a speaker. Like a muscle, your confidence will grow with every repetition. Public speaking is not a talent reserved for extroverts; it is a skill that anyone can master with patience and practice.",
        "In the modern era, our smartphones have become extensions of our bodies. We wake up to alarms on our phones, check emails during breakfast, scroll through social media on our commute, and watch videos before falling asleep. While this connectivity offers convenience, it often comes at the cost of our mental health and attention span. A digital detox is a period of time during which a person voluntarily refrains from using digital devices. It is not about abandoning technology forever, but about regaining control over it. \n The benefits of disconnecting are immediate and profound. Without the constant dopamine hits from notifications, your brain begins to settle into a deeper state of relaxation. You might notice that your anxiety levels drop and your ability to focus on a single task improves. You become more present in your physical environment, noticing details in nature or engaging more deeply in face-to-face conversations. Many people report better sleep quality because they are no longer exposing their eyes to blue light right before bed, which suppresses melatonin production. \n To start a digital detox, you don't need to go to a retreat in the mountains. Start small. Designate the dinner table as a phone-free zone to encourage family conversation. Try leaving your phone in another room while you read a book or watch a movie. You can also turn off non-essential notifications so that your phone only buzzes for actual phone calls or text messages from close contacts. By setting these boundaries, you transform technology from a master that demands your attention into a tool that serves your life.",
        "There is a famous saying: Life begins at the end of your comfort zone. The comfort zone is a psychological state in which things feel familiar to a person and they are at ease and in control of their environment, experiencing low levels of anxiety and stress. While this is a safe place to rest, it is a dangerous place to stay. When we stay in our comfort zone for too long, we stop learning and growing. Our skills atrophy, and we become fearful of change. The brain is designed to seek safety, so it will naturally resist anything that feels risky or uncertain. \n However, growth requires a state of optimal anxiety, often called the growth zone. This is where you are slightly challenged, forcing you to focus and adapt. Stepping out of your comfort zone builds resilience. Each time you try something new—whether it’s learning a language, speaking in public, or traveling solo—you prove to yourself that you can handle uncertainty. This builds a reservoir of self-confidence that transfers to other areas of your life. \n Breaking out of your comfort zone doesn't require taking massive, reckless risks. It can be achieved through micro-challenges. Take a different route to work, try a new hobby, or strike up a conversation with a stranger. These small acts of courage rewire your brain to become more comfortable with the unknown. Over time, what was once terrifying becomes your new normal, and your comfort zone expands. Remember, comfort is the enemy of progress. If you want to achieve something you’ve never had, you must do something you’ve never done.",
        "Water is the essence of life, making up about 60% of the human body. Yet, chronic dehydration is a common issue that affects millions of people, leading to fatigue, headaches, and poor concentration. Many people underestimate the impact of hydration on their cognitive performance. Studies have shown that even mild dehydration—a loss of just 1-2% of body water—can impair brain function, mood, and memory. When you feel brain fog in the mid-afternoon, the solution might not be more coffee, but a simple glass of water. \n The benefits of staying hydrated extend to physical health as well. Water is essential for regulating body temperature, lubricating joints, and transporting nutrients to cells. It also plays a crucial role in digestion and skin health. Proper hydration can improve skin elasticity, making it look younger and healthier. Conversely, a lack of water forces the kidneys to work harder to filter toxins, which can lead to kidney stones and other long-term health issues. \n A practical tip to ensure you drink enough is to keep a reusable water bottle on your desk at all times. The visual cue serves as a reminder to take sips throughout the day. You can also eat your water by consuming fruits and vegetables with high water content, such as watermelon, cucumber, and oranges. While the eight glasses a day rule is a general guideline, individual needs vary based on activity level and climate. The best indicator is to listen to your body: drink when you are thirsty, and check the color of your urine—it should be pale yellow. Making water your primary beverage is one of the simplest and most effective changes you can make for your overall well-being.",
        "In the past, hiring managers focused almost exclusively on hard skills—technical abilities like coding, accounting, or machine operation. However, in the modern economy, soft skills have become the true differentiator for career success. Soft skills include communication, emotional intelligence, adaptability, and teamwork. While artificial intelligence and automation can increasingly handle technical tasks and data processing, they cannot replicate the human ability to empathize, negotiate, and lead diverse teams. \n Consider a project manager who is technically brilliant but cannot communicate effectively. If they cannot motivate their team, resolve conflicts, or explain complex ideas to stakeholders, the project will likely fail despite their technical expertise. On the other hand, an employee with strong emotional intelligence (EQ) can navigate office politics, build strong networks, and bounce back from setbacks with resilience. As the workplace becomes more collaborative and remote, the ability to write clear emails and listen actively on Zoom calls is invaluable. \n Fortunately, soft skills can be learned and developed just like any other skill. You can improve your communication by practicing public speaking or active listening. You can enhance your adaptability by seeking out new challenges that force you out of your comfort zone. In a rapidly changing job market, technical skills may become obsolete within a few years, but the ability to work well with people and solve problems creatively will always be in high demand. Investing in your soft skills is the best insurance policy for a long and prosperous career.",
        "In a world that glorifies the hustle, where being busy is worn as a badge of honor, the movement of slow living offers a radical alternative. Slow living is not about being lazy or unproductive; it is about living with intention. It is the conscious decision to do less so that you can do what matters better. It challenges the modern addiction to speed and multitasking, encouraging us to savor the present moment rather than constantly rushing toward the next milestone. This philosophy can be applied to everything from how we eat to how we work and travel. \n One practical way to embrace slow living is through the concept of monotasking. Instead of eating lunch while answering emails and checking the news, try simply eating. Taste the food, appreciate the textures, and take a break from the screen. This practice of mindfulness reduces stress and improves digestion. Similarly, in our relationships, slow living means putting down the phone when talking to a friend or partner, giving them your undivided attention. \n Ultimately, slow living is about quality over quantity. It suggests that a life filled with endless appointments and notifications is not necessarily a full life. By slowing down, we reconnect with the natural rhythm of our bodies and the world around us. We begin to notice the changing of the seasons, the taste of our coffee, and the nuances of conversation. As the famous quote says, Nature does not hurry, yet everything is accomplished. Adopting this mindset allows us to find peace and contentment right where we are."
    ]
};

// [CODE] Các đoạn mã mẫu
const codeSnippets = {
    python: [
        // 1. Variables & Strings
        "user_name = \"Alice\"\nuser_age = 25\n\nprint(\"Hello, World!\")\nprint(f\"User {user_name} is {user_age} years old.\")",
        
        // 2. Arithmetic Operators
        "x = 10\ny = 5\n\naddition = x + y\nsubtraction = x - y\nmultiplication = x * y\ndivision = x / y\n\nprint(f\"Result: {addition}\")",
        
        // 3. If/Elif/Else
        "score = 85\n\nif score >= 90:\n    print(\"Grade: A\")\nelif score >= 80:\n    print(\"Grade: B\")\nelse:\n    print(\"Grade: C\")",
        
        // 4. For Loops
        "for i in range(5):\n    print(f\"Current number is: {i}\")\n\nfor number in range(1, 11, 2):\n    print(number)",
        
        // 5. While Loop
        "count = 5\n\nwhile count > 0:\n    print(f\"Countdown: {count}\")\n    count -= 1\n\nprint(\"Blast off!\")",
        
        // 6. Lists
        "fruits = [\"apple\", \"banana\", \"cherry\"]\n\nfruits.append(\"orange\")\n\nprint(fruits[1])\n\nfor fruit in fruits:\n    print(fruit)",
        
        // 7. Dictionaries
        "student = {\n    \"name\": \"John\",\n    \"age\": 20,\n    \"courses\": [\"Math\", \"Science\"]\n}\n\nprint(student[\"name\"])\nstudent[\"age\"] = 21",
        
        // 8. Functions
        "def calculate_area(width, height):\n    area = width * height\n    return area\n\nresult = calculate_area(10, 5)\nprint(f\"Area is: {result}\")",
        
        // 9. User Input (Lưu ý: Cái này chạy trên web typing sẽ không thực sự input được, chỉ gõ lại text thôi)
        "name = input(\"Enter your name: \")\nage = int(input(\"Enter your age: \"))\n\nyear_born = 2024 - age\nprint(\"You were born in:\", year_born)",
        
        // 10. Default Arguments
        "def greet(name, message=\"Good morning\"):\n    print(f\"{message}, {name}!\")\n\ngreet(\"Sarah\")\ngreet(\"Tom\", \"Good evening\")",
        
        // 11. Try/Except
        "try:\n    number = int(input(\"Enter a number: \"))\n    result = 10 / number\n    print(result)\nexcept ZeroDivisionError:\n    print(\"You cannot divide by zero.\")\nexcept ValueError:\n    print(\"Please enter a valid integer.\")",
        
        // 12. Modules
        "import math\nimport random\n\nroot = math.sqrt(16)\nlucky_number = random.randint(1, 100)\n\nprint(f\"Root: {root}, Lucky: {lucky_number}\")",
        
        // 13. String Manipulation
        "text = \"  python programming  \"\n\nclean_text = text.strip()\nupper_text = clean_text.upper()\n\nprint(upper_text)",
        
        // 14. Boolean Logic
        "is_sunny = True\nhave_umbrella = False\n\nif is_sunny and not have_umbrella:\n    print(\"Wear sunscreen.\")\nelif is_sunny or have_umbrella:\n    print(\"You are prepared.\")",
        
        // 15. Classes
        "class Dog:\n    def __init__(self, name, breed):\n        self.name = name\n        self.breed = breed\n\n    def bark(self):\n        print(f\"{self.name} says Woof!\")\n\nmy_dog = Dog(\"Buddy\", \"Golden Retriever\")\nmy_dog.bark()"
    ],
    cpp: [
        // 1. Hello World
        "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}",
        
        // 2. Variables & Math
        "#include <iostream>\nusing namespace std;\n\nint main() {\n    int width = 5;\n    int height = 10;\n    int area = width * height;\n\n    cout << \"Area: \" << area << \"\\n\";\n    return 0;\n}",
        
        // 3. Input & Output
        "#include <iostream>\nusing namespace std;\n\nint main() {\n    int age;\n    cout << \"Enter your age: \";\n    cin >> age;\n\n    cout << \"You are \" << age << \" years old.\\n\";\n    return 0;\n}",
        
        // 4. If/Else
        "#include <iostream>\nusing namespace std;\n\nint main() {\n    int number = 7;\n\n    if (number % 2 == 0) {\n        cout << \"Even number\\n\";\n    } else {\n        cout << \"Odd number\\n\";\n    }\n    return 0;\n}",
        
        // 5. Switch Case
        "#include <iostream>\nusing namespace std;\n\nint main() {\n    char grade = 'B';\n\n    switch (grade) {\n        case 'A':\n            cout << \"Excellent\\n\";\n            break;\n        case 'B':\n            cout << \"Good\\n\";\n            break;\n        default:\n            cout << \"Valid grade\\n\";\n    }\n    return 0;\n}",
        
        // 6. For Loop
        "#include <iostream>\nusing namespace std;\n\nint main() {\n    for (int i = 0; i < 5; i++) {\n        cout << \"Iteration: \" << i << \"\\n\";\n    }\n    return 0;\n}",
        
        // 7. While Loop
        "#include <iostream>\nusing namespace std;\n\nint main() {\n    int count = 5;\n\n    while (count > 0) {\n        cout << count << \" \";\n        count--;\n    }\n    return 0;\n}",
        
        // 8. Do-While Loop
        "#include <iostream>\nusing namespace std;\n\nint main() {\n    int number = 0;\n\n    do {\n        cout << \"Number is \" << number << \"\\n\";\n        number++;\n    } while (number < 3);\n    return 0;\n}",
        
        // 9. Arrays
        "#include <iostream>\nusing namespace std;\n\nint main() {\n    int numbers[4] = {10, 20, 30, 40};\n\n    cout << numbers[0] << \"\\n\";\n    cout << numbers[3] << \"\\n\";\n    return 0;\n}",
        
        // 10. Functions
        "#include <iostream>\nusing namespace std;\n\nvoid greet() {\n    cout << \"Welcome to C++\\n\";\n}\n\nint main() {\n    greet();\n    return 0;\n}",
        
        // 11. Function Parameters
        "#include <iostream>\nusing namespace std;\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int result = add(5, 7);\n    cout << result << \"\\n\";\n    return 0;\n}",
        
        // 12. References
        "#include <iostream>\nusing namespace std;\n\nvoid increment(int &val) {\n    val++;\n}\n\nint main() {\n    int num = 10;\n    increment(num);\n    cout << num << \"\\n\";\n    return 0;\n}",
        
        // 13. Pointers
        "#include <iostream>\nusing namespace std;\n\nint main() {\n    int var = 20;\n    int* ptr = &var;\n\n    cout << \"Value: \" << *ptr << \"\\n\";\n    cout << \"Address: \" << ptr << \"\\n\";\n    return 0;\n}",
        
        // 14. Strings
        "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string firstName = \"John\";\n    string lastName = \"Doe\";\n    string fullName = firstName + \" \" + lastName;\n\n    cout << fullName << \"\\n\";\n    return 0;\n}",
        
        // 15. Classes & Objects
        "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Car {\npublic:\n    string brand;\n    int year;\n\n    void honk() {\n        cout << \"Beep beep!\\n\";\n    }\n};\n\nint main() {\n    Car myCar;\n    myCar.brand = \"Toyota\";\n    myCar.year = 2020;\n    myCar.honk();\n    return 0;\n}"
    ],
    java: [
        // 1. Hello World
        "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
        
        // 2. Variables & Math
        "public class Main {\n    public static void main(String[] args) {\n        int x = 10;\n        int y = 20;\n        int sum = x + y;\n        \n        System.out.println(\"Sum: \" + sum);\n    }\n}",
        
        // 3. Scanner Input
        "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        System.out.print(\"Enter your name: \");\n        String name = scanner.nextLine();\n        \n        System.out.println(\"Hello \" + name);\n    }\n}",
        
        // 4. If/Else Condition
        "public class Main {\n    public static void main(String[] args) {\n        int score = 75;\n\n        if (score >= 50) {\n            System.out.println(\"Passed\");\n        } else {\n            System.out.println(\"Failed\");\n        }\n    }\n}",
        
        // 5. For Loop
        "public class Main {\n    public static void main(String[] args) {\n        for (int i = 0; i < 5; i++) {\n            System.out.println(\"Count: \" + i);\n        }\n    }\n}",
        
        // 6. While Loop
        "public class Main {\n    public static void main(String[] args) {\n        int count = 5;\n        while (count > 0) {\n            System.out.println(count);\n            count--;\n        }\n    }\n}",
        
        // 7. Array & For-Each
        "public class Main {\n    public static void main(String[] args) {\n        String[] cars = {\"Volvo\", \"BMW\", \"Ford\", \"Mazda\"};\n        for (String i : cars) {\n            System.out.println(i);\n        }\n    }\n}",
        
        // 8. Switch Case
        "public class Main {\n    public static void main(String[] args) {\n        int day = 4;\n        switch (day) {\n            case 6:\n                System.out.println(\"Saturday\");\n                break;\n            case 7:\n                System.out.println(\"Sunday\");\n                break;\n            default:\n                System.out.println(\"Weekday\");\n        }\n    }\n}",
        
        // 9. Methods
        "public class Main {\n    static void myMethod() {\n        System.out.println(\"I just got executed!\");\n    }\n\n    public static void main(String[] args) {\n        myMethod();\n    }\n}",
        
        // 10. Method Parameters & Return
        "public class Main {\n    static int add(int x, int y) {\n        return x + y;\n    }\n\n    public static void main(String[] args) {\n        int result = add(5, 3);\n        System.out.println(result);\n    }\n}",
        
        // 11. Classes & Objects
        "public class Main {\n    int x = 5;\n\n    public static void main(String[] args) {\n        Main myObj = new Main();\n        System.out.println(myObj.x);\n    }\n}",
        
        // 12. Constructors
        "public class Car {\n    int modelYear;\n    String modelName;\n\n    public Car(int year, String name) {\n        modelYear = year;\n        modelName = name;\n    }\n\n    public static void main(String[] args) {\n        Car myCar = new Car(1969, \"Mustang\");\n        System.out.println(myCar.modelYear + \" \" + myCar.modelName);\n    }\n}",
        
        // 13. String Methods
        "public class Main {\n    public static void main(String[] args) {\n        String txt = \"Hello World\";\n        System.out.println(txt.toUpperCase());\n        System.out.println(txt.toLowerCase());\n        System.out.println(txt.indexOf(\"World\"));\n    }\n}",
        
        // 14. Try Catch Exception
        "public class Main {\n    public static void main(String[] args) {\n        try {\n            int[] myNumbers = {1, 2, 3};\n            System.out.println(myNumbers[10]);\n        } catch (Exception e) {\n            System.out.println(\"Something went wrong.\");\n        }\n    }\n}",
        
        // 15. ArrayList
        "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> cars = new ArrayList<String>();\n        cars.add(\"Volvo\");\n        cars.add(\"BMW\");\n        \n        System.out.println(cars.get(0));\n        cars.remove(0);\n        System.out.println(cars);\n    }\n}"
    ],
    /* --- CẬP NHẬT PHẦN html TRONG assets/js/typing.js --- */

    html: [
        // 1. Basic Structure
        "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Document</title>\n</head>\n<body>\n\n</body>\n</html>",

        // 2. Headings & Paragraphs
        "<body>\n    <h1>Main Title</h1>\n    <h2>Subtitle</h2>\n    <p>This is a paragraph of text.</p>\n    <p>This is another paragraph.</p>\n</body>",

        // 3. Unordered List
        "<ul>\n    <li>Apples</li>\n    <li>Bananas</li>\n    <li>Cherries</li>\n</ul>",

        // 4. Ordered List
        "<ol>\n    <li>Wake up</li>\n    <li>Brush teeth</li>\n    <li>Eat breakfast</li>\n</ol>",

        // 5. Links
        "<p>\n    Visit our <a href=\"https://google.com\">website</a> for more info.\n</p>",

        // 6. Images
        "<img src=\"logo.png\" alt=\"Company Logo\" width=\"200\" height=\"100\">",

        // 7. Div & Container
        "<div class=\"container\">\n    <h3>Card Title</h3>\n    <p>Some content inside a box.</p>\n</div>",

        // 8. Tables
        "<table>\n    <tr>\n        <th>Name</th>\n        <th>Age</th>\n    </tr>\n    <tr>\n        <td>Alice</td>\n        <td>24</td>\n    </tr>\n</table>",

        // 9. Forms
        "<form action=\"/submit-data\">\n    <label for=\"fname\">First name:</label>\n    <input type=\"text\" id=\"fname\" name=\"fname\">\n    <input type=\"submit\" value=\"Submit\">\n</form>",

        // 10. Navigation
        "<nav>\n    <a href=\"#home\">Home</a>\n    <a href=\"#about\">About</a>\n    <a href=\"#contact\">Contact</a>\n</nav>",

        // 11. Buttons
        "<button type=\"button\">Click Me!</button>",

        // 12. Text Formatting
        "<p>\n    This text is <b>bold</b>.\n    This text is <i>italic</i>.\n    This text is <u>underlined</u>.\n</p>",

        // 13. Select Dropdown
        "<label for=\"cars\">Choose a car:</label>\n<select id=\"cars\" name=\"cars\">\n    <option value=\"volvo\">Volvo</option>\n    <option value=\"saab\">Saab</option>\n</select>",

        // 14. Semantic Elements
        "<header>\n    <h1>My Website</h1>\n</header>\n\n<main>\n    <p>Main content goes here.</p>\n</main>\n\n<footer>\n    <p>Copyright 2024</p>\n</footer>",

        // 15. Internal CSS
        "<head>\n    <style>\n        body {\n            background-color: white;\n            color: black;\n        }\n    </style>\n</head>"
    ],
    /* --- CẬP NHẬT PHẦN js TRONG assets/js/typing.js --- */

    js: [
        // 1. Variables & Types
        "const firstName = \"John\";\nlet age = 30;\nlet isStudent = false;\n\nconsole.log(firstName);\nconsole.log(age);",

        // 2. Template Literals
        "const product = \"Laptop\";\nconst price = 999;\n\nconst message = \`The price of the ${product} is $${price}.\`;\nconsole.log(message);",

        // 3. Operators
        "let x = 10;\nlet y = 5;\n\nlet sum = x + y;\nlet difference = x - y;\nlet product = x * y;\nlet quotient = x / y;\n\nconsole.log(sum);",

        // 4. Conditionals
        "let score = 85;\n\nif (score >= 90) {\n    console.log(\"Grade: A\");\n} else if (score >= 80) {\n    console.log(\"Grade: B\");\n} else {\n    console.log(\"Grade: C\");\n}",

        // 5. For Loop
        "for (let i = 0; i < 5; i++) {\n    console.log(\"Iteration number: \" + i);\n}",

        // 6. While Loop
        "let count = 0;\n\nwhile (count < 5) {\n    console.log(count);\n    count++;\n}",

        // 7. Arrays
        "const colors = [\"Red\", \"Green\", \"Blue\"];\ncolors.push(\"Yellow\");\n\nconsole.log(colors[0]);\nconsole.log(colors.length);",

        // 8. Array Methods
        "const numbers = [1, 2, 3, 4, 5];\n\nnumbers.forEach(function(number) {\n    console.log(number * 2);\n});",

        // 9. Functions
        "function greet(name) {\n    return \"Hello \" + name;\n}\n\nconst result = greet(\"Alice\");\nconsole.log(result);",

        // 10. Arrow Functions
        "const multiply = (a, b) => {\n    return a * b;\n};\n\nconsole.log(multiply(5, 10));",

        // 11. Objects
        "const car = {\n    brand: \"Toyota\",\n    model: \"Camry\",\n    year: 2020,\n    start: function() {\n        console.log(\"Engine started\");\n    }\n};\n\nconsole.log(car.brand);\ncar.start();",

        // 12. DOM Manipulation (Properties)
        "const button = document.getElementById(\"myButton\");\nconst output = document.querySelector(\".output\");\n\nbutton.innerText = \"Click Me\";\noutput.style.color = \"red\";",

        // 13. Event Listeners
        "const btn = document.querySelector(\"button\");\n\nbtn.addEventListener(\"click\", () => {\n    alert(\"Button was clicked!\");\n});",

        // 14. Classes
        "class Person {\n    constructor(name, age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    sayHello() {\n        console.log(\`Hi, I am ${this.name}\`);\n    }\n}\n\nconst user = new Person(\"Bob\", 25);\nuser.sayHello();",

        // 15. Async/Await
        "async function fetchData() {\n    try {\n        const response = await fetch(\"https://api.example.com/data\");\n        const data = await response.json();\n        console.log(data);\n    } catch (error) {\n        console.error(error);\n    }\n}\n\nfetchData();"
    ],
    /* --- CẬP NHẬT PHẦN php TRONG assets/js/typing.js --- */

    php: [
        // 1. Hello World
        "<?php\necho \"Hello, World!\";\n?>",

        // 2. Variables & Strings
        "<?php\n$txt1 = \"Learn PHP\";\n$txt2 = \"W3Schools.com\";\n$x = 5;\n$y = 4;\n\necho \"<h2>\" .\n$txt1 . \"</h2>\";\necho \"Study PHP at \" . $txt2 . \"<br>\";\necho $x + $y;\n?>",

        // 3. If/Else
        "<?php\n$t = date(\"H\");\nif ($t < \"20\") {\n    echo \"Have a good day!\";\n} else {\n    echo \"Have a good night!\";\n}\n?>",

        // 4. Arrays
        "<?php\n$cars = [\"Volvo\", \"BMW\", \"Toyota\"];\necho \"I like \" . $cars[0] . \", \" . $cars[1] . \" and \" . $cars[2] . \".\";\n?>",

        // 5. Associative Arrays
        "<?php\n$age = [\"Peter\" => \"35\", \"Ben\" => \"37\", \"Joe\" => \"43\"];\n\necho \"Peter is \" . $age[\"Peter\"] .\n\" years old.\";\n?>",

        // 6. Foreach Loop
        "<?php\n$colors = [\"red\", \"green\", \"blue\", \"yellow\"];\n\nforeach ($colors as $value) {\n    echo \"$value <br>\";\n}\n?>",

        // 7. Foreach Key/Value
        "<?php\n$age = [\"Peter\" => \"35\", \"Ben\" => \"37\", \"Joe\" => \"43\"];\nforeach ($age as $x => $val) {\n    echo \"$x = $val<br>\";\n}\n?>",

        // 8. While Loop
        "<?php\n$x = 1;\nwhile ($x <= 5) {\n    echo \"The number is: $x <br>\";\n    $x++;\n}\n?>",

        // 9. Functions
        "<?php\nfunction writeMsg() {\n    echo \"Hello world!\";\n}\n\nwriteMsg();\n?>",

        // 10. Function Arguments
        "<?php\nfunction addNumbers(int $a, int $b) {\n    return $a + $b;\n}\n\necho addNumbers(5, 10);\n?>",

        // 11. Switch Case
        "<?php\n$favcolor = \"red\";\nswitch ($favcolor) {\n    case \"red\":\n        echo \"Your favorite color is red!\";\n        break;\n    case \"blue\":\n        echo \"Your favorite color is blue!\";\n        break;\n    default:\n        echo \"Your favorite color is neither red nor blue!\";\n}\n?>",

        // 12. Form Handling
        "<?php\nif ($_SERVER[\"REQUEST_METHOD\"] == \"POST\") {\n    $name = $_POST['fname'];\n    if (empty($name)) {\n        echo \"Name is empty\";\n    } else {\n        echo $name;\n    }\n}\n?>",

        // 13. Classes & Objects
        "<?php\nclass Fruit {\n    public $name;\n    public $color;\n\n    function set_name($name) {\n        $this->name = $name;\n    }\n    function get_name() {\n        return $this->name;\n    }\n}\n\n$apple = new Fruit();\n$apple->set_name(\"Apple\");\necho $apple->get_name();\n?>",

        // 14. Constructor
        "<?php\nclass Car {\n    public $model;\n    public function __construct($model) {\n        $this->model = $model;\n    }\n}\n\n$myCar = new Car(\"Tesla\");\necho $myCar->model;\n?>",

        // 15. Include
        "<?php\ninclude 'header.php';\n\necho \"Welcome to my home page!\";\n\ninclude 'footer.php';\n?>"
    ],
};

// Từ vựng ngẫu nhiên (Dự phòng)
const randomWords = "the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us".split(" ");


// ======================================================
// 2. CẤU TRÚC MENU BÀI HỌC
// ======================================================

const lessonData = [
    {
        title: "Beginner: The Essentials",
        lessons: [
            { id: 1, name: "J, F, and Space", keys: "j, f, space", text: "jjj fff jf jf jfj fjf j j f f jf jjj fff jf jf jfj fjf j j f f jf", icon: "fas fa-keyboard" },
            { id: 2, name: "U, R, and K Keys", keys: "u, r, k", text: "uju frf kjk uju frf kuk rir uju frf kjk uju frf kuk rir", icon: "fas fa-share" },
            { id: 3, name: "D, E, and I Keys", keys: "d, e, i", text: "ded kik ded kik ded ded kik ded kik ded", icon: "fas fa-cube" },
            { id: 4, name: "C, G, and N Keys", keys: "c, g, n", text: "fgf jnj dcd fgf jnj fgf jnj dcd fgf jnj", icon: "fas fa-layer-group" },
            { id: 5, name: "T, S, and L Keys", keys: "t, s, l", text: "st st ll tt slt lts slt lls stt tsl lts", icon: "fas fa-arrow-up" },
            { id: 6, name: "O, B, and A Keys", keys: "o, b, a", text: "oa ba bo aba bob obo baa boa bob oba", icon: "fas fa-circle" }
        ]
    },
    {
        title: "Intermediate: Full Keyboard",
        lessons: [
            { id: 7, name: "V, H, and M Keys", keys: "v, h, m", text: "hm mv vh ham van hmm vvh mhm vhm", icon: "fas fa-font" },
            { id: 8, name: "W, X, and Y Keys", keys: "w, x, y", text: "way qax yew wax xay yaw wxy xyw", icon: "fas fa-times" },
            { id: 9, name: "P, Q, and Z Keys", keys: "p, q, z", text: "zap zip pop qap zaz qpq zpq pzq", icon: "fas fa-bolt" },
            { id: 10, name: "Common Words", keys: "common words", text: "the be to of and a in that have I it for not on with he as you do at this but his by from", icon: "fas fa-book" },
            { id: 11, name: "Capital Letters", keys: "Shift Key", text: "The Quick Brown Fox Jumps Over The Lazy Dog Alice Bob Charlie Dave Eve", icon: "fas fa-arrow-circle-up" },
            { id: 12, name: "Punctuation", keys: ".,;?!", text: "Hello, world. How are you? I am fine; thanks! Wait... really?", icon: "fas fa-quote-right" },
            { id: 13, name: "Number Row", keys: "1-0", text: "1990 2024 123 456 7890 100% 50% 24/7 365 days", icon: "fas fa-hashtag" }
        ]
    }
];

const codeData = [
    {
        title: "Programming Languages",
        lessons: [
            { id: 301, name: "Python", keys: "Variables, Loops", type: "code", lang: "python", icon: "fab fa-python", color: "#306998" },
            { id: 302, name: "C++", keys: "Syntax, Pointers", type: "code", lang: "cpp", icon: "fab fa-cuttlefish", color: "#00599C" },
            { id: 303, name: "Java", keys: "Classes, OOP", type: "code", lang: "java", icon: "fab fa-java", color: "#f89820" },
            { id: 304, name: "HTML", keys: "Tags, Structure", type: "code", lang: "html", icon: "fab fa-html5", color: "#e34c26" },
            { id: 305, name: "JavaScript", keys: "DOM, ES6", type: "code", lang: "js", icon: "fab fa-js", color: "#f7df1e" },
            { id: 306, name: "PHP", keys: "Backend Syntax", type: "code", lang: "php", icon: "fab fa-php", color: "#777bb4" }
        ]
    }
];

// [CẬP NHẬT] Thêm các bài test mới (45s, 2m)
const testData = [
    {
        title: "Timed Tests",
        lessons: [
            { id: 401, name: "15 Seconds", keys: "Speed Burst", type: "timetest", duration: 15, icon: "fas fa-stopwatch" },
            { id: 402, name: "30 Seconds", keys: "Standard Sprint", type: "timetest", duration: 30, icon: "fas fa-clock" },
            { id: 403, name: "60 Seconds", keys: "Endurance", type: "timetest", duration: 60, icon: "fas fa-hourglass-half" },
            { id: 404, name: "3 Minutes", keys: "Stamina", type: "timetest", duration: 180, icon: "fas fa-running" },
            { id: 405, name: "5 Minutes", keys: "Marathon", type: "timetest", duration: 300, icon: "fas fa-coffee" },
            { id: 406, name: "10 Minutes", keys: "Hardcore", type: "timetest", duration: 600, icon: "fas fa-fire" }
        ]
    },
    {
        title: "Page Tests",
        lessons: [
            { id: 201, name: "Short Text", keys: "~30 words", type: "pagetest", subtype: "short", icon: "fas fa-file-alt" },
            { id: 202, name: "Medium Text", keys: "~60 words", type: "pagetest", subtype: "medium", icon: "fas fa-file-invoice" },
            { id: 203, name: "Full Text", keys: "Full Paragraph", type: "pagetest", subtype: "full", icon: "fas fa-book-open" }
        ]
    }
];

// ======================================================
// 3. GLOBAL VARIABLES & DOM
// ======================================================
let currentText = "", charIndex = 0, mistakes = 0, isTyping = false, timer;
let maxTime = 60, timeLeft = maxTime, currentMode = 'beginner';
let activeLessonId = null, currentLessonObj = null;
let pendingLesson = null, isCustomPending = false, pendingCustomText = "";

const selectionBar = document.querySelector('.selection-bar');
const dashboard = document.getElementById('lessonDashboard');
const gameArea = document.getElementById('gameArea');
const display = document.getElementById('quoteDisplay');
const inputField = document.getElementById('inputField');
const focusOverlay = document.getElementById('focusOverlay');
const typingWrapper = document.getElementById('typingWrapper');
const gameStats = document.getElementById('gameStats'); 
const minigamePanel = document.getElementById('minigamePanel');
const customPanel = document.getElementById('customPanel');
const navControls = document.getElementById('navControls');
const navNewTextBtn = document.getElementById('navNewTextBtn');
const timeModal = document.getElementById('timeModal');
const timeInput = document.getElementById('timeInput');
const customModal = document.getElementById('customModal');
const btnNext = document.getElementById('btnNext');
const btnNewText = document.getElementById('btnNewText');
const timeTag = document.getElementById('timeLeft');
const wpmTag = document.getElementById('wpm');
const accTag = document.getElementById('accuracy');

function getStorageKey(lessonId) {
    if (typeof CURRENT_USER_ID !== 'undefined') return `u_${CURRENT_USER_ID}_lesson_${lessonId}_stars`;
    return `lesson_${lessonId}_stars`;
}

// ======================================================
// 4. INITIALIZATION & EVENTS
// ======================================================
document.addEventListener('DOMContentLoaded', () => {
    if(dashboard) showLessonDashboard();
    
    if(timeInput) {
        timeInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); 
            if (value.length >= 3) value = value.substring(0, 2) + ':' + value.substring(2, 4);
            e.target.value = value;
        });
    }

    if(focusOverlay) {
        focusOverlay.addEventListener('click', (e) => {
            e.stopPropagation(); inputField.focus();
            focusOverlay.classList.add('hidden'); focusOverlay.style.opacity = '0';
        });
    }
    if(typingWrapper) {
        typingWrapper.addEventListener('click', () => { inputField.focus(); });
    }
    if(inputField) {
        inputField.addEventListener('focus', () => {
            if(focusOverlay) { focusOverlay.classList.add('hidden'); focusOverlay.style.opacity = '0'; }
        });
        inputField.addEventListener('blur', () => {
            if(gameArea.style.display !== 'none' && focusOverlay) {
                focusOverlay.classList.remove('hidden'); focusOverlay.style.opacity = '1';
            }
        });
        inputField.addEventListener('input', initTyping);
    }
});

// ======================================================
// 5. NAVIGATION & RENDER LOGIC
// ======================================================
function switchMode(mode) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const btn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick').includes(`'${mode}'`));
    if(btn) btn.classList.add('active');

    hideAllPanels();
    if(selectionBar) selectionBar.style.display = 'flex'; 

    currentMode = mode;

    if(mode === 'beginner') { 
        renderDashboard(); 
        dashboard.style.display = 'flex'; 
    } 
    else if (mode === 'code') { 
        renderCodeDashboard(); 
        dashboard.style.display = 'flex'; 
    }
    else if (mode === 'test') { 
        renderTestDashboard(); 
        dashboard.style.display = 'flex'; 
    }
    else if (mode === 'minigame') { 
        if(minigamePanel) minigamePanel.style.display = 'block'; 
    } 
    else if (mode === 'custom') { 
        if(customPanel) customPanel.style.display = 'block'; 
    }
}

function hideAllPanels() {
    if(selectionBar) selectionBar.style.display = 'none';
    if(dashboard) dashboard.style.display = 'none';
    if(gameArea) gameArea.style.display = 'none';
    if(gameStats) gameStats.style.display = 'none';
    if(minigamePanel) minigamePanel.style.display = 'none';
    if(customPanel) customPanel.style.display = 'none';
    if(navControls) navControls.style.display = 'none';
    const overlay = document.getElementById('resultOverlay');
    if(overlay) overlay.classList.remove('active');
    closeModal();
}

function showLessonDashboard() { switchMode('beginner'); }
function goToMenu() { switchMode(currentMode); }

function openCustomModal() { customModal.classList.add('active'); const txt = document.getElementById('customTextInput'); if(txt) { txt.value = ""; txt.focus(); } }
function applyCustomText() { const txt = document.getElementById('customTextInput'); if (txt && txt.value.trim() !== "") { pendingCustomText = txt.value.trim(); isCustomPending = true; customModal.classList.remove('active'); openTimeModal(); } }
function openTimeModal(lessonObj = null) { if(lessonObj) pendingLesson = lessonObj; timeInput.value = ""; timeModal.classList.add('active'); setTimeout(() => timeInput.focus(), 100); }
function closeModal() { timeModal.classList.remove('active'); customModal.classList.remove('active'); if (!timeModal.classList.contains('active')) { pendingLesson = null; isCustomPending = false; } }

function confirmStartGame() {
    let timeStr = timeInput.value.trim(); let seconds = 0; 
    if (timeStr) { if (timeStr.includes(':')) { let parts = timeStr.split(':'); seconds = (parseInt(parts[0]) * 60) + (parseInt(parts[1]) || 0); } else { seconds = parseInt(timeStr); } }
    if (isNaN(seconds)) seconds = 0;
    if (isCustomPending) { if(pendingCustomText) { currentText = pendingCustomText; maxTime = seconds; activeLessonId = null; currentLessonObj = null; setupGameEnvironment(); } } 
    else if (pendingLesson) { setupLessonContent(pendingLesson, seconds); }
    closeModal();
}

function startGenericLesson(lesson) {
    // Nếu là bài test thời gian -> Vào thẳng game
    if (lesson.type === 'timetest') { 
        setupLessonContent(lesson, lesson.duration); 
    } 
    // Các loại khác thì mở modal chọn giờ
    else { 
        openTimeModal(lesson); 
    }
}

function setupLessonContent(lesson, selectedTime) {
    activeLessonId = lesson.id;
    currentLessonObj = lesson;
    currentText = "";

    // XỬ LÝ LẤY TEXT THEO LOẠI BÀI
    if (lesson.type === 'timetest') {
        // Lấy text ngẫu nhiên từ kho fixedTexts
        if (fixedTexts && fixedTexts.length > 0) {
            currentText = fixedTexts[Math.floor(Math.random() * fixedTexts.length)];
        } else {
            currentText = generateRandomWords(100); // Dự phòng
        }
        maxTime = (selectedTime > 0) ? selectedTime : lesson.duration;
    } 
    else if (lesson.type === 'pagetest') {
        // Lấy text theo subtype (short, medium, full)
        let texts = [];
        if(lesson.subtype === 'short') texts = pageTexts.short;
        else if(lesson.subtype === 'medium') texts = pageTexts.medium;
        else texts = pageTexts.full;
        
        if(texts && texts.length > 0) {
            currentText = texts[Math.floor(Math.random() * texts.length)];
        } else {
            currentText = "Error: Text not found.";
        }
        maxTime = selectedTime;
    }
    else if (lesson.type === 'code') {
        const snippets = codeSnippets[lesson.lang];
        if (snippets && snippets.length > 0) {
            currentText = snippets[Math.floor(Math.random() * snippets.length)];
        } else {
            currentText = "print('Hello World')";
        }
        maxTime = selectedTime; 
    } 
    else { 
        // Bài học cơ bản
        currentText = lesson.text; 
        maxTime = selectedTime; 
    }
    setupGameEnvironment();
}

function setupGameEnvironment() {
    hideAllPanels();
    if(selectionBar) selectionBar.style.display = 'none'; // Ẩn menu khi chơi
    
    gameArea.style.display = 'block'; 
    gameStats.style.display = 'flex'; 
    navControls.style.display = 'flex'; 
    
    if (currentMode === 'beginner') navNewTextBtn.style.display = 'none';
    else navNewTextBtn.style.display = 'flex';
    
    renderGame();
    setTimeout(() => { if(inputField) { inputField.value = ""; inputField.focus(); inputField.click(); } }, 100);
}

function renderDashboard() { dashboard.innerHTML = ""; lessonData.forEach(s => createSectionElement(s)); }
function renderCodeDashboard() { dashboard.innerHTML = ""; codeData.forEach(s => createSectionElement(s, true, 'code-card')); }
function renderTestDashboard() { dashboard.innerHTML = ""; testData.forEach(s => createSectionElement(s, false, 'test-card')); }

function createSectionElement(section, isCode = false, extraClass = '') {
    const secDiv = document.createElement('div');
    secDiv.className = 'lesson-section';
    secDiv.innerHTML = `<h2 class="section-title">${section.title}</h2>`;
    const gridDiv = document.createElement('div');
    gridDiv.className = 'section-grid';
    section.lessons.forEach(lesson => {
        const stars = localStorage.getItem(getStorageKey(lesson.id)) || 0;
        const starHTML = Array(5).fill(0).map((_, i) => `<i class="${i < stars ? 'fas' : 'far'} fa-star"></i>`).join('');
        const iconStyle = lesson.color ? `style="color: ${lesson.color}"` : '';
        const card = document.createElement('div');
        card.className = `lesson-card ${extraClass}`;
        card.onclick = () => startGenericLesson(lesson);
        card.innerHTML = `<div class="card-header"><i class="${lesson.icon} lesson-icon" ${iconStyle}></i><div class="lesson-stars">${starHTML}</div></div><div class="lesson-info"><h3>${lesson.name}</h3><p>${lesson.keys}</p></div>`;
        gridDiv.appendChild(card);
    });
    secDiv.appendChild(gridDiv);
    dashboard.appendChild(secDiv);
}

function generateRandomWords(count) {
    let res = [];
    for(let i=0; i<count; i++) res.push(randomWords[Math.floor(Math.random() * randomWords.length)]);
    return res.join(" ");
}

// ======================================================
// 6. GAME MECHANICS
// ======================================================
function restartCurrent() { document.getElementById('resultOverlay').classList.remove('active'); setupGameEnvironment(); }
function loadNewText() {
    document.getElementById('resultOverlay').classList.remove('active');
    if (currentMode === 'custom') { openCustomModal(); } 
    else if (currentLessonObj) { startGenericLesson(currentLessonObj); } 
    else { goToMenu(); }
}

function nextAction() {
    let allLessons = [];
    if(currentMode === 'beginner') lessonData.forEach(s => allLessons = allLessons.concat(s.lessons));
    else if (currentMode === 'code') codeData.forEach(s => allLessons = allLessons.concat(s.lessons));
    const currentIndex = allLessons.findIndex(l => l.id === activeLessonId);
    if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
        const nextLesson = allLessons[currentIndex + 1];
        startGenericLesson(nextLesson);
        document.getElementById('resultOverlay').classList.remove('active');
    } else {
        goToMenu();
    }
}

function renderGame() {
    display.innerHTML = "";
    currentText.split("").forEach(char => {
        let span = document.createElement('span');
        span.innerText = char; display.appendChild(span);
    });
    inputField.value = ""; charIndex = 0; mistakes = 0; isTyping = false;
    if(wpmTag) wpmTag.innerText = 0;
    if(accTag) accTag.innerText = "100%";
    if (maxTime === 0) { timeLeft = 0; updateTimeDisplay(0); } 
    else { timeLeft = maxTime; updateTimeDisplay(timeLeft); }
    clearInterval(timer);
    const chars = display.querySelectorAll("span");
    if(chars.length > 0) chars[0].classList.add("active");
}

function initTyping() {
    const chars = display.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];
    let canType = (maxTime === 0) ? true : (timeLeft > 0);

    if(charIndex < chars.length && canType) {
        if(!isTyping) { timer = setInterval(initTimer, 1000); isTyping = true; }
        if(typedChar == null) { 
            if(charIndex > 0) {
                charIndex--;
                if(chars[charIndex].classList.contains("incorrect")) mistakes--;
                chars[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            flashPressedKey(typedChar); 
            if(chars[charIndex].innerText === typedChar) chars[charIndex].classList.add("correct");
            else { mistakes++; chars[charIndex].classList.add("incorrect"); }
            charIndex++;
        }
        chars.forEach(span => span.classList.remove("active"));
        if(charIndex < chars.length) {
            chars[charIndex].classList.add("active");
            let activeEl = chars[charIndex];
            if(activeEl.offsetTop > display.clientHeight - 50) display.scrollTop = activeEl.offsetTop - 50;
        } else finishGame();
        updateStats();
    } else if (charIndex >= chars.length) finishGame();
}

function updateStats() {
    let timePassed = (maxTime === 0) ? timeLeft : maxTime - timeLeft;
    if(timePassed <= 0) timePassed = 1;
    let wpm = Math.round(((charIndex - mistakes) / 5) / (timePassed / 60));
    wpm = (!wpm || wpm < 0) ? 0 : wpm;
    if(wpmTag) wpmTag.innerText = wpm;
    let acc = (charIndex === 0) ? 100 : Math.round(((charIndex - mistakes) / charIndex) * 100);
    if(acc < 0) acc = 0; 
    if(accTag) accTag.innerText = acc + "%";
}

function initTimer() {
    if (maxTime === 0) { timeLeft++; updateTimeDisplay(timeLeft); } 
    else {
        if(timeLeft > 0) { timeLeft--; updateTimeDisplay(timeLeft); } 
        else finishGame();
    }
}

function updateTimeDisplay(s) {
    let m = Math.floor(s / 60); let sec = s % 60;
    const formatted = `${m}:${sec < 10 ? '0' : ''}${sec}`;
    if(timeTag) timeTag.innerText = formatted;
}

function finishGame() {
    clearInterval(timer); inputField.value = "";
    const finalWpm = wpmTag ? wpmTag.innerText : 0;
    const finalAcc = accTag ? accTag.innerText : "100%";
    document.getElementById('finalWpm').innerText = finalWpm;
    document.getElementById('finalAcc').innerText = finalAcc;
    document.getElementById('resultOverlay').classList.add('active');
    
    if(activeLessonId && currentMode !== 'custom') {
        const acc = parseInt(finalAcc);
        let stars = Math.floor(acc / 20); if(stars > 5) stars = 5;
        const key = getStorageKey(activeLessonId);
        if(stars > (localStorage.getItem(key) || 0)) localStorage.setItem(key, stars);
    }
    
    if (currentMode === 'beginner') { btnNext.style.display = 'flex'; btnNewText.style.display = 'none'; } 
    else { btnNext.style.display = 'none'; btnNewText.style.display = 'flex'; }
}

function flashPressedKey(char) {
    document.querySelectorAll('.key.highlight').forEach(k => k.classList.remove('highlight'));
    if(!char) return;
    let k = char.toLowerCase(); if(char === " ") k = " ";
    const el = document.querySelector(`.key[data-key="${k}"]`);
    if(el) { el.classList.add('highlight'); setTimeout(() => el.classList.remove('highlight'), 150); }
}

function setPresetTime(timeStr) {
    const input = document.getElementById('timeInput');
    const btns = document.querySelectorAll('.quick-btn');
    if(input) { input.value = timeStr; input.focus(); }
    btns.forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase().includes(timeStr) || 
          (timeStr === '' && btn.innerText === '∞') ||
          (btn.innerText.replace('s','') === timeStr.split(':')[1])) {
             btn.classList.add('active');
        }
    });
}